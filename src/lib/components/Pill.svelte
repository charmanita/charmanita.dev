<script>
	export let href = '#';
	export let ghost = false;
	export let target = undefined;
	export let rel = undefined;
</script>

<a {href} {target} {rel} class="aero-pill" class:aero-pill-ghost={ghost}>
	<slot />
</a>
