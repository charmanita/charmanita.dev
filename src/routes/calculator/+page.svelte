<script>
	let displayValue = '';

	function appendToDisplay(input) {
		displayValue += input;
	}
	function clearDisplay() {
		displayValue = '';
	}
	function calculate() {
		try {
			const result = eval(displayValue);
			if (!isFinite(result)) {
				displayValue = 'Error';
			} else {
				displayValue = String(result);
			}
		} catch (e) {
			displayValue = 'Error';
		}
	}

	function handleKeydown(e) {
		if ('0123456789.+-*/'.includes(e.key)) appendToDisplay(e.key);
		else if (e.key === 'Enter' || e.key === '=') calculate();
		else if (e.key === 'Backspace') displayValue = displayValue.slice(0, -1);
		else if (e.key === 'Escape') clearDisplay();
	}
</script>

<svelte:window on:keydown={handleKeydown} />
<svelte:head>
	<title>calculator</title>
</svelte:head>
<div class="page">
	<main>
		<div class="center">
			<a href="/" class="back">← charmanita.dev</a>
			<p class="title">calculator</p>
			<a href="https://www.youtube.com/watch?v=I5kj-YsmWjM"
				>Credit to BroCode for the tutorial (click here)</a
			>
		</div>
		<div id="calculator">
			<input id="display" bind:value={displayValue} readonly />
			<div id="keys">
				<button on:click={() => appendToDisplay('+')} class="operator-btn">+</button>
				<button on:click={() => appendToDisplay('7')}>7</button>
				<button on:click={() => appendToDisplay('8')}>8</button>
				<button on:click={() => appendToDisplay('9')}>9</button>
				<button on:click={() => appendToDisplay('-')} class="operator-btn">-</button>
				<button on:click={() => appendToDisplay('4')}>4</button>
				<button on:click={() => appendToDisplay('5')}>5</button>
				<button on:click={() => appendToDisplay('6')}>6</button>
				<button on:click={() => appendToDisplay('*')} class="operator-btn">*</button>
				<button on:click={() => appendToDisplay('1')}>1</button>
				<button on:click={() => appendToDisplay('2')}>2</button>
				<button on:click={() => appendToDisplay('3')}>3</button>
				<button on:click={() => appendToDisplay('/')} class="operator-btn">/</button>
				<button on:click={() => appendToDisplay('0')}>0</button>
				<button on:click={() => appendToDisplay('.')}>.</button>
				<button on:click={calculate}>=</button>
				<button on:click={clearDisplay} class="operator-btn">C</button>
			</div>
		</div>
	</main>
</div>

<style>
	.page {
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: hsl(0, 8%, 15%);
		text-align: center;
	}
	#calculator {
		font-family: Arial, sans-serif;
		background-color: hsl(0, 0%, 15%);
		border-radius: 15px;
		max-width: 500px;
		overflow: hidden;
	}
	#display {
		width: 100%;
		padding: 20px;
		font-size: 5rem;
		text-align: left;
		border: none;
		background-color: hsl(0, 0%, 20%);
		color: white;
	}
	#keys {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 10px;
		padding: 25px;
	}
	button {
		width: 100px;
		height: 100px;
		border-radius: 50px;
		border: none;
		background-color: hsl(0, 0%, 30%);
		color: white;
		font-size: 3rem;
		font-weight: bold;
		cursor: pointer;
	}
	button:hover {
		background-color: hsl(0, 0%, 40%);
	}
	button:active {
		background-color: hsl(0, 0%, 50%);
	}
	.operator-btn {
		background-color: hsl(35, 100%, 55%);
	}
	.operator-btn:hover {
		background-color: hsl(35, 100%, 65%);
	}
	.operator-btn:active {
		background-color: hsl(35, 100%, 75%);
	}
</style>
