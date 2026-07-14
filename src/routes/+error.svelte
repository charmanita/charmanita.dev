<script>
	import { page } from '$app/stores';
</script>

<div>
	{#if $page.status === 404}
		<h1 class="text-black">
			404 page not found... if a page is supposed to be here, and is not showing up, please contact
			me.
			<a href="mailto:contact@charmanita.dev" class="contact-item">
				<span class="contact-icon">✉</span>
				<span>contact@charmanita.dev</span>
			</a>
		</h1>
		<img src="/images/stare.png" alt="error" />
	{:else}
		<h1 class="text-black">{$page.status}</h1>
		<p>{$page.error?.message}</p>
		<img src="/images/stare.png" alt="error" />
	{/if}
	<h1 class="text-black">
		<a href="/">← charmanita.dev</a>
	</h1>
	<footer>© 2026 Hunter Roberson · charmanita.dev</footer>
</div>

<style>
	.text-black {
		color: black;
		text-align: center;
	}
	img {
		display: block;
		margin: 0 auto;
	}
	footer {
		border-top: 1px solid var(--border);
		padding: 2rem;
		text-align: center;
		font-family: var(--mono);
		font-size: 0.75rem;
		color: white;
		letter-spacing: 0.05em;
	}
</style>
