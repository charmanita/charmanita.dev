<script lang="ts">
	import { onMount } from 'svelte';
	import { formatDate } from '$lib/utils/date';

	let { isoString }: { isoString: string } = $props();

	let display = $state('');

	onMount(() => {
		display = formatDate(isoString);
	});
</script>

<time datetime={isoString}>{display}</time>
