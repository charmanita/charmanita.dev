<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&display=swap"
		rel="stylesheet"
	/>
	<link rel="canonical" href="https://charmanita.dev/" />
</svelte:head>
{@render children()}

<style>
	:global(body) {
		font-family: 'IBM Plex Mono', monospace;
	}
</style>
