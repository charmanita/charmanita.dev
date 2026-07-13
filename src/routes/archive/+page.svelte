<svelte:head>
	<title>archive - charmanita.dev</title>
	<meta property="og:title" content="archive - charmanita.dev" />
	<meta
		property="og:description"
		content="This is an archive of old site layouts of charmanita.dev"
	/>
	<meta property="og:url" content="https://charmanita.dev/archive" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://charmanita.dev/images/og-image.png" />
	<meta name="theme-color" content="#00ff88" />
	<meta property="og:site_name" content="charmanita.dev/archive" />
</svelte:head>

<main>
	<div class="center">
		<a href="/" class="nav-link">→ charmanita.dev</a>
		<p class="name">archive - charmanita.dev</p>
		<a href="/archive/1" class="nav-link">april to july 2026 layout</a>
	</div>
	<footer>© 2026 Hunter Roberson · charmanita.dev/archive</footer>
</main>

<style>
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
