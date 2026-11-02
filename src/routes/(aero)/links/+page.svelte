<script lang="ts">
	import GlassPanel from '$lib/components/GlassPanel.svelte';
	import Pill from '$lib/components/Pill.svelte';
	import MiiSitter from '$lib/components/MiiSitter.svelte';
</script>

<svelte:head>
	<title>links - charmanita.dev</title>
	<meta property="og:title" content="links - charmanita.dev" />
	<meta
		property="og:description"
		content="Links to everything Charmanita, and my alter ego for music: h.ntrr!"
	/>
	<meta property="og:url" content="https://charmanita.dev/links" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://charmanita.dev/images/og-image.png" />
	<meta name="theme-color" content="#2fb8c9" />
	<meta property="og:site_name" content="charmanita.dev/links" />
</svelte:head>

<main>
	<GlassPanel>
		<MiiSitter pose="sitting" size="clamp(250px, 40vw, 250px)" lift={90} />
		<div class="brand-row">
			<p class="aero-heading name"><a href="/links">Charmanita</a></p>
		</div>
		<nav class="pills">
			<Pill href="https://discord.com/users/485957450009149451">Discord</Pill>
			<Pill href="https://github.com/charmanita">GitHub</Pill>
			<Pill href="https://steamcommunity.com/id/charmanita">Steam</Pill>
			<Pill href="https://twitch.tv/charmanita">Twitch</Pill>
			<Pill href="https://twitter.com/charmanita_">Twitter</Pill>
		</nav>
		<div class="brand-row">
			<p class="aero-heading name"><a href="/links">h<span class="dot">.</span>ntrr</a></p>
		</div>
		<nav class="pills">
			<Pill href="https://music.apple.com/us/artist/h-ntrr/1737464087">Apple Music</Pill>
			<Pill href="https://instagram.com/h.ntrr">Instagram</Pill>
			<Pill href="https://music.apple.com/us/artist/h-ntrr/1737464087">Apple Music</Pill>
			<Pill href="https://open.spotify.com/artist/5JvAjTQNHUbgioFKvtMx3f">Spotify</Pill>
			<Pill href="https://tiktok.com/@h.ntrr">TikTok</Pill>
		</nav>
	</GlassPanel>
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

	.dot {
		color: #2fb8c9;
		-webkit-text-fill-color: #2fb8c9;
	}

	.pills {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.6rem;
		max-width: 460px;
	}

	.icons {
		display: flex;
		gap: 1.4rem;
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
