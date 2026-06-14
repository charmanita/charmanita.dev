<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	let copied = false;
	let serverOnline = false;
	let version = '1.21.11';
	let loader = 'fabric 0.17.3';
	let reason = '';
	let bots: string | any[] | null | undefined = [];

	function copy(text: string) {
		navigator.clipboard.writeText(text).then(() => {
			copied = true;
			setTimeout(() => (copied = false), 2000);
		});
	}

	let playerCount = '0 / 10';
	let interval: ReturnType<typeof setInterval>;

	onMount(async () => {
		await fetchStatus();
		interval = setInterval(fetchStatus, 10000);
		const res = await fetch('https://api.charmanita.dev/public/bots');
		const all = await res.json();
		bots = all.filter((b: { name: string }) => b.name === 'githubchecker');
	});

	function statusColor(status: string) {
		return status === 'online' ? '#00ff88' : '#ff4444';
	}

	onDestroy(() => {
		clearInterval(interval);
	});

	async function fetchStatus() {
		try {
			const [statusRes, configRes] = await Promise.all([
				fetch('/api/status'),
				fetch('/server-status.json')
			]);
			const data = await statusRes.json();
			const config: { reason?: string } = await configRes.json();

			playerCount = `${data.current_players} / ${data.max_players}`;
			serverOnline = data.online;
			version = data.version;
			loader = data.loader ?? 'fabric';
			reason = config.reason ?? '';
		} catch {
			playerCount = '? / ?';
			serverOnline = false;
			reason = ``;
		}
	}
</script>

<svelte:head>
	<title>minecraft server - charmanita.dev</title>
	<meta property="og:title" content="minecraft server — charmanita.dev" />
	<meta property="og:description" content="Join the Minecraft server." />
	<meta property="og:url" content="https://charmanita.dev/minecraft-server" />
	<meta property="og:type" content="website" />
	<meta name="theme-color" content="#00ff88" />
</svelte:head>

<main>
	<div class="center">
		<a href="/" class="back">← charmanita.dev</a>

		<p class="title">minecraft server</p>

		<div class="grid">
			<div class="grid-col">
				<p class="section-label">server</p>
				<div class="card">
					<div class="row">
						<span class="label">ip</span>
						<button
							class="value copyable"
							on:click={() => copy('mc.charmanita.dev')}
							title="click to copy"
						>
							mc.charmanita.dev
							{#if copied}
								<span class="copied-tag">copied!</span>
							{/if}
						</button>
					</div>
					<div class="divider"></div>
					<div class="row">
						<span class="label">version</span>
						<span class="value">{version} (java)</span>
					</div>
					<div class="divider"></div>
					<div class="row">
						<span class="label">loader</span>
						<span class="value">{loader}</span>
					</div>
					<div class="divider"></div>
					<div class="row">
						<span class="label">status</span>
						<span class="value {serverOnline ? 'online' : 'offline'}">
							{serverOnline ? 'online' : 'offline'}
							{#if !serverOnline && reason}
								<span class="reason">— {reason}</span>
							{/if}
						</span>
					</div>
					<div class="divider"></div>
					<div class="row">
						<span class="label">players</span>
						<span class="value">{playerCount}</span>
					</div>
					<div class="divider"></div>
					<div class="row">
						<span class="label">whitelist</span>
						<span class="value">off</span>
					</div>
				</div>
				<p class="note">click the ip to copy it to your clipboard</p>
				<a href="/minecraft-server/admin" class="admin-link">admin portal</a>
			</div>

			<div class="grid-col">
				<p class="section-label">server bot</p>
				{#if bots.length > 0}
					<div class="card">
						{#each bots as bot}
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
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
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
		align-items: center;
		justify-content: center;
		padding: 4rem 1rem;
	}

	.center {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.75rem;
		width: min(640px, 90vw);
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		width: 100%;
		align-items: start;
	}

	.grid-col {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	@media (max-width: 520px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}

	.back {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.7rem;
		color: #444;
		text-decoration: none;
		letter-spacing: 0.1em;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.05s;
		transition: color 0.2s ease;
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
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.15s;
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
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1.25rem;
		gap: 1rem;
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
		text-transform: uppercase;
		flex-shrink: 0;
	}

	.value {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.8rem;
		color: #ccc;
		letter-spacing: 0.05em;
		text-align: right;
	}

	.copyable {
		background: none;
		border: none;
		cursor: pointer;
		color: #00ff88;
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0;
		transition: opacity 0.2s ease;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.8rem;
		letter-spacing: 0.05em;
	}

	.copyable:hover {
		opacity: 0.75;
	}

	.copied-tag {
		font-size: 0.65rem;
		color: #555;
		letter-spacing: 0.08em;
	}

	.note {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.65rem;
		color: #333;
		letter-spacing: 0.08em;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.5s;
	}
	.admin-link {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.7rem;
		color: #333;
		text-decoration: none;
		letter-spacing: 0.1em;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.6s;
		transition: color 0.2s ease;
	}

	.admin-link:hover {
		color: #fff;
	}
	.online {
		color: #00ff88;
	}

	.offline {
		color: #ff4444;
	}

	.reason {
		color: #555;
		font-size: 0.7rem;
	}
	.section-label {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.65rem;
		color: #333;
		letter-spacing: 0.12em;
		text-transform: uppercase;
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

	.invite {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.6rem;
		color: #fff;
		text-decoration: none;
		letter-spacing: 0.08em;
		background: #5865f2;
		padding: 0.2rem 0.5rem;
		line-height: 1;
		border-radius: 3px;
		transition: color 0.2s ease;
		white-space: nowrap;
	}

	.invite:hover {
		opacity: 0.8;
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
