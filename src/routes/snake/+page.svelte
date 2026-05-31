<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	const GRID = 20;
	const CELL = 20;
	const INTERVAL = 150;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let interval: ReturnType<typeof setInterval>;

	let snake = [{ x: 10, y: 10 }];
	let dir = { x: 1, y: 0 };
	let food = randomFood();
	let score = 0;
	let dead = false;

	function randomFood() {
		return {
			x: Math.floor(Math.random() * GRID),
			y: Math.floor(Math.random() * GRID)
		};
	}

	function reset() {
		snake = [{ x: 10, y: 10 }];
		dir = { x: 1, y: 0 };
		food = randomFood();
		score = 0;
		dead = false;
	}

	function tick() {
		const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

		// wall collision
		if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID) {
			dead = true;
			return;
		}

		// self collision
		if (snake.some((s) => s.x === head.x && s.y === head.y)) {
			dead = true;
			return;
		}
		snake = [head, ...snake];

		if (head.x === food.x && head.y === food.y) {
			score++;
			food = randomFood();
		} else {
			snake = snake.slice(0, -1);
		}

		draw();
	}

	function draw() {
		ctx.fillStyle = '#080b0f';
		ctx.fillRect(0, 0, GRID * CELL, GRID * CELL);

		ctx.fillStyle = '#00ff88';
		snake.forEach((s) => ctx.fillRect(s.x * CELL, s.y * CELL, CELL - 1, CELL - 1));

		ctx.fillStyle = '#ff4444';
		ctx.fillRect(food.x * CELL, food.y * CELL, CELL - 1, CELL - 1);
	}

	function handleKey(e: KeyboardEvent) {
		if (dead && e.key === 'Enter') {
			reset();
			return;
		}
		if (e.key === 'ArrowUp' && dir.y === 0) dir = { x: 0, y: -1 };
		if (e.key === 'ArrowDown' && dir.y === 0) dir = { x: 0, y: 1 };
		if (e.key === 'ArrowLeft' && dir.x === 0) dir = { x: -1, y: 0 };
		if (e.key === 'ArrowRight' && dir.x === 0) dir = { x: 1, y: 0 };
	}

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		draw();
		interval = setInterval(() => {
			if (!dead) tick();
		}, INTERVAL);
	});

	onDestroy(() => clearInterval(interval));
</script>

<svelte:window on:keydown={handleKey} />
<div class="flex flex-col items-center justify-center min-h-screen gap-4">
	<a href="/" class="back">← charmanita.dev</a>
	<h1 class="text-[#00ff88] font-mono text-2xl">snake</h1>
	<p class="text-white font-mono">score: {score}</p>
	<canvas
		bind:this={canvas}
		width={GRID * CELL}
		height={GRID * CELL}
		class="border border-[#00ff88]"
	/>
	{#if dead}
		<p class="text-[#ff4444] font-mono">game over - you suck (press enter to restart)</p>
		<p class="text-[#ff4444] font-mono">score: {score}</p>
	{/if}
</div>
<footer>© 2026 Hunter Roberson · charmanita.dev</footer>

<style>
	.back {
		font-size: 0.75rem;
		color: #444;
		text-decoration: none;
		letter-spacing: 0.1em;
		transition: color 0.2s ease;
	}
	.back:hover {
		color: #fff;
	}
	footer {
		border-top: 1px solid var(--border);
		padding: 2rem;
		text-align: center;
		font-family: var(--mono);
		font-size: 0.75rem;
		color: white;
		letter-spacing: 0.05em;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
