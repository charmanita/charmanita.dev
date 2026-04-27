<svelte:head>
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
	<img class="bg-gif" src="/mii.gif" alt="" aria-hidden="true" />
	<div class="center">
		<p class="name">charmanita.dev</p>
		<a href="/about" class="about-link">about</a>
		<a href="/blog" class="blog-link">blog</a>
		<a href="/minecraft-server" class="minecraft-server-link">minecraft server</a>
		<div class="icons">
			<!-- GitHub -->
			<a href="https://github.com/charmanita" target="_blank" rel="noopener" aria-label="GitHub">
				<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
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

	.about-link {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.75rem;
		color: #444;
		text-decoration: none;
		letter-spacing: 0.1em;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.55s;
		transition: color 0.2s ease;
	}

	.about-link:hover {
		color: #fff;
	}
	.minecraft-server-link {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.75rem;
		color: #444;
		text-decoration: none;
		letter-spacing: 0.1em;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.55s;
		transition: color 0.2s ease;
	}

	.blog-link {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.75rem;
		color: #444;
		text-decoration: none;
		letter-spacing: 0.1em;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.55s;
		transition: color 0.2s ease;
	}

	.blog-link:hover {
		color: #fff;
	}

	.minecraft-server-link:hover {
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
