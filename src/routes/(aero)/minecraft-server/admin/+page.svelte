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
	<div class="back-row">
		<a href="/" class="back aero-pill aero-pill-ghost">← charmanita.dev</a>
	</div>

	<div class="center">
		<h1 class="aero-heading title">admin portal</h1>

		<div class="card aero-glass">
			<label class="field">
				<span class="label">username</span>
				<input bind:value={username} placeholder="Username" />
			</label>
			<label class="field">
				<span class="label">password</span>
				<input bind:value={password} type="password" placeholder="Password" />
			</label>

			<button class="aero-pill login-btn" on:click={login}>Login</button>

			{#if error}<p class="error">{error}</p>{/if}
		</div>
	</div>
</main>

<style>
	main {
		position: relative;
		z-index: 1;
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 4rem 1rem;
		gap: 1.75rem;
	}

	.back-row {
		width: min(400px, 90vw);
		display: flex;
		justify-content: flex-start;
	}

	.back {
		font-size: 0.7rem;
		letter-spacing: 0.06em;
	}

	.center {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		width: min(400px, 90vw);
	}

	.title {
		font-size: clamp(1.4rem, 5vw, 1.9rem);
		text-align: center;
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
		width: 100%;
		padding: 1.75rem 1.5rem;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.label {
		font-size: 0.68rem;
		color: var(--aero-ink-soft);
		opacity: 0.7;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	input {
		font-family: var(--aero-font-body);
		font-size: 0.9rem;
		color: var(--aero-ink);
		padding: 0.65rem 1rem;
		border-radius: 14px;
		border: 1px solid var(--aero-glass-border);
		background: linear-gradient(180deg, var(--aero-glass-hi), var(--aero-glass-lo));
		box-shadow: inset 0 1px 3px var(--aero-shadow);
		outline: none;
		transition:
			border-color 0.18s ease,
			box-shadow 0.18s ease;
	}

	input:focus {
		border-color: var(--aero-aqua);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--aero-aqua) 20%, transparent);
	}

	input::placeholder {
		color: var(--aero-ink-soft);
		opacity: 0.5;
	}

	.login-btn {
		margin-top: 0.4rem;
		width: 100%;
		text-align: center;
		font-weight: 600;
		cursor: pointer;
		border: none;
		background: linear-gradient(180deg, var(--aero-aqua), var(--aero-aqua-deep));
		color: #fff;
	}

	.login-btn:hover {
		color: #fff;
	}

	.error {
		font-size: 0.75rem;
		color: var(--status-offline);
		text-align: center;
	}
</style>
