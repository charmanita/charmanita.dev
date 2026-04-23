<script lang="ts">
	import { onMount } from 'svelte';
	import { apiFetch } from '$lib/api';
	import { goto } from '$app/navigation';
	import Cookies from 'js-cookie';

	let status = '';
	let playerList: string[] = [];
	let logs = '';
	let command = '';
	let commandResult = '';
	let whitelistPlayer = '';
	let whitelistResult = '';

	onMount(async () => {
		if (!Cookies.get('token')) goto('/minecraft-server/admin');
		await refreshStatus();
	});

	async function refreshStatus() {
		try {
			const [s, p, l] = await Promise.all([
				apiFetch('/server/status').then((r) => r.json()),
				apiFetch('/server/players').then((r) => r.json()),
				apiFetch('/server/logs').then((r) => r.json())
			]);
			status = s.status;
			const match = p.result.match(/: (.+)$/);
			playerList = match
				? match[1].split(', ').map((n: string) => n.trim().replace('>', '').trim())
				: [];
			logs = l.logs;
		} catch (e) {
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

<main>
	<header>
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
		<h2>Players ({playerList.length})</h2>
		{#if playerList.length === 0}
			<p>No players online</p>
		{:else}
			<div class="players">
				{#each playerList as player}
					<div class="player">
						<img src={`https://mc-heads.net/avatar/${player}/32`} alt={player} />
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
		<pre>{logs}</pre>
	</section>
</main>

<style>
	main {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem;
		background: #080b0f;
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
		background: #1a1a2e;
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
		color: #080b0f;
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
</style>
