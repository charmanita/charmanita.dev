<script lang="ts">
	import { onMount } from 'svelte';

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
	<meta name="theme-color" content="#00ff88" />
</svelte:head>

<main>
	<a href="/" class="back">← charmanita.dev</a>

	<div class="content">
		<div class="section-label">// about</div>
		<h1>Who I Am</h1>

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
	</div>

	<div class="contact">
		<div class="section-label" style="margin-top: 4rem;">// contact</div>
		<div class="contact-links">
			<a href="mailto:hdroberson23@gmail.com" class="contact-item">
				<span class="contact-icon">✉</span>
				<span>hdroberson23@gmail.com</span>
			</a>
			<a href="https://github.com/charmanita" target="_blank" rel="noopener" class="contact-item">
				<span class="contact-icon">⌥</span>
				<span>github.com/charmanita</span>
			</a>
			<a
				href="https://linkedin.com/in/hunterdroberson"
				target="_blank"
				rel="noopener"
				class="contact-item"
			>
				<span class="contact-icon">ⓘ</span>
				<span>linkedin.com/in/hunterdroberson</span>
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
		background: #080b0f;
		color: #c8d6e5;
		font-family: 'Syne', sans-serif;
		overflow-x: hidden;
	}

	main {
		min-height: 100vh;
		max-width: 800px;
		margin: 0 auto;
		padding: 4rem 2rem;
		opacity: 0;
		animation: fadeIn 0.6s ease forwards 0.1s;
	}

	.back {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.78rem;
		color: #3d5a6a;
		text-decoration: none;
		letter-spacing: 0.08em;
		transition: color 0.2s;
		display: inline-block;
		margin-bottom: 4rem;
	}

	.back:hover {
		color: #00ff88;
	}

	.section-label {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.75rem;
		color: #00ff88;
		letter-spacing: 0.15em;
		opacity: 0.7;
		margin-bottom: 1rem;
	}

	h1 {
		font-family: 'Syne', sans-serif;
		font-weight: 800;
		font-size: clamp(2rem, 5vw, 3rem);
		letter-spacing: -0.02em;
		margin-bottom: 2.5rem;
	}

	.body {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 4rem;
		align-items: start;
	}

	.text p {
		color: #7a9ab0;
		line-height: 1.8;
		font-size: 1.05rem;
		margin-bottom: 1rem;
	}

	.stats {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		border-left: 1px solid rgba(0, 255, 136, 0.15);
		padding-left: 2.5rem;
	}

	.stat {
		display: flex;
		flex-direction: column;
	}

	.stat-num {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 2rem;
		font-weight: 700;
		color: #00ff88;
		line-height: 1;
	}

	.stat-label {
		font-size: 0.75rem;
		color: #3d5a6a;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		margin-top: 0.3rem;
	}

	@media (max-width: 600px) {
		.body {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}

		.stats {
			flex-direction: row;
			flex-wrap: wrap;
			border-left: none;
			border-top: 1px solid rgba(0, 255, 136, 0.15);
			padding-left: 0;
			padding-top: 2rem;
			gap: 1.5rem;
		}
	}

	.contact-links {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 1.5rem;
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.9rem;
		color: #7a9ab0;
		text-decoration: none;
		padding: 0.9rem 1.25rem;
		border: 1px solid rgba(255, 255, 255, 0.05);
		transition:
			color 0.2s,
			border-color 0.2s;
		max-width: 420px;
	}
	.contact-item:hover {
		color: #00ff88;
		border-color: rgba(0, 255, 136, 0.25);
	}
	.contact-icon {
		color: #00ff88;
		font-size: 1rem;
		width: 1.25rem;
		text-align: center;
	}
	@media (max-width: 600px) {
		.contact-item {
			max-width: 100%;
			font-size: 0.8rem;
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
