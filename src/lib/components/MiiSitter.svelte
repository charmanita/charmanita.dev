<script lang="ts">
	export let pose: 'sitting' | 'waving' | 'fists' | 'clasped' | 'singing' | 'leaning' | 'wink' =
		'sitting';
	export let size: string | undefined = undefined;
	export let lift: number = 78;
</script>

<img
	class="mii-sitter"
	style={`--mii-lift: -${lift}%;${size ? ` --mii-size: ${size};` : ''}`}
	src="/images/mii-{pose}.png"
	alt=""
	aria-hidden="true"
/>

<style>
	.mii-sitter {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, var(--mii-lift, -78%));
		width: var(--mii-size, clamp(90px, 16vw, 130px));
		height: auto;
		pointer-events: none;
		user-select: none;
		filter: drop-shadow(0 8px 10px rgba(20, 90, 110, 0.25));
	}
</style>
