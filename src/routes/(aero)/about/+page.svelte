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
				<span class="contact-icon">⌥</span>
				<span>github.com/charmanita</span>
			</a>
			<a
				href="https://linkedin.com/in/hunterdroberson"
				target="_blank"
				rel="noopener"
				class="aero-pill contact-item"
			>
				<span class="contact-icon">ⓘ</span>
				<span>linkedin.com/in/hunterdroberson</span>
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
