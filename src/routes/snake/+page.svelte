<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	const GRID = 20;
	let cell = 20;
	let nextDir = { x: 1, y: 0 };
	const INTERVAL = 150;
	let touchX = 0,
		touchY = 0;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let interval: ReturnType<typeof setInterval>;

	let snake = [{ x: 10, y: 10 }];
	let dir = { x: 1, y: 0 };
	let food = randomFood();
	let score = 0;
	let dead = false;
	function resizeCanvas() {
		const maxSize = Math.min(window.innerWidth - 32, 400);
		cell = Math.floor(maxSize / GRID);
		const size = GRID * cell;
		canvas.width = size;
		canvas.height = size;
		draw();
	}

	function handleTouchStart(e: TouchEvent) {
		e.preventDefault();
		touchX = e.touches[0].clientX;
		touchY = e.touches[0].clientY;
	}

	function handleTouchEnd(e: TouchEvent) {
		e.preventDefault();
		const dx = e.changedTouches[0].clientX - touchX;
		const dy = e.changedTouches[0].clientY - touchY;
		if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
		if (Math.abs(dx) > Math.abs(dy)) setDir(dx > 0 ? 1 : -1, 0);
		else setDir(0, dy > 0 ? 1 : -1);
	}
	function setDir(dx: number, dy: number) {
		if (dir.x !== -dx || dir.y !== -dy) nextDir = { x: dx, y: dy };
	}
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
		dir = nextDir;
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
		ctx.fillRect(0, 0, GRID * cell, GRID * cell);

		ctx.fillStyle = '#00ff88';
		snake.forEach((s) => ctx.fillRect(s.x * cell, s.y * cell, cell - 1, cell - 1));

		ctx.fillStyle = '#ff4444';
		ctx.fillRect(food.x * cell, food.y * cell, cell - 1, cell - 1);
	}

	function handleKey(e: KeyboardEvent) {
		if (dead && e.key === 'Enter') {
			reset();
			return;
		}
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			setDir(0, -1);
		}
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setDir(0, 1);
		}
		if (e.key === 'ArrowLeft') {
			e.preventDefault();
			setDir(-1, 0);
		}
		if (e.key === 'ArrowRight') {
			e.preventDefault();
			setDir(1, 0);
		}
	}

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		resizeCanvas();
		window.addEventListener('resize', resizeCanvas);
		interval = setInterval(() => {
			if (!dead) tick();
		}, INTERVAL);
	});

	onDestroy(() => {
		clearInterval(interval);
		window.removeEventListener('resize', resizeCanvas);
	});
</script>

<div class="banner">📱 swipe to play on mobile</div>
<svelte:window on:keydown={handleKey} />
<div class="flex flex-col items-center justify-center min-h-screen gap-4">
	<a href="/" class="back">← charmanita.dev</a>
	<h1 class="text-[#00ff88] font-mono text-2xl">snake</h1>
	<p class="text-white font-mono">score: {score}</p>
	<canvas
		style="touch-action: none;"
		on:touchstart={handleTouchStart}
		on:touchend={handleTouchEnd}
		bind:this={canvas}
		width={GRID * cell}
		height={GRID * cell}
		class="border border-[#00ff88]"
	/>
	{#if dead}
		<p class="text-[#ff4444] font-mono cursor-pointer" on:click={reset}>
			game over - press enter to restart, if you're on mobile, tap this text box.
		</p>
		<p class="text-[#ff4444] font-mono">score: {score}</p>
	{/if}
</div>
<footer>© 2026 Hunter Roberson · charmanita.dev</footer>

<style>
	.banner {
		font-family: var(--mono);
		font-size: 0.7rem;
		color: #00ff88;
		border: 1px solid #00ff8844;
		padding: 4px 12px;
		border-radius: 4px;
		letter-spacing: 0.05em;
	}
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
	}
</style>
