<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { readable } from 'svelte/store';
	import { apiFetch } from '$lib/api';
	import { goto } from '$app/navigation';
	import Cookies from 'js-cookie';
	import { browser } from '$app/environment';

	let status = '';
	let command = '';
	let commandResult = '';
	let whitelistPlayer = '';
	let whitelistResult = '';
	let logLines: string[] = [];
	let logEl: HTMLPreElement | null = null;
	let evtSource: EventSource | null = null;

	function parsePlayers(raw: string): string[] {
		const match = raw.match(/online: (.+?)(?:\s*>\s*)?$/);
		return match && match[1].trim()
			? match[1]
					.split(', ')
					.map((n: string) => n.trim().replace('>', '').trim())
					.filter(Boolean)
			: [];
	}

	const playerList = readable<string[]>([], (set) => {
		let active = true;

		async function poll() {
			if (!active) return;
			try {
				const p = await apiFetch('/server/players').then((r) => r.json());
				if (active) set(parsePlayers(p.result));
			} catch (e) {
				console.error('player poll error:', e);
			}
			if (active) setTimeout(poll, 10_000);
		}

		poll();
		return () => {
			active = false;
		};
	});

	onMount(async () => {
		if (!Cookies.get('token')) goto('/minecraft-server/admin');
		await refreshStatus();
		startLogStream();
	});

	function startLogStream() {
		evtSource?.close();
		const token = Cookies.get('token');
		evtSource = new EventSource(`https://api.charmanita.dev/server/logs/stream?token=${token}`);
		evtSource.onmessage = (e) => {
			logLines = [...logLines.slice(-500), e.data];
			setTimeout(() => logEl?.scrollTo(0, logEl.scrollHeight), 0);
		};
		evtSource.onerror = () => {
			evtSource?.close();
			setTimeout(startLogStream, 3000);
		};
	}

	onDestroy(() => evtSource?.close());

	async function refreshStatus() {
		try {
			const s = await apiFetch('/server/status').then((r) => r.json());
			status = s.status;
		} catch (e) {
			console.error('refreshStatus error:', e);
			status = 'error';
		}
	}

	async function startServer() {
		await apiFetch('/server/start', { method: 'POST' });
		await refreshStatus();
	}

	async function stopServer() {
		await apiFetch('/server/stop', { method: 'POST' });
		await refreshStatus();
	}

	async function runCommand() {
		const res = await apiFetch('/server/command', {
			method: 'POST',
			body: JSON.stringify({ command })
		});
		const data = await res.json();
		commandResult = data.result;
		command = '';
	}

	async function addWhitelist() {
		const res = await apiFetch('/whitelist/add', {
			method: 'POST',
			body: JSON.stringify({ username: whitelistPlayer })
		});
		const data = await res.json();
		whitelistResult = data.result;
	}

	async function removeWhitelist() {
		const res = await apiFetch('/whitelist/remove', {
			method: 'POST',
			body: JSON.stringify({ username: whitelistPlayer })
		});
		const data = await res.json();
		whitelistResult = data.result;
	}

	const username = browser
		? (() => {
				const token = Cookies.get('token');
				if (!token) return null;
				try {
					return JSON.parse(atob(token.split('.')[1])).sub;
				} catch {
					return null;
				}
			})()
		: null;

	function logout() {
		Cookies.remove('token');
		goto('/minecraft-server/admin');
	}
</script>

<svelte:head>
	<title>minecraft server admin portal - charmanita.dev</title>
</svelte:head>

<main>
	<div class="back-row">
		<a href="/minecraft-server" class="back aero-pill aero-pill-ghost">← minecraft server</a>
	</div>

	<div class="center">
		<div class="page-header">
			<h1 class="aero-heading title">admin portal</h1>
			<div class="header-right">
				{#if username}
					<span class="username">logged in as <strong>{username}</strong></span>
				{/if}
				<button class="aero-pill logout-btn" on:click={logout}>Logout</button>
			</div>
		</div>

		<section class="card aero-glass">
			<h2 class="section-title">
				server status:
				<span class={status === 'active' ? 'online' : 'offline'}>{status}</span>
			</h2>
			<div class="btn-row">
				<button class="aero-pill start-btn" on:click={startServer}>Start</button>
				<button class="aero-pill stop-btn" on:click={stopServer}>Stop</button>
				<button class="aero-pill" on:click={refreshStatus}>Refresh</button>
			</div>
		</section>

		<section class="card aero-glass">
			<h2 class="section-title">
				players ({$playerList.length})
				<span class="live-dot" title="updates every 10s"></span>
			</h2>
			{#if $playerList.length === 0}
				<p class="empty-note">No players online</p>
			{:else}
				<div class="players">
					{#each $playerList as player}
						<div class="player aero-pill">
							<img src={`https://api.charmanita.dev/public/avatar/${player}`} alt={player} />
							<span>{player}</span>
						</div>
					{/each}
				</div>
			{/if}
		</section>

		<section class="card aero-glass">
			<h2 class="section-title">console</h2>
			<div class="input-row">
				<input bind:value={command} placeholder="Enter command..." />
				<button class="aero-pill" on:click={runCommand}>Run</button>
			</div>
			{#if commandResult}<p class="result">{commandResult}</p>{/if}
		</section>

		<section class="card aero-glass">
			<h2 class="section-title">whitelist</h2>
			<div class="input-row">
				<input bind:value={whitelistPlayer} placeholder="Username..." />
				<button class="aero-pill" on:click={addWhitelist}>Add</button>
				<button class="aero-pill stop-btn" on:click={removeWhitelist}>Remove</button>
			</div>
			{#if whitelistResult}<p class="result">{whitelistResult}</p>{/if}
		</section>

		<section class="card aero-glass">
			<h2 class="section-title">logs</h2>
			<pre bind:this={logEl} class="log-box">
				{#each logLines as line}<span>{line}</span>{'\n'}{/each}
			</pre>
		</section>
	</div>
</main>

<style>
	main {
		position: relative;
		z-index: 1;
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 3rem 1rem 5rem;
		gap: 1.5rem;
	}

	.back-row {
		width: min(900px, 92vw);
		display: flex;
		justify-content: flex-start;
	}

	.back {
		font-size: 0.7rem;
		letter-spacing: 0.06em;
	}

	.center {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 1.5rem;
		width: min(900px, 92vw);
	}

	.page-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.title {
		font-size: clamp(1.5rem, 5vw, 2rem);
	}

	.header-right {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.username {
		font-size: 0.8rem;
		color: var(--aero-ink-soft);
		opacity: 0.8;
	}

	.username strong {
		color: var(--aero-ink);
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		padding: 1.5rem 1.75rem;
	}

	.section-title {
		font-family: var(--aero-font-display);
		font-weight: 700;
		color: var(--aero-aqua-deep);
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-transform: uppercase;
		font-size: 0.8rem;
		letter-spacing: 0.1em;
	}

	.online {
		color: var(--status-online);
		text-transform: none;
		font-family: var(--aero-font-body);
		letter-spacing: 0.02em;
	}

	.offline {
		color: var(--status-offline);
		text-transform: none;
		font-family: var(--aero-font-body);
		letter-spacing: 0.02em;
	}

	.btn-row,
	.input-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}

	button {
		cursor: pointer;
		border: none;
		font-family: var(--aero-font-body);
	}

	.start-btn {
		background: linear-gradient(180deg, var(--aero-aqua), var(--aero-aqua-deep));
		color: #fff;
		font-weight: 600;
	}

	.start-btn:hover {
		color: #fff;
	}

	.stop-btn {
		background: linear-gradient(180deg, #ffb1bb, var(--status-offline));
		color: #fff;
		font-weight: 600;
	}

	.stop-btn:hover {
		color: #fff;
	}

	.logout-btn {
		font-size: 0.75rem;
	}

	.input-row input {
		flex: 1;
		min-width: 160px;
	}

	input {
		font-family: var(--aero-font-body);
		font-size: 0.85rem;
		color: var(--aero-ink);
		padding: 0.6rem 1rem;
		border-radius: 14px;
		border: 1px solid var(--aero-glass-border);
		background: linear-gradient(180deg, var(--aero-glass-hi), var(--aero-glass-lo));
		box-shadow: inset 0 1px 3px var(--aero-shadow);
		outline: none;
		transition:
			border-color 0.18s ease,
			box-shadow 0.18s ease;
	}

	input:focus {
		border-color: var(--aero-aqua);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--aero-aqua) 20%, transparent);
	}

	input::placeholder {
		color: var(--aero-ink-soft);
		opacity: 0.5;
	}

	.result {
		font-size: 0.8rem;
		color: var(--aero-aqua-deep);
	}

	.empty-note {
		font-size: 0.85rem;
		color: var(--aero-ink-soft);
		opacity: 0.7;
	}

	.players {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}

	.player {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.82rem;
	}

	.player img {
		width: 22px;
		height: 22px;
		border-radius: 6px;
		image-rendering: pixelated;
	}

	.live-dot {
		display: inline-block;
		width: 7px;
		height: 7px;
		background: var(--status-online);
		border-radius: 50%;
		box-shadow: 0 0 0 3px var(--aero-glass-border);
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.3;
		}
	}

	.log-box {
		height: 360px;
		overflow-y: auto;
		overflow-x: auto;
		font-size: 0.75rem;
		font-family: 'IBM Plex Mono', monospace;
		white-space: pre-wrap;
		color: var(--aero-ink-soft);
		background: var(--aero-inset-bg);
		border-radius: 16px;
		padding: 1rem;
		border: 1px solid var(--aero-glass-border);
	}
</style>
