<script>
	import { page } from '$app/stores';
</script>

<div class="aero-stage">
	<div class="aero-window">
		<div class="aero-titlebar">
			<span class="aero-orb"></span>
			<span class="aero-title">
				{#if $page.status === 404}
					Page Not Found
				{:else}
					Error {$page.status}
				{/if}
			</span>
			<div class="aero-buttons">
				<span class="aero-btn"></span>
				<span class="aero-btn"></span>
				<span class="aero-btn aero-btn-close"></span>
			</div>
		</div>

		<div class="aero-body">
			{#if $page.status === 404}
				<h1>404 — page not found</h1>
				<p>
					If a page is supposed to be here and isn't showing up, please contact me.
					<a href="mailto:contact@charmanita.dev" class="contact-item">
						<span class="contact-icon">✉</span>
						<span>contact@charmanita.dev</span>
					</a>
				</p>
				<img src="/images/mii-wink.png" alt="error" />
			{:else}
				<h1>Error {$page.status}</h1>
				<p>{$page.error?.message}</p>
				<img src="/images/mii-wink.png" alt="error" />
			{/if}

			<a href="/" class="aero-back">← charmanita.dev</a>
		</div>
	</div>

	<footer>© 2026 Hunter Roberson · charmanita.dev</footer>
</div>

<style>
	.aero-stage {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		padding: 2rem 1rem;
		background:
			radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255, 255, 255, 0.35), transparent 60%),
			linear-gradient(180deg, #bfe3ff 0%, #4f9ce8 35%, #1c5fa8 70%, #0b3c73 100%);
		font-family: 'Segoe UI', Tahoma, sans-serif;
	}

	.aero-window {
		width: min(480px, 100%);
		border-radius: 10px;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.55);
		backdrop-filter: blur(16px) saturate(160%);
		-webkit-backdrop-filter: blur(16px) saturate(160%);
		border: 1px solid rgba(255, 255, 255, 0.7);
		box-shadow:
			0 20px 50px rgba(6, 30, 60, 0.45),
			0 2px 0 rgba(255, 255, 255, 0.6) inset,
			0 -1px 0 rgba(0, 0, 0, 0.15) inset;
	}

	.aero-titlebar {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.55rem 0.75rem;
		background: linear-gradient(180deg, #eaf6ff 0%, #b9daf7 40%, #6fa8e0 55%, #3f7dc4 100%);
		border-bottom: 1px solid rgba(255, 255, 255, 0.6);
		color: #14335c;
		font-weight: 600;
		font-size: 0.85rem;
		text-shadow: 0 1px 0 rgba(255, 255, 255, 0.6);
	}

	.aero-titlebar::after {
		content: '';
		position: absolute;
		inset: 0 0 55% 0;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.85), transparent);
		pointer-events: none;
	}

	.aero-orb {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: radial-gradient(circle at 30% 30%, #fff, #ffb703 60%, #d97706 100%);
		box-shadow: 0 0 4px rgba(217, 119, 6, 0.7);
		flex-shrink: 0;
	}

	.aero-title {
		flex: 1;
	}

	.aero-buttons {
		display: flex;
		gap: 0.4rem;
	}

	.aero-btn {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: radial-gradient(circle at 30% 30%, #fff, #9fcbf0 60%, #4a86c8 100%);
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
	}

	.aero-btn-close {
		background: radial-gradient(circle at 30% 30%, #fff, #ff9f9f 60%, #d94b4b 100%);
	}

	.aero-body {
		padding: 2.25rem 2rem 1.75rem;
		text-align: center;
		color: #0f2c4f;
	}

	.aero-body h1 {
		font-size: 1.4rem;
		margin: 0 0 0.75rem;
		text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
	}

	.aero-body p {
		font-size: 0.95rem;
		line-height: 1.5;
		margin: 0 0 1.25rem;
	}

	.contact-item {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		margin-left: 0.35rem;
		color: #0b5ed7;
		text-decoration: none;
	}

	.contact-item:hover {
		text-decoration: underline;
	}

	img {
		display: block;
		width: 120px;
		height: auto;
		max-width: 100%;
		margin: 0 auto 1.5rem;
		filter: drop-shadow(0 6px 10px rgba(6, 30, 60, 0.35));
	}

	.aero-back {
		display: inline-block;
		padding: 0.5rem 1.1rem;
		border-radius: 999px;
		background: linear-gradient(180deg, #ffffff, #cfe6fb);
		border: 1px solid rgba(255, 255, 255, 0.9);
		box-shadow:
			0 3px 6px rgba(6, 30, 60, 0.25),
			0 1px 0 rgba(255, 255, 255, 0.8) inset;
		color: #14335c;
		text-decoration: none;
		font-size: 0.85rem;
		font-weight: 600;
		transition: box-shadow 0.15s ease;
	}

	.aero-back:hover {
		box-shadow:
			0 3px 6px rgba(6, 30, 60, 0.25),
			0 0 0 3px rgba(111, 168, 224, 0.35),
			0 1px 0 rgba(255, 255, 255, 0.8) inset;
	}

	footer {
		font-family: var(--mono, monospace);
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.85);
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
		letter-spacing: 0.05em;
		text-align: center;
	}
</style>
