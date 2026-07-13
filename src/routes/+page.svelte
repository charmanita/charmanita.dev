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
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700&family=Quicksand:wght@400;500;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main>
	<div class="sky"></div>
	<div class="bubbles" aria-hidden="true">
		{#each Array(14) as _, i}
			<span class="bubble b{i}"></span>
		{/each}
	</div>

	<div class="dock">
		<img class="mii-sitter" src="/images/mii-sitting.png" alt="" aria-hidden="true" />
		<p class="name"><a href="/">charmanita<span class="dot">.</span>dev</a></p>

		<nav class="pills">
			<a href="/about" class="pill">about</a>
			<a href="https://blog.charmanita.dev" class="pill">blog</a>
			<a href="https://charmit.charmanita.dev" class="pill">charmIT</a>
			<a href="/minecraft-server" class="pill">minecraft server</a>
			<a href="/activity" class="pill">github activity</a>
			<a href="/status" class="pill">bot &amp; service status</a>
			<a href="/snake" class="pill">snake game</a>
			<a href="/calculator" class="pill">calculator thing</a>
		</nav>

		<div class="icons">
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
			<a href="/discord" target="_blank" rel="noopener" aria-label="Discord">
				<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
					><path
						d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
					/>
				</svg>
			</a>
		</div>

		<p class="subtitle">old site layouts live in the archive ↓</p>
		<a href="/archive" class="pill pill-ghost">archive</a>
	</div>

	<footer>
		<div class="footer-glass">© 2026 Hunter Roberson · charmanita.dev</div>
	</footer>
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
	}

	main {
		position: relative;
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		font-family: 'Quicksand', sans-serif;
	}

	.sky {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, #bfe8ff 0%, #d9f6ee 55%, #eafff0 100%);
		z-index: 0;
	}

	.sky::before {
		content: '';
		position: absolute;
		inset: 0;
		background:
			radial-gradient(ellipse 55% 30% at 18% 12%, rgba(255, 255, 255, 0.85), transparent 70%),
			radial-gradient(ellipse 40% 22% at 78% 20%, rgba(255, 255, 255, 0.7), transparent 70%),
			radial-gradient(ellipse 60% 35% at 50% 100%, rgba(140, 224, 200, 0.35), transparent 70%);
	}

	.bubbles {
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
	}

	.bubble {
		position: absolute;
		bottom: -10%;
		border-radius: 50%;
		background:
			radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.05) 40%),
			radial-gradient(circle at 65% 70%, rgba(120, 220, 210, 0.25), rgba(120, 220, 210, 0) 60%);
		border: 1px solid rgba(255, 255, 255, 0.6);
		box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.5);
		animation: rise linear infinite;
		opacity: 0.7;
	}

	.b0 {
		left: 4%;
		width: 18px;
		height: 18px;
		animation-duration: 14s;
		animation-delay: 0s;
	}
	.b1 {
		left: 12%;
		width: 34px;
		height: 34px;
		animation-duration: 19s;
		animation-delay: 2s;
	}
	.b2 {
		left: 20%;
		width: 12px;
		height: 12px;
		animation-duration: 11s;
		animation-delay: 1s;
	}
	.b3 {
		left: 30%;
		width: 26px;
		height: 26px;
		animation-duration: 17s;
		animation-delay: 4s;
	}
	.b4 {
		left: 40%;
		width: 16px;
		height: 16px;
		animation-duration: 13s;
		animation-delay: 3s;
	}
	.b5 {
		left: 50%;
		width: 40px;
		height: 40px;
		animation-duration: 22s;
		animation-delay: 0.5s;
	}
	.b6 {
		left: 58%;
		width: 14px;
		height: 14px;
		animation-duration: 12s;
		animation-delay: 5s;
	}
	.b7 {
		left: 66%;
		width: 28px;
		height: 28px;
		animation-duration: 18s;
		animation-delay: 2.5s;
	}
	.b8 {
		left: 74%;
		width: 20px;
		height: 20px;
		animation-duration: 15s;
		animation-delay: 6s;
	}
	.b9 {
		left: 82%;
		width: 32px;
		height: 32px;
		animation-duration: 20s;
		animation-delay: 1.5s;
	}
	.b10 {
		left: 90%;
		width: 15px;
		height: 15px;
		animation-duration: 13.5s;
		animation-delay: 3.5s;
	}
	.b11 {
		left: 8%;
		width: 24px;
		height: 24px;
		animation-duration: 16s;
		animation-delay: 7s;
	}
	.b12 {
		left: 46%;
		width: 10px;
		height: 10px;
		animation-duration: 10s;
		animation-delay: 8s;
	}
	.b13 {
		left: 96%;
		width: 22px;
		height: 22px;
		animation-duration: 17.5s;
		animation-delay: 4.5s;
	}

	@keyframes rise {
		from {
			transform: translateY(0) translateX(0);
		}
		50% {
			transform: translateY(-55vh) translateX(12px);
		}
		to {
			transform: translateY(-115vh) translateX(-8px);
		}
	}

	.bg-gif {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: min(380px, 70vw);
		height: auto;
		opacity: 0.14;
		pointer-events: none;
		user-select: none;
		mix-blend-mode: multiply;
		z-index: 1;
	}

	.dock {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
		padding: 2.5rem clamp(1.5rem, 6vw, 3.5rem);
		border-radius: 28px;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.22));
		border: 1px solid rgba(255, 255, 255, 0.75);
		box-shadow:
			0 8px 32px rgba(20, 90, 110, 0.18),
			inset 0 1px 0 rgba(255, 255, 255, 0.9),
			inset 0 -12px 24px rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(14px);
		max-width: min(92vw, 560px);
	}

	.mii-sitter {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, -88%);
		width: clamp(250px, 40vw, 250px);
		height: auto;
		pointer-events: none;
		user-select: none;
		filter: drop-shadow(0 8px 10px rgba(20, 90, 110, 0.25));
	}

	.name {
		font-family: 'Baloo 2', sans-serif;
		font-weight: 700;
		font-size: clamp(1.6rem, 5vw, 2.4rem);
		letter-spacing: 0.01em;
		background: linear-gradient(180deg, #1fb6c9 0%, #0d6d80 55%, #073744 100%);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);
	}

	.name a {
		text-decoration: none;
		color: inherit;
	}

	.dot {
		color: #00ff88;
		-webkit-text-fill-color: #00ff88;
	}

	.pills {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.6rem;
		max-width: 460px;
	}

	.pill {
		position: relative;
		overflow: hidden;
		font-size: 0.78rem;
		font-weight: 500;
		color: #0d4a5c;
		text-decoration: none;
		padding: 0.5rem 1.1rem;
		border-radius: 999px;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(200, 240, 235, 0.55));
		border: 1px solid rgba(255, 255, 255, 0.85);
		box-shadow:
			0 2px 6px rgba(20, 90, 110, 0.12),
			inset 0 1px 0 rgba(255, 255, 255, 0.9);
		transition:
			transform 0.18s ease,
			box-shadow 0.18s ease;
	}

	.pill::after {
		content: '';
		position: absolute;
		top: -60%;
		left: -30%;
		width: 40%;
		height: 220%;
		background: rgba(255, 255, 255, 0.55);
		transform: rotate(20deg);
		transition: left 0.5s ease;
	}

	.pill:hover {
		transform: translateY(-2px);
		box-shadow:
			0 6px 14px rgba(20, 90, 110, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.9);
		color: #073744;
	}

	.pill:hover::after {
		left: 130%;
	}

	.pill-ghost {
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.35), rgba(180, 230, 220, 0.2));
	}

	.icons {
		display: flex;
		gap: 1.4rem;
	}

	.icons a {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #0d4a5c;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(200, 240, 235, 0.4));
		border: 1px solid rgba(255, 255, 255, 0.8);
		box-shadow:
			0 2px 6px rgba(20, 90, 110, 0.12),
			inset 0 1px 0 rgba(255, 255, 255, 0.9);
		transition:
			transform 0.18s ease,
			color 0.18s ease;
	}

	.icons a:hover {
		transform: translateY(-2px) scale(1.06);
		color: #1fb6c9;
	}

	.icons svg {
		width: 17px;
		height: 17px;
	}

	.subtitle {
		font-size: 0.7rem;
		color: #1c5e6e;
		opacity: 0.85;
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
		color: #0d4a5c;
		padding: 0.5rem 1.4rem;
		border-radius: 999px;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.6), rgba(200, 240, 235, 0.3));
		border: 1px solid rgba(255, 255, 255, 0.7);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
	}

	@media (prefers-reduced-motion: reduce) {
		.bubble {
			animation: none;
			opacity: 0.3;
		}
	}
</style>
