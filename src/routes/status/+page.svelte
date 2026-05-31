<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	type Bot = {
		name: string;
		display_name: string;
		id: number;
		status: string;
		avatar: string | null;
		invite: string | null;
	};

	let services: Record<string, boolean> = {};
	let bots: Bot[] = [];
	let loading = true;
	let interval: ReturnType<typeof setInterval>;

	onMount(async () => {
		await fetchAll();
		interval = setInterval(fetchAll, 15000);
	});

	onDestroy(() => clearInterval(interval));

	async function fetchAll() {
		const [sres, bres] = await Promise.all([fetch('/api/services'), fetch('/api/bots')]);
		services = await sres.json();
		bots = await bres.json();
		loading = false;
	}

	function statusColor(status: string) {
		if (status === 'online') return '#00ff88';
		if (status === 'idle') return '#ffaa00';
		if (status === 'dnd') return '#ff4444';
		return '#444';
	}
</script>

<svelte:head>
	<title>status - charmanita.dev</title>
	<meta name="theme-color" content="#00ff88" />
</svelte:head>

<main>
	<div class="center">
		<a href="/" class="back">← charmanita.dev</a>
		<p class="title">status</p>

		{#if loading}
			<p class="empty">loading...</p>
		{:else}
			<p class="section-label">services</p>
			<div class="card">
				{#each Object.entries(services) as [name, up], i}
					<div class="row">
						<span class="label">{name}</span>
						<span class="value {up ? 'online' : 'offline'}">{up ? 'online' : 'offline'}</span>
					</div>
					{#if i < Object.entries(services).length - 1}
						<div class="divider"></div>
					{/if}
				{/each}
			</div>

			<p class="section-label">discord bots</p>
			<div class="card">
				{#each bots as bot, i}
					<div class="row">
						<div class="bot-info">
							{#if bot.avatar}
								<img src={bot.avatar} alt={bot.name} class="avatar" />
							{:else}
								<div class="avatar-placeholder"></div>
							{/if}
							<span class="label">{bot.display_name}</span>
							{#if bot.invite}
								<a href={bot.invite} target="_blank" rel="noopener" class="invite">+ add</a>
							{/if}
						</div>
						<div class="bot-status">
							<span class="dot" style="background: {statusColor(bot.status)}"></span>
							<span class="value" style="color: {statusColor(bot.status)}">{bot.status}</span>
						</div>
					</div>
					{#if i < bots.length - 1}
						<div class="divider"></div>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
	<footer>© 2026 Hunter Roberson · charmanita.dev</footer>
</main>

<style>
	:global(*, *::before, *::after) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	:global(html, body) {
		width: 100%;
		min-height: 100%;
		background: #000;
	}

	main {
		width: 100%;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		padding: 4rem 1rem;
	}

	.center {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		width: min(380px, 100%);
	}

	.back {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.7rem;
		color: #444;
		text-decoration: none;
		letter-spacing: 0.1em;
		align-self: flex-start;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.05s;
		transition: color 0.2s ease;
		margin-bottom: 0.5rem;
	}

	.back:hover {
		color: #fff;
	}

	.title {
		font-family: 'IBM Plex Mono', monospace;
		font-size: clamp(1rem, 4vw, 1.4rem);
		font-weight: 400;
		color: #fff;
		letter-spacing: 0.04em;
		align-self: flex-start;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.15s;
		margin-bottom: 0.75rem;
	}

	.section-label {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.65rem;
		color: #333;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		align-self: flex-start;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.2s;
	}

	.card {
		display: flex;
		flex-direction: column;
		border: 1px solid #1e1e1e;
		border-radius: 4px;
		overflow: hidden;
		width: 100%;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.3s;
		margin-bottom: 1rem;
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1.25rem;
	}

	.divider {
		height: 1px;
		background: #1e1e1e;
	}

	.label {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.7rem;
		color: #444;
		letter-spacing: 0.1em;
	}

	.value {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.7rem;
		letter-spacing: 0.05em;
	}

	.online {
		color: #00ff88;
	}
	.offline {
		color: #ff4444;
	}

	.bot-info {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.bot-status {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.avatar {
		width: 24px;
		height: 24px;
		border-radius: 50%;
	}

	.avatar-placeholder {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: #1e1e1e;
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.empty {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.75rem;
		color: #333;
		letter-spacing: 0.1em;
	}
	.invite {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.6rem;
		color: #fff;
		text-decoration: none;
		letter-spacing: 0.08em;
		background: #5865f2;
		padding: 0.2rem 0.5rem;
		border-radius: 3px;
		transition: color 0.2s ease;
	}

	.invite:hover {
		opacity: 0.8;
	}
	footer {
		border-top: 1px solid var(--border);
		padding: 2rem;
		text-align: center;
		font-family: var(--mono);
		font-size: 0.75rem;
		color: white;
		letter-spacing: 0.05em;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
