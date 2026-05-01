<script lang="ts">
	import { goto } from '$app/navigation';
	import Cookies from 'js-cookie';
	import { API } from '$lib/api';

	let username = '';
	let password = '';
	let error = '';

	async function login() {
		const res = await fetch(`${API}/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		if (res.ok) {
			const data = await res.json();
			Cookies.set('token', data.token, { expires: 7 });
			goto('/minecraft-server/admin/dashboard');
		} else {
			error = 'Invalid credentials';
		}
	}
</script>

<svelte:head>
	<title>minecraft server admin portal - charmanita.dev</title>
	<meta property="og:title" content="Minecraft Server Admin Portal - charmanita.dev" />
	<meta property="og:description" content="Minecraft Server Admin Portal" />
</svelte:head>
<main>
	<a href="/" class="back">← charmanita.dev</a>
	<h1>Minecraft Server Admin Portal</h1>
	<input bind:value={username} placeholder="Username" />
	<input bind:value={password} type="password" placeholder="Password" />
	<button on:click={login}>Login</button>
	{#if error}<p class="error">{error}</p>{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		gap: 1rem;
		background: #000000;
		color: white;
	}
	input {
		padding: 0.5rem 1rem;
		background: #000000;
		border: 1px solid #333;
		color: white;
		border-radius: 4px;
	}
	button {
		padding: 0.5rem 2rem;
		background: #00ff88;
		color: #080b0f;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-weight: bold;
	}
	.error {
		color: red;
	}
</style>
