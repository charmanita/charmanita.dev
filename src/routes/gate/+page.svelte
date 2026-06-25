<script lang="ts">
	import { goto } from '$app/navigation';
	import Cookies from 'js-cookie';

	let password = '';
	let error = '';
	let loading = false;

	async function login() {
		loading = true;
		error = '';
		try {
			const res = await fetch('https://api.charmanita.dev/auth/gate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password })
			});
			if (!res.ok) {
				error = 'Invalid password.';
				return;
			}
			const data = await res.json();
			Cookies.set('gate_token', data.token, { expires: 7 });
			goto('/');
		} catch {
			error = 'Something went wrong.';
		} finally {
			loading = false;
		}
	}
</script>

<main>
	<h1>Password Required</h1>
	<input
		type="password"
		bind:value={password}
		placeholder="Enter password..."
		on:keydown={(e) => e.key === 'Enter' && login()}
	/>
	<button on:click={login} disabled={loading}>
		{loading ? 'Checking...' : 'Enter'}
	</button>
	{#if error}<p class="error">{error}</p>{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		gap: 1rem;
		background: #000;
		color: white;
	}
	input {
		padding: 0.5rem 1rem;
		background: #0d0d1a;
		border: 1px solid #333;
		color: white;
		border-radius: 4px;
		width: 250px;
	}
	button {
		padding: 0.5rem 1.5rem;
		background: #00ff88;
		color: #000;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-weight: bold;
	}
	.error {
		color: red;
		font-size: 0.85rem;
	}
</style>
