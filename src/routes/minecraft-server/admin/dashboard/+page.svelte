<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { readable } from 'svelte/store';
	import { apiFetch } from '$lib/api';
	import { goto } from '$app/navigation';
	import Cookies from 'js-cookie';

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

	function logout() {
		Cookies.remove('token');
		goto('/minecraft-server/admin');
	}
</script>

<svelte:head>
	<title>minecraft server admin portal - charmanita.dev</title>
</svelte:head>
<main>
	<header>
		<a href="/minecraft-server" class="back">← minecraft server</a>
		<h1>Minecraft Server Admin Portal</h1>
		<button on:click={logout}>Logout</button>
	</header>

	<section>
		<h2>Server Status: <span class={status === 'active' ? 'green' : 'red'}>{status}</span></h2>
		<button on:click={startServer}>Start</button>
		<button on:click={stopServer}>Stop</button>
		<button on:click={refreshStatus}>Refresh</button>
	</section>

	<section>
		<h2>Players ({$playerList.length}) <span class="live-dot" title="updates every 10s"></span></h2>
		{#if $playerList.length === 0}
			<p>No players online</p>
		{:else}
			<div class="players">
				{#each $playerList as player}
					<div class="player">
						<img src={`https://api.charmanita.dev/public/avatar/${player}`} alt={player} />
						<span>{player}</span>
					</div>
				{/each}
			</div>
		{/if}
	</section>

	<section>
		<h2>Console</h2>
		<input bind:value={command} placeholder="Enter command..." />
		<button on:click={runCommand}>Run</button>
		{#if commandResult}<p class="result">{commandResult}</p>{/if}
	</section>

	<section>
		<h2>Whitelist</h2>
		<input bind:value={whitelistPlayer} placeholder="Username..." />
		<button on:click={addWhitelist}>Add</button>
		<button on:click={removeWhitelist}>Remove</button>
		{#if whitelistResult}<p class="result">{whitelistResult}</p>{/if}
	</section>

	<section>
		<h2>Logs</h2>
		<pre bind:this={logEl} class="log-box">
			{#each logLines as line}<span>{line}</span>{'\n'}{/each}
		</pre>
	</section>
</main>

<style>
	main {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem;
		background: #000;
		color: white;
		min-height: 100vh;
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	section {
		margin: 2rem 0;
		padding: 1rem;
		background: #123;
		border-radius: 8px;
	}
	input {
		padding: 0.5rem 1rem;
		background: #0d0d1a;
		border: 1px solid #333;
		color: white;
		border-radius: 4px;
		margin-right: 0.5rem;
	}
	button {
		padding: 0.5rem 1rem;
		background: #00ff88;
		color: #000;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-weight: bold;
		margin-right: 0.5rem;
	}
	.green {
		color: #00ff88;
	}
	.red {
		color: red;
	}
	pre {
		overflow-x: auto;
		font-size: 0.75rem;
		white-space: pre-wrap;
	}
	.result {
		color: #00ff88;
	}
	.players {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.player {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: #0d0d1a;
		padding: 0.5rem 1rem;
		border-radius: 6px;
	}
	.player img {
		image-rendering: pixelated;
	}
	.live-dot {
		display: inline-block;
		width: 8px;
		height: 8px;
		background: #00ff88;
		border-radius: 50%;
		margin-left: 6px;
		vertical-align: middle;
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
		height: 400px;
		overflow-y: auto;
		scroll-behavior: auto;
	}
</style>
