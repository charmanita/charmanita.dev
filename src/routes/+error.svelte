<script>
	import { page } from '$app/stores';
</script>

<div>
	{#if $page.status === 404}
		<h1 class="text-white">
			404 page not found... if a page is supposed to be here, and is not showing up, please contact
			me.
			<a href="mailto:hdroberson23@gmail.com" class="contact-item">
				<span class="contact-icon">✉</span>
				<span>hdroberson23@gmail.com</span>
			</a>
		</h1>
		<img src="/images/stare.png" alt="error" />
	{:else}
		<h1 class="text-white">{$page.status}</h1>
		<p>{$page.error?.message}</p>
		<img src="/images/stare.png" alt="error" />
	{/if}
	<h1 class="text-white">
		<a href="/">← charmanita.dev</a>
	</h1>
</div>

<style>
	.text-white {
		color: white;
		text-align: center;
	}
	img {
		display: block;
		margin: 0 auto;
	}
</style>
