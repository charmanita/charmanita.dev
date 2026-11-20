<script lang="ts">
	import GlassPanel from '$lib/components/GlassPanel.svelte';
	import Pill from '$lib/components/Pill.svelte';
	import MiiSitter from '$lib/components/MiiSitter.svelte';
	import { onMount, onDestroy } from 'svelte';

	let presence: any = null;
	let ring: { prev?: string; random?: string; next?: string } = {};
	let ringEl: HTMLDivElement | undefined;
	let showRing = false;
	let ws: WebSocket;

	function findRingSection(): HTMLElement | null {
		for (const sec of document.querySelectorAll<HTMLElement>('section')) {
			const t = (sec.textContent ?? '').toLowerCase();
			if (t.includes('prev') && t.includes('next') && !sec.closest('main')) return sec;
		}
		return null;
	}

	function hrefFor(sec: HTMLElement, label: string) {
		return [...sec.querySelectorAll('a')].find((a) => a.textContent?.toLowerCase().includes(label))
			?.href;
	}

	function hideRingWidget() {
		const sec = findRingSection();
		if (!sec) return false;
		ring = {
			prev: hrefFor(sec, 'prev'),
			random: hrefFor(sec, 'random'),
			next: hrefFor(sec, 'next')
		};
		const top = (sec.closest('body > *') as HTMLElement) ?? sec;
		(top.querySelector('main') ? sec : top).style.display = 'none';
		return true;
	}

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

		const observer = new MutationObserver(() => {
			if (hideRingWidget()) observer.disconnect();
		});
		observer.observe(document.body, { childList: true, subtree: true });

		const s = document.createElement('script');
		s.src = 'https://lanyard.cafe/api/embed.js';
		s.async = true;
		ringEl?.appendChild(s);

		return () => {
			observer.disconnect();
			s.remove();
			const sec = findRingSection();
			if (sec) ((sec.closest('body > *') as HTMLElement) ?? sec).remove();
		};
	});

	onDestroy(() => ws?.close());

	const labels: Record<string, string> = {
		online: 'Online',
		idle: 'Idle',
		dnd: 'Do Not Disturb',
		offline: 'Offline'
	};

	$: activity =
		presence?.activities?.find((a: any) => a.type === 2) ??
		presence?.activities?.find((a: any) => a.type === 0);
	$: activityImage = activity ? getActivityImage(activity) : null;
	$: customStatus = presence?.activities?.find((a: any) => a.type === 4);
	$: emojiUrl = customStatus?.emoji?.id
		? `https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.${customStatus.emoji.animated ? 'gif' : 'png'}?size=32`
		: null;
	$: statusEmoji = customStatus?.emoji && !customStatus.emoji.id ? customStatus.emoji.name : null;
	$: status = presence?.discord_status ?? 'offline';
	$: statusLabel = labels[status] ?? status;
	$: avatarUrl = presence?.discord_user
		? presence.discord_user.avatar
			? `https://cdn.discordapp.com/avatars/${presence.discord_user.id}/${presence.discord_user.avatar}.png?size=128`
			: `https://cdn.discordapp.com/embed/avatars/${Number(BigInt(presence.discord_user.id) % 6n)}.png`
		: null;
	function getActivityImage(activity: any): string | null {
		const img = activity.assets?.large_image;
		if (!img) return null;
		if (img.startsWith('spotify:')) return `https://i.scdn.co/image/${img.replace('spotify:', '')}`;
		if (img.startsWith('mp:external/'))
			return `https://media.discordapp.net/external/${img.replace('mp:external/', '')}`;
		return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${img}.png`;
	}
	function focusOnMount(node: HTMLElement) {
		node.focus();
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
	<meta name="theme-color" content="#2fb8c9" />
	<meta property="og:site_name" content="charmanita.dev" />
</svelte:head>

<svelte:window on:keydown={(e) => e.key === 'Escape' && (showRing = false)} />

<main>
	<GlassPanel>
		<MiiSitter pose="sitting" size="clamp(250px, 40vw, 250px)" lift={90} />
		<div class="brand-row">
			<a href="https://github.com/charmanita">
				<img
					class="avatar"
					src="https://github.com/charmanita.png?size=200"
					alt="Charmanita GitHub Profile Pic"
				/>
			</a>
			<div class="identity">
				<p class="aero-heading name"><a href="/">charmanita<span class="dot">.</span>dev</a></p>
				<div class="user-row">
					<span class="discord-dot {status}"></span>
					<p class="aero-heading username">
						@{presence?.discord_user?.username ?? 'charmanita'} | Hunter Roberson
					</p>
				</div>
			</div>
		</div>

		{#if presence}
			<div class="bubble">
				<div class="bubble-status">
					{statusLabel}
				</div>

				{#if customStatus && (statusEmoji || emojiUrl || customStatus.state)}
					<div class="bubble-custom">
						{#if emojiUrl}
							<img class="emoji" src={emojiUrl} alt="" />
						{:else if statusEmoji}
							<span>{statusEmoji}</span>
						{/if}
						{#if customStatus.state}<span>{customStatus.state}</span>{/if}
					</div>
				{/if}

				{#if activity}
					<div class="bubble-activity">
						{#if activityImage}
							<img class="activity-art" src={activityImage} alt="" />
						{/if}
						<div class="activity-text">
							<span>{activity.name}</span>
							{#if activity.details}<span>{activity.details}</span>{/if}
							{#if activity.state}<span>{activity.state}</span>{/if}
						</div>
					</div>
				{/if}
			</div>
		{/if}
		<nav class="pills">
			<Pill href="/about">About</Pill>
			<Pill href="https://blog.charmanita.dev">Blog</Pill>
			<Pill href="https://charmit.charmanita.dev">charmIT</Pill>
			<Pill href="/minecraft-server">Minecraft Server</Pill>
			<Pill href="/activity">GitHub Activity</Pill>
			<Pill href="/status">Bot &amp; Service Status</Pill>
			<Pill href="/snake">Snake Game</Pill>
			<Pill href="/calculator">Calculator</Pill>
			<Pill href="/resume">Resume</Pill>
			<Pill href="/guest-book">Guestbook</Pill>
		</nav>

		<div class="icons">
			<a
				class="aero-icon-btn"
				href="https://github.com/charmanita"
				target="_blank"
				rel="noopener"
				aria-label="GitHub"
			>
				<svg viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
					/>
				</svg>
			</a>
			<a
				class="aero-icon-btn"
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
			<div bind:this={ringEl}></div>
		</div>

		<p class="subtitle">old site layouts live in the archive ↓</p>
		<Pill href="/archive" ghost>archive</Pill>
		{#if ring.prev}
			<nav class="ring">
				<button
					class="ring-badge"
					on:click={() => (showRing = true)}
					aria-label="About the lanyard.cafe webring"
				>
					<img src="https://lanyard.cafe/lanyard.png" alt="" width="24" height="24" />
				</button>
			</nav>
		{/if}
	</GlassPanel>
	<footer>
		<div class="aero-pill footer-glass">© 2026 Hunter Roberson · charmanita.dev</div>
	</footer>
	{#if showRing}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="overlay" role="presentation" on:click={() => (showRing = false)}>
			<div
				class="modal"
				role="dialog"
				aria-modal="true"
				aria-labelledby="ring-title"
				tabindex="-1"
				use:focusOnMount
				on:click|stopPropagation
			>
				<GlassPanel>
					<h2 id="ring-title" class="aero-heading">Lanyard</h2>
					<p class="modal-text">
						<a href="https://charmanita.dev">charmanita.dev</a> is affiliated with
						<a href="https://lanyard.cafe">lanyard.cafe</a>, a collection of personal websites that
						are linked together in a webring. I use
						<a href="https://discord.gg/XpQnThHkAH">Lanyard</a> as a way to show my status on Discord.
						It's pretty neat. Use the buttons below to browse through the Lanyard Cafe!
					</p>
					{#if ring.prev}
						<nav class="ring">
							<Pill href={ring.prev}>Previous</Pill>
							<Pill href={ring.random}>Random</Pill>
							<Pill href={ring.next}>Next</Pill>
						</nav>
					{/if}
					<a class="modal-link" href="https://lanyard.cafe" target="_blank" rel="noopener">
						Lanyard Cafe ↗
					</a>
					<button class="aero-pill close-btn" on:click={() => (showRing = false)}>close</button>
				</GlassPanel>
			</div>
		</div>
	{/if}
</main>

<style>
	main {
		position: relative;
		width: 100%;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.name {
		font-size: clamp(1.6rem, 5vw, 2.4rem);
	}

	.name a {
		text-decoration: none;
		color: inherit;
	}
	.activity-art {
		width: 44px;
		height: 44px;
		border-radius: 8px;
		object-fit: cover;
		flex-shrink: 0;
	}
	.activity-text {
		display: flex;
		flex-direction: column;
		min-width: 0;
		opacity: 0.85;
	}
	.bubble {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2rem;
		max-width: 90%;
		padding: 0.6rem 1rem;
		margin-top: 0.6rem;
		border-radius: 1.1rem;
		background: rgba(255, 255, 255, 0.12);
		border: 1px solid rgba(255, 255, 255, 0.25);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(6px);
		font-family: var(--aero-font-display);
		font-size: 0.8rem;
		color: var(--aero-ink-soft);
		text-align: center;
	}

	.bubble-activity {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-top: 0.2rem;
		text-align: left;
		font-size: 0.72rem;
	}

	.bubble-status {
		display: flex;
		align-items: center;
		gap: 6px;
		font-weight: 700;
	}

	.bubble-custom {
		display: flex;
		gap: 0.35rem;
	}

	.bubble-activity {
		opacity: 0.8;
		font-size: 0.72rem;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
	}
	.dot {
		color: #2fb8c9;
		-webkit-text-fill-color: #2fb8c9;
	}
	.discord-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.discord-dot.online {
		background: #00ff88;
	}
	.discord-dot.idle {
		background: #faa61a;
	}
	.discord-dot.dnd {
		background: #f04747;
	}
	.discord-dot.offline {
		background: #747f8d;
	}

	.emoji {
		width: 16px;
		height: 16px;
		vertical-align: middle;
	}
	.pills {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.6rem;
		max-width: 460px;
	}

	.ring {
		display: flex;
		gap: 0.6rem;
		justify-content: center;
		align-items: center;
	}
	.ring-badge {
		display: grid;
		place-items: center;
		width: 36px;
		height: 36px;
		padding: 0;
		border: none;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.12);
		cursor: pointer;
		transition: transform 0.2s;
	}
	.ring-badge:hover {
		transform: scale(1.1);
	}

	.overlay {
		position: fixed;
		inset: 0;
		z-index: 50;
		display: grid;
		place-items: center;
		padding: 1rem;
		background: rgba(0, 0, 0, 0.45);
	}

	.modal {
		width: min(420px, 100%);
		text-align: center;
	}

	.modal-text {
		font-family: var(--aero-font-display);
		font-size: 0.85rem;
		color: var(--aero-ink-soft);
	}

	.modal-link {
		font-family: var(--aero-font-display);
		font-size: 0.8rem;
	}

	.close-btn {
		cursor: pointer;
	}
	.identity {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.icons {
		display: flex;
		gap: 1.4rem;
	}

	.user-row {
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.username {
		font-size: 0.9rem;
	}
	.subtitle {
		font-family: var(--aero-font-display);
		font-size: 0.7rem;
		color: var(--aero-ink-soft);
		opacity: 0.85;
	}
	.brand-row {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.avatar {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		object-fit: cover;
		transition: transform 0.2s;
	}
	.avatar:hover {
		transform: scale(1.06);
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
</style>
