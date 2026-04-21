<script lang="ts">
	import { onMount } from 'svelte';

	const projects = [
		{
			name: 'Hunter Bot',
			description: 'This is a bot that I made with Python that does a lot of quirky things.',
			tags: ['Python', 'Discord'],
			link: 'https://github.com/charmanita/hunter-bot'
		},
		{
			name: 'Twitch Discord Bot',
			description: 'A Discord bot that checks on a polling basis if a streamer is live.',
			tags: ['Python', 'Discord'],
			link: 'https://github.com/charmanita/twitch-discord-bot'
		},
		{
			name: 'Minecraft Square Walk Macro',
			description: 'This was my first GitHub project, it is just a macro.',
			tags: ['Python'],
			link: 'https://github.com/charmanita/minecraft-square-walk-macro'
		}
	];

	let repoCount = $state<number | null>(null);

	onMount(async () => {
		try {
			const res = await fetch('https://api.github.com/users/charmanita');
			const data = await res.json();
			repoCount = data.public_repos;
		} catch {
			// silently fail - stat will stay as '∞'
		}
	});
</script>

<main>
	<!-- Noise overlay -->
	<div class="noise"></div>

	<!-- Nav -->
	<nav>
		<span class="logo">charmanita.dev</span>
		<div class="nav-links">
			<a href="#about">about</a>
			<a href="#projects">projects</a>
			<a href="#contact">contact</a>
		</div>
	</nav>

	<!-- Hero -->
	<section class="hero">
		<div class="hero-content">
			<p class="hero-eyebrow">// hello, world</p>
			<h1>
				<span class="line">Hunter Roberson</span>
				<span class="line accent">Computer Science student at Grayson College.</span>
			</h1>
			<p class="hero-sub">Aspiring SysAdmin, dev on the side with a Raspberry Pi.</p>
		</div>
		<div class="hero-grid-art" aria-hidden="true">
			{#each Array(64) as _, i}
				<div class="grid-cell" style="animation-delay: {(i * 37) % 2000}ms"></div>
			{/each}
		</div>
	</section>

	<!-- About -->
	<section id="about" class="section about">
		<div class="section-label">// 01 — about</div>
		<div class="about-inner">
			<div class="about-text">
				<h2>Who I Am</h2>
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
			<div class="about-stats">
				<div class="stat">
					<span class="stat-num">
						{#if repoCount !== null}
							{repoCount}
						{:else}
							∞
						{/if}
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
	</section>

	<!-- Projects -->
	<section id="projects" class="section projects">
		<div class="section-label">// 02 — projects</div>
		<h2>Things I've Built</h2>
		<div class="project-grid">
			{#each projects as project, i}
				<a href={project.link} class="project-card" target="_blank" rel="noopener">
					<div class="card-index">0{i + 1}</div>
					<h3>{project.name}</h3>
					<p>{project.description}</p>
					<div class="tags">
						{#each project.tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
					<div class="card-arrow">→</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Contact -->
	<section id="contact" class="section contact">
		<div class="section-label">// 03 — contact</div>
		<h2>Get In Touch</h2>
		<p class="contact-sub">Have a project in mind, want to collaborate, or just want to say hi?</p>
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
				href="http://discord.com/users/485957450009149451"
				target="_blank"
				rel="noopener"
				class="contact-item"
			>
				<span class="contact-icon">#</span>
				<span>charmanita on Discord</span>
			</a>
		</div>
	</section>

	<footer>
		<span>built with SvelteKit + Tailwind · charmanita.dev</span>
	</footer>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=Syne:wght@400;600;800&display=swap');

	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		background: #080b0f;
		color: #c8d6e5;
		font-family: 'Syne', sans-serif;
		overflow-x: hidden;
	}

	/* Noise */
	.noise {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 100;
		opacity: 0.03;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
		background-size: 200px;
	}

	/* Nav */
	nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 50;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.25rem 3rem;
		background: rgba(8, 11, 15, 0.85);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid rgba(0, 255, 136, 0.06);
	}

	.logo {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.9rem;
		color: #00ff88;
		letter-spacing: 0.05em;
	}

	.nav-links {
		display: flex;
		gap: 2rem;
	}

	.nav-links a {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.8rem;
		color: #5a7a8a;
		text-decoration: none;
		letter-spacing: 0.08em;
		transition: color 0.2s;
	}

	.nav-links a:hover {
		color: #00ff88;
	}

	/* Hero */
	.hero {
		min-height: 100vh;
		display: flex;
		align-items: center;
		padding: 6rem 3rem 3rem;
		position: relative;
		overflow: hidden;
	}

	.hero::before {
		content: '';
		position: absolute;
		top: -20%;
		right: -10%;
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, rgba(0, 255, 136, 0.07) 0%, transparent 70%);
		pointer-events: none;
	}

	.hero-content {
		position: relative;
		z-index: 2;
		max-width: 700px;
	}

	.hero-eyebrow {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.85rem;
		color: #00ff88;
		letter-spacing: 0.1em;
		margin-bottom: 1.5rem;
		opacity: 0;
		animation: fadeUp 0.6s ease forwards 0.2s;
	}

	h1 {
		font-family: 'Syne', sans-serif;
		font-weight: 800;
		font-size: clamp(3.5rem, 8vw, 7rem);
		line-height: 0.95;
		letter-spacing: -0.02em;
		margin-bottom: 2rem;
	}

	.line {
		display: block;
		opacity: 0;
		animation: fadeUp 0.7s ease forwards;
	}

	.line:nth-child(1) {
		animation-delay: 0.4s;
	}
	.line:nth-child(2) {
		animation-delay: 0.55s;
	}

	.accent {
		color: #00ff88;
	}

	.hero-sub {
		font-size: 1.15rem;
		color: #5a7a8a;
		max-width: 420px;
		line-height: 1.7;
		opacity: 0;
		animation: fadeUp 0.7s ease forwards 0.75s;
	}

	/* Grid art */
	.hero-grid-art {
		position: absolute;
		right: 3rem;
		top: 50%;
		transform: translateY(-50%);
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		gap: 6px;
		opacity: 0.35;
	}

	.grid-cell {
		width: 14px;
		height: 14px;
		border: 1px solid rgba(0, 255, 136, 0.2);
		animation: pulse 3s ease-in-out infinite alternate;
	}

	@keyframes pulse {
		0% {
			background: transparent;
			border-color: rgba(0, 255, 136, 0.1);
		}
		100% {
			background: rgba(0, 255, 136, 0.15);
			border-color: rgba(0, 255, 136, 0.5);
		}
	}

	/* Sections */
	.section {
		padding: 6rem 3rem;
		max-width: 1100px;
		margin: 0 auto;
	}

	.section-label {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.75rem;
		color: #00ff88;
		letter-spacing: 0.15em;
		margin-bottom: 1.5rem;
		opacity: 0.7;
	}

	.section h2 {
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 800;
		letter-spacing: -0.02em;
		margin-bottom: 2.5rem;
	}

	/* About */
	.about-inner {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 4rem;
		align-items: start;
	}

	.about-text p {
		color: #7a9ab0;
		line-height: 1.8;
		margin-bottom: 1rem;
		font-size: 1.05rem;
	}

	.about-stats {
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

	/* Projects */
	.project-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.project-card {
		position: relative;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.06);
		padding: 2rem;
		text-decoration: none;
		color: inherit;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		transition:
			border-color 0.25s,
			background 0.25s;
		overflow: hidden;
	}

	.project-card::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(0, 255, 136, 0.04), transparent);
		opacity: 0;
		transition: opacity 0.3s;
	}

	.project-card:hover {
		border-color: rgba(0, 255, 136, 0.3);
		background: rgba(0, 255, 136, 0.03);
	}

	.project-card:hover::before {
		opacity: 1;
	}

	.card-index {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.7rem;
		color: #00ff88;
		opacity: 0.5;
	}

	.project-card h3 {
		font-size: 1.3rem;
		font-weight: 700;
		letter-spacing: -0.01em;
	}

	.project-card p {
		color: #5a7a8a;
		font-size: 0.9rem;
		line-height: 1.7;
		flex: 1;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.tag {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.7rem;
		padding: 0.2rem 0.6rem;
		border: 1px solid rgba(0, 255, 136, 0.2);
		color: #00ff88;
		letter-spacing: 0.05em;
	}

	.card-arrow {
		position: absolute;
		bottom: 1.5rem;
		right: 1.5rem;
		font-size: 1.1rem;
		color: #00ff88;
		opacity: 0;
		transform: translateX(-6px);
		transition:
			opacity 0.25s,
			transform 0.25s;
	}

	.project-card:hover .card-arrow {
		opacity: 1;
		transform: translateX(0);
	}

	/* Contact */
	.contact-sub {
		color: #5a7a8a;
		font-size: 1.05rem;
		margin-bottom: 2.5rem;
		margin-top: -1rem;
	}

	.contact-links {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.95rem;
		color: #7a9ab0;
		text-decoration: none;
		padding: 1rem 1.5rem;
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
		width: 1.5rem;
		text-align: center;
	}

	/* Footer */
	footer {
		text-align: center;
		padding: 2rem 3rem;
		border-top: 1px solid rgba(255, 255, 255, 0.04);
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.75rem;
		color: #2d4050;
	}

	/* Animations */
	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Responsive */
	@media (max-width: 768px) {
		nav {
			padding: 1rem 1.5rem;
		}
		.hero {
			padding: 5rem 1.5rem 3rem;
		}
		.hero-grid-art {
			display: none;
		}
		.section {
			padding: 4rem 1.5rem;
		}
		.about-inner {
			grid-template-columns: 1fr;
		}
		.about-stats {
			flex-direction: row;
			border-left: none;
			border-top: 1px solid rgba(0, 255, 136, 0.15);
			padding-left: 0;
			padding-top: 2rem;
		}
	}
</style>
