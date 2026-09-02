<script lang="ts">
	import { onMount } from 'svelte';
	import GlassPanel from '$lib/components/GlassPanel.svelte';
	import Pill from '$lib/components/Pill.svelte';
	import MiiSitter from '$lib/components/MiiSitter.svelte';

	let repoCount = $state<number | null>(null);

	onMount(async () => {
		try {
			const res = await fetch('https://api.github.com/users/charmanita');
			const data = await res.json();
			repoCount = data.public_repos;
		} catch {
			// silently fail
		}
	});
</script>

<svelte:head>
	<title>about - charmanita.dev</title>
	<meta property="og:title" content="about — charmanita.dev" />
	<meta
		property="og:description"
		content="Heyo! My name is Hunter, I am from the North Texas area. I am currently going to Grayson College... see more"
	/>
	<meta property="og:image" content="https://charmanita.dev/images/og-image.png" />
	<meta name="theme-color" content="#2fb8c9" />
</svelte:head>

<main>
	<div class="back-row">
		<Pill href="/">← charmanita.dev</Pill>
	</div>

	<GlassPanel maxWidth="760px">
		<MiiSitter pose="leaning" size="190px" />
		<div class="section-label">// about</div>
		<a href="https://github.com/charmanita">
			<img
				class="avatar"
				src="https://github.com/charmanita.png?size=200"
				alt="Charmanita GitHub Profile Pic"
			/>
		</a>
		<h1 class="aero-heading">Who I Am</h1>

		<div class="body">
			<div class="text">
				<p>
					Heyo! My name is Hunter, I am from the North Texas area. I am currently going to Grayson
					College for my associate's degree in Computer Science. I am planning to transfer over to
					UNT afterwards to finish my bachelor's degree. I am wanting to be a system adminstrator in
					the future.
				</p>
				<p>
					When I'm not coding, I'm usually playing games or making music with some of my good
					friends!
				</p>
			</div>

			<div class="stats">
				<div class="stat">
					<span class="stat-num">
						{#if repoCount !== null}{repoCount}{:else}∞{/if}
					</span>
					<span class="stat-label">projects shipped</span>
				</div>
				<div class="stat">
					<span class="stat-num">24/7</span>
					<span class="stat-label">bot uptime</span>
				</div>
				<div class="stat">
					<span class="stat-num">1</span>
					<span class="stat-label">Raspberry Pi</span>
				</div>
			</div>
		</div>
	</GlassPanel>

	<GlassPanel maxWidth="560px">
		<div class="section-label">// contact</div>
		<div class="contact-links">
			<a href="mailto:contact@charmanita.dev" class="aero-pill contact-item">
				<span class="contact-icon">✉</span>
				<span>contact@charmanita.dev</span>
			</a>
			<a
				href="https://github.com/charmanita"
				target="_blank"
				rel="noopener"
				class="aero-pill contact-item"
			>
				<span class="contact-icon"><svg viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
					/>
				</svg></span>
				<span>GitHub</span>
			</a>
			<a
				href="https://linkedin.com/in/hunterdroberson"
				target="_blank"
				rel="noopener"
				class="aero-pill contact-item"
			>
				<span class="contact-icon"><svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
					/>
				</svg></span>
				<span>LinkedIn</span>
			</a>
			<a href="/resume" class="aero-pill contact-item">
				<span class="contact-icon">📃</span>
				<span>Resume</span>
			</a>
		</div>
	</GlassPanel>

	<footer>
		<div class="aero-pill footer-glass">© 2026 Hunter Roberson · charmanita.dev</div>
	</footer>
</main>

<style>
	main {
		position: relative;
		min-height: 100vh;
		max-width: 800px;
		margin: 0 auto;
		padding: 4rem 2rem 6rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		opacity: 0;
		animation: fadeIn 0.6s ease forwards 0.1s;
	}

	.back-row {
		width: 100%;
		display: flex;
		justify-content: flex-start;
	}

	.section-label {
		font-family: var(--aero-font-body);
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--aero-aqua);
		letter-spacing: 0.15em;
		opacity: 0.85;
		margin-bottom: 0.5rem;
	}

	h1 {
		font-size: clamp(1.8rem, 5vw, 2.6rem);
		margin-bottom: 2rem;
	}

	.body {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 3rem;
		align-items: start;
		width: 100%;
		font-family: 'Quicksand';
	}

	.text p {
		color: var(--aero-ink-soft);
		line-height: 1.7;
		font-size: 1rem;
		margin-bottom: 1rem;
	}

	.stats {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		border-left: 1px solid rgba(255, 255, 255, 0.5);
		padding-left: 2rem;
	}

	.stat {
		display: flex;
		flex-direction: column;
	}

	.stat-num {
		font-family: var(--aero-font-display);
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--aero-aqua-deep);
		line-height: 1;
	}

	.stat-label {
		font-family: var(--aero-font-body);
		font-size: 0.72rem;
		color: var(--aero-ink-soft);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		margin-top: 0.3rem;
		opacity: 0.85;
	}

	@media (max-width: 600px) {
		.body {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.stats {
			flex-direction: row;
			flex-wrap: wrap;
			border-left: none;
			border-top: 1px solid rgba(255, 255, 255, 0.5);
			padding-left: 0;
			padding-top: 1.5rem;
			gap: 1.5rem;
		}
	}

	.contact-links {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		width: 100%;
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-family: var(--aero-font-body);
		font-size: 0.85rem;
		padding: 0.75rem 1.25rem;
		border-radius: 999px;
		width: 100%;
	}

	.contact-icon {
		color: var(--aero-aqua);
		font-size: 1rem;
		width: 1.25rem;
		text-align: center;
	}

	footer {
		margin-top: 1rem;
	}

	.footer-glass {
		font-size: 0.7rem;
		letter-spacing: 0.04em;
	}

	@media (max-width: 600px) {
		.contact-item {
			font-size: 0.78rem;
			word-break: break-all;
		}
	}
	img.avatar {
		width: 200px;
		height: 200px;
		object-fit: cover;
		transition: transform 0.2s;
	}
	img.avatar:hover {
		transform: scale(1.05);
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
