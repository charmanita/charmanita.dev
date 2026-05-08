<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let presence: any = null;
	let ws: WebSocket;

	onMount(() => {
		ws = new WebSocket('wss://api.lanyard.rest/socket');
		ws.onmessage = (e) => {
			const msg = JSON.parse(e.data);
			if (msg.op === 1) {
				setInterval(() => ws.send(JSON.stringify({ op: 3 })), msg.d.heartbeat_interval);
				ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: '485957450009149451' } }));
			}
			if (msg.op === 0) presence = msg.d;
		};
	});

	onDestroy(() => ws?.close());

	$: activity =
		presence?.activities?.find((a: any) => a.type === 2) ??
		presence?.activities?.find((a: any) => a.type === 0);
	$: status = presence?.discord_status ?? 'offline';

	function getActivityImage(activity: any): string | null {
		const img = activity.assets?.large_image;
		if (!img) return null;
		if (img.startsWith('spotify:')) {
			return `https://i.scdn.co/image/${img.replace('spotify:', '')}`;
		}
		if (img.startsWith('mp:external/')) {
			return `https://media.discordapp.net/external/${img.replace('mp:external/', '')}`;
		}
		return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${img}.png`;
	}
</script>

<svelte:head>
	<title>charmanita.dev</title>
	<meta property="og:title" content="charmanita.dev" />
	<meta
		property="og:description"
		content="CS student, aspiring SysAdmin, dev on the side with a Raspberry Pi."
	/>
	<meta property="og:url" content="https://charmanita.dev/" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://charmanita.dev/images/og-image.png" />
	<meta name="theme-color" content="#00ff88" />
	<meta property="og:site_name" content="charmanita.dev" />
</svelte:head>

<main>
	<video class="bg-gif" autoplay loop muted playsinline aria-hidden="true">
		<source src="/mii.webm" type="video/webm" />
		<source src="/mii.gif" type="image/gif" />
	</video>
	<div class="center">
		<p class="name">charmanita.dev</p>
		{#if presence}
			<div class="presence-card">
				<div class="presence-header">
					<span class="dot {status}"></span>
					<span class="status-text"
						>{status === 'dnd'
							? 'Do Not Disturb'
							: status.charAt(0).toUpperCase() + status.slice(1)}</span
					>
				</div>
				{#if activity}
					<div class="presence-body">
						{#if getActivityImage(activity)}
							<img class="activity-icon" src={getActivityImage(activity)} alt={activity.name} />
						{/if}
						<div class="activity-info">
							<span class="activity-name">{activity.name}</span>
							{#if activity.details}<span class="activity-detail">{activity.details}</span>{/if}
							{#if activity.state}<span class="activity-detail">{activity.state}</span>{/if}
						</div>
					</div>
				{/if}
			</div>
		{/if}
		<a href="/about" class="nav-link">about</a>
		<a href="/blog" class="nav-link">blog</a>
		<a href="/minecraft-server" class="nav-link">minecraft server</a>
		<div class="icons">
			<!-- GitHub -->
			<a href="https://github.com/charmanita" target="_blank" rel="noopener" aria-label="GitHub">
				<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
					/>
				</svg>
			</a>
			<a
				href="https://linkedin.com/in/hunterdroberson"
				target="_blank"
				rel="noopener"
				aria-label="LinkedIn"
			>
				<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
					/>
				</svg>
			</a>
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
		height: 100%;
		background: #000;
	}

	main {
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.center {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.75rem;
	}

	.name {
		font-family: 'IBM Plex Mono', monospace;
		font-size: clamp(1.1rem, 4vw, 1.6rem);
		font-weight: 400;
		color: #fff;
		letter-spacing: 0.04em;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.1s;
	}
	.presence-card {
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 10px;
		padding: 0.75rem 1rem;
		min-width: 220px;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.2s;
	}

	.presence-header {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		margin-bottom: 0.6rem;
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.dot.online {
		background: #00ff88;
	}
	.dot.idle {
		background: #faa61a;
	}
	.dot.dnd {
		background: #f04747;
	}
	.dot.offline {
		background: #747f8d;
	}

	.status-text {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.7rem;
		color: #888;
		letter-spacing: 0.05em;
	}

	.presence-body {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.activity-icon {
		width: 52px;
		height: 52px;
		border-radius: 6px;
		flex-shrink: 0;
		object-fit: cover;
	}

	.activity-info {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.activity-name {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.75rem;
		font-weight: 600;
		color: #fff;
		letter-spacing: 0.03em;
	}

	.activity-detail {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.65rem;
		color: #666;
		letter-spacing: 0.03em;
	}

	.icons {
		display: flex;
		gap: 1.75rem;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.35s;
	}

	.icons a {
		color: #555;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: color 0.2s ease;
	}

	.icons a:hover {
		color: #fff;
	}

	.icons svg {
		width: 20px;
		height: 20px;
	}

	.nav-link {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.75rem;
		color: #444;
		text-decoration: none;
		letter-spacing: 0.1em;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.55s;
		transition: color 0.2s ease;
	}

	.nav-link:hover {
		color: #fff;
	}
	.bg-gif {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: min(420px, 80vw);
		height: auto;
		opacity: 0.08;
		pointer-events: none;
		user-select: none;
		mix-blend-mode: screen;
		filter: grayscale(1);
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
