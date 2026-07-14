<script>
	export let maxWidth = '560px';
</script>

<div class="aero-glass panel" style="--panel-max-width: {maxWidth}">
	<slot />
</div>

<style>
	.panel {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
		padding: 2.5rem clamp(1.5rem, 6vw, 3.5rem);
		max-width: min(92vw, var(--panel-max-width));
	}
</style>
