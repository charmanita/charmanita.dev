<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import MiiSitter from '$lib/components/MiiSitter.svelte';
	let copied = false;
	let serverOnline = false;
	let version = '1.21.11';
	let loader = 'fabric 0.17.3';
	let reason = '';
	let bots: string | any[] | null | undefined = [];
	let mapOnline = false;

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
		bots = all.filter((b: { name: string }) => b.name === 'mcserverbot');
	});

	function statusColor(status: string) {
		return status === 'online' ? 'var(--status-online)' : 'var(--status-offline)';
	}

	onDestroy(() => {
		clearInterval(interval);
	});

	async function fetchStatus() {
		try {
			const [statusRes, configRes] = await Promise.all([
				fetch('https://api.charmanita.dev/public/status'),
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
		// BlueMap Check
		try {
			const mapRes = await fetch('/map-status', { cache: 'no-store' });
			mapOnline = mapRes.ok;
		} catch {
			mapOnline = false;
		}
	}
</script>

<svelte:head>
	<title>minecraft server - charmanita.dev</title>
	<meta property="og:title" content="minecraft server — charmanita.dev" />
	<meta property="og:description" content="Join the Minecraft server." />
	<meta property="og:url" content="https://charmanita.dev/minecraft-server" />
	<meta property="og:type" content="website" />
	<meta name="theme-color" content="#1fb6c9" />
</svelte:head>

<main>
	<div class="back-row">
		<a href="/" class="back aero-pill aero-pill-ghost">← charmanita.dev</a>
	</div>

	<div class="center">
		<div class="title-wrap">
			<MiiSitter pose="diamond-helm-and-pickaxe" size="clamp(100px, 24vw, 100px)" lift={90} />
			<h1 class="aero-heading title aero-pill">minecraft server</h1>
		</div>

		<div class="grid">
			<div class="grid-col server-col">
				<MiiSitter pose="charmanita-mc-skin" size="clamp(100px, 24vw, 100px)" lift={35} />
				<p class="section-label">server</p>
				<div class="card aero-glass">
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
				<p class="note">Click the IP to copy it to your clipboard</p>
				<div class="links">
					<a href="/minecraft-server/admin" class="aero-pill admin-link">Admin Portal</a>
					<a href="https://map.charmanita.dev" class="aero-pill map-link">
						<span
							class="status-dot"
							style="background: {mapOnline ? 'var(--status-online)' : 'var(--status-offline)'}"
						></span>
						Map
					</a>
				</div>
			</div>

			<div class="grid-col">
				<p class="section-label">server bot</p>
				{#if bots.length > 0}
					<div class="card aero-glass">
						{#each bots as bot}
							<div class="row">
								<div class="bot-info">
									{#if bot.avatar}
										<img src={bot.avatar} alt={bot.name} class="avatar" />
									{:else}
										<div class="avatar-placeholder"></div>
									{/if}
									<div class="bot-details">
										<span class="label">{bot.display_name}</span>
										<div class="bot-status">
											<span class="status-dot" style="background: {statusColor(bot.status)}"></span>
											<span class="value" style="color: {statusColor(bot.status)}"
												>{bot.status}</span
											>
										</div>
									</div>
								</div>
								{#if bot.invite}
									<a href={bot.invite} target="_blank" rel="noopener" class="invite">+ add</a>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
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
		justify-content: center;
		padding: 4rem 1rem;
		gap: 1.75rem;
	}

	.back-row {
		width: min(640px, 90vw);
		display: flex;
		justify-content: flex-start;
	}

	.center {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.75rem;
		width: min(640px, 90vw);
	}

	.title-wrap {
		position: relative;
		display: flex;
		justify-content: center;
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
		padding-top: 3.5rem;
	}

	.server-col {
		position: relative;
	}

	@media (max-width: 520px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}

	.back {
		font-size: 0.7rem;
		letter-spacing: 0.06em;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.05s;
	}

	.title {
		font-size: clamp(1.6rem, 6vw, 2.4rem);
		text-align: center;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.15s;
	}

	.card {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 0.25rem 0.5rem;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.3s;
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1rem;
		gap: 1rem;
	}

	.divider {
		height: 1px;
		margin: 0 1rem;
		background: var(--aero-divider);
	}

	.label {
		font-size: 0.7rem;
		color: var(--aero-ink-soft);
		opacity: 0.65;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		flex-shrink: 0;
	}

	.value {
		font-family: var(--aero-font-display);
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--aero-ink);
		letter-spacing: 0.02em;
		text-align: right;
	}

	.copyable {
		background: none;
		border: none;
		cursor: pointer;
		color: var(--aero-aqua-deep);
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0;
		transition: opacity 0.2s ease;
		font-family: var(--aero-font-display);
		font-size: 0.85rem;
		font-weight: 500;
		letter-spacing: 0.02em;
	}

	.copyable:hover {
		opacity: 0.75;
	}

	.copied-tag {
		font-family: var(--aero-font-body);
		font-size: 0.65rem;
		font-weight: 600;
		color: var(--aero-aqua);
		letter-spacing: 0.06em;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.6rem;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.6s;
	}

	.note {
		font-size: 0.7rem;
		color: var(--aero-ink-soft);
		opacity: 0;
		letter-spacing: 0.02em;
		animation:
			fadeIn 0.8s ease forwards 0.5s,
			fadeToSoft 0.8s ease forwards 0.5s;
	}

	.map-link {
		display: flex;
		align-items: center;
		gap: 0.45rem;
	}

	.online {
		color: var(--status-online);
	}

	.offline {
		color: var(--status-offline);
	}

	.reason {
		color: var(--aero-ink-soft);
		opacity: 0.7;
		font-size: 0.7rem;
		font-family: var(--aero-font-body);
	}

	.section-label {
		font-size: 0.68rem;
		color: var(--aero-aqua-deep);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-weight: 600;
		padding-left: 0.5rem;
	}

	.bot-info {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		min-width: 0;
		flex: 1;
	}
	.bot-details {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}
	.bot-status {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.avatar {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		border: 1px solid var(--aero-glass-border);
	}

	.avatar-placeholder {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: var(--aero-glass-lo);
	}

	.status-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		flex-shrink: 0;
		box-shadow: 0 0 0 3px var(--aero-glass-border);
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

	@keyframes fadeToSoft {
		to {
			opacity: 0.7;
		}
	}
</style>
