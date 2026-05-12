<script>
	import { page } from '$app/stores';
</script>

<div>
	{#if $page.status === 404}
		<h1 class="text-white">
			404 page not found... if a page is supposed to be here, and is not showing up, please contact
			me.
		</h1>
		<img src="/images/stare.png" alt="error" />
	{:else}
		<h1 class="text-white">{$page.status}</h1>
		<p>{$page.error?.message}</p>
		<img src="/images/stare.png" alt="error" />
	{/if}
	<a href="/">charmanita.dev</a>
</div>
