<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	let copied = false;
	let serverOnline = false;
	let version = '1.21.11';
	let reason = '';

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
		interval = setInterval(fetchStatus, 30000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	async function fetchStatus() {
		try {
			const [statusRes, configRes] = await Promise.all([
				fetch('https://mcapi.charmanita.dev/public/status'),
				fetch('/server-status.json')
			]);
			const data = await statusRes.json();
			const config: { reason?: string } = await configRes.json();

			playerCount = `${data.current_players} / ${data.max_players}`;
			serverOnline = data.online;
			version = data.version;
			reason = config.reason ?? '';
		} catch {
			playerCount = '? / ?';
			serverOnline = false;
			reason = ``;
		}
	}
</script>

<svelte:head>
	<meta property="og:title" content="minecraft server — charmanita.dev" />
	<meta property="og:description" content="Join the funservertehe Minecraft server." />
	<meta property="og:url" content="https://charmanita.dev/minecraft-server" />
	<meta property="og:type" content="website" />
	<meta name="theme-color" content="#00ff88" />
</svelte:head>

<main>
	<div class="center">
		<a href="/" class="back">← charmanita.dev</a>

		<p class="title">minecraft server</p>

		<div class="card">
			<div class="row">
				<span class="label">ip</span>
				<button
					class="value copyable"
					on:click={() => copy('funservertehe.charmanita.dev')}
					title="click to copy"
				>
					funservertehe.charmanita.dev
					{#if copied}
						<span class="copied-tag">copied!</span>
					{/if}
				</button>
			</div>
			<div class="divider"></div>
			<div class="row">
				<span class="label">version</span>
				<span class="value">1.21.11 (java)</span>
			</div>
			<div class="divider"></div>
			<div class="row">
				<span class="label">loader</span>
				<span class="value">fabric 0.17.3</span>
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
</main>

<style>
	:global(*, *::before, *::after) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(html, body) {
		width: 100%;
		height: 100%;
		background: #000;
		overflow: hidden;
	}

	main {
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.center {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.75rem;
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
		width: min(380px, 90vw);
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
