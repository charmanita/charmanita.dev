<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { dev } from '$app/environment';
	import Cookies from 'js-cookie';

	onMount(() => {
		if (!dev && !Cookies.get('gate_token')) {
			goto(`/gate?redirect=${encodeURIComponent(window.location.pathname)}`);
		}
	});
</script>

<slot />
