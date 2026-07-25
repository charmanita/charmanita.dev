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
		const [sres, bres] = await Promise.all([
			fetch('https://api.charmanita.dev/public/services'),
			fetch('https://api.charmanita.dev/public/bots')
		]);
		services = await sres.json();
		bots = await bres.json();
		loading = false;
	}

	function statusColor(status: string) {
		if (status === 'online') return 'var(--status-online)';
		if (status === 'idle') return '#e0a539';
		if (status === 'dnd') return 'var(--status-offline)';
		return 'var(--aero-ink-soft)';
	}
</script>

<svelte:head>
	<title>status - charmanita.dev</title>
	<meta name="theme-color" content="#00ff88" />
</svelte:head>

<main>
	<div class="center">
		<a href="/" class="aero-pill aero-pill-ghost back">← charmanita.dev</a>
		<p class="aero-heading title">status</p>

		{#if loading}
			<p class="empty">loading...</p>
		{:else}
			<p class="section-label">services</p>
			<div class="aero-glass card">
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
			<div class="aero-glass card">
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
	<footer>
		<div class="aero-pill footer-glass">© 2026 Hunter Roberson · charmanita.dev</div>
	</footer>
</main>

<style>
	main {
		width: 100%;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		padding: 4rem 1rem;
		padding-bottom: 5rem;
	}

	.center {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		width: min(380px, 100%);
	}

	.back {
		font-size: 0.7rem;
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
		font-size: clamp(1rem, 4vw, 1.4rem);
		letter-spacing: 0.04em;
		align-self: flex-start;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.15s;
		margin-bottom: 0.75rem;
	}

	.section-label {
		font-family: var(--aero-font-body);
		font-size: 0.65rem;
		color: var(--aero-ink-soft);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		align-self: flex-start;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.2s;
	}

	.card {
		display: flex;
		flex-direction: column;
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
		padding: 0.85rem 1.25rem;
	}

	.divider {
		height: 1px;
		background: var(--aero-divider);
	}

	.label {
		font-family: var(--aero-font-body);
		font-size: 0.7rem;
		color: var(--aero-ink);
		letter-spacing: 0.05em;
	}
	.value {
		font-family: var(--aero-font-body);
		font-size: 0.7rem;
		letter-spacing: 0.05em;
	}

	.online {
		color: var(--status-online);
	}
	.offline {
		color: var(--status-offline);
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
		background: var(--aero-inset-bg);
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		flex-shrink: 0;
	}
	.invite {
		font-family: var(--aero-font-body);
		font-size: 0.65rem;
		font-weight: 600;
		color: #fff;
		text-decoration: none;
		letter-spacing: 0.04em;
		background: linear-gradient(180deg, #7f8bff, #5865f2);
		padding: 0.3rem 0.7rem;
		line-height: 1;
		border-radius: 999px;
		box-shadow:
			0 2px 6px rgba(88, 101, 242, 0.35),
			inset 0 1px 0 rgba(255, 255, 255, 0.4);
		transition:
			transform 0.18s ease,
			box-shadow 0.18s ease;
		white-space: nowrap;
	}

	.invite:hover {
		transform: translateY(-2px);
		box-shadow:
			0 5px 12px rgba(88, 101, 242, 0.4),
			inset 0 1px 0 rgba(255, 255, 255, 0.4);
	}
	.empty {
		font-family: var(--aero-font-body);
		font-size: 0.75rem;
		color: var(--aero-ink-soft);
		letter-spacing: 0.1em;
	}
	footer {
		position: absolute;
		bottom: 1.25rem;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		z-index: 2;
	}

	.footer-glass {
		font-size: 0.7rem;
		letter-spacing: 0.04em;
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
