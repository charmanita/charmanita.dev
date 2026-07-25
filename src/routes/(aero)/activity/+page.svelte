<script lang="ts">
	import { onMount } from 'svelte';

	type Commit = {
		repo: string;
		branch: string;
		pusher: string;
		message: string;
		sha: string;
		url: string;
		timestamp: string;
	};

	let commits: Commit[] = [];
	let loading = true;

	function timeAgo(ts: string): string {
		const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
		if (diff < 60) return `${diff}s ago`;
		if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
		if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
		return `${Math.floor(diff / 86400)}d ago`;
	}

	onMount(async () => {
		const res = await fetch('https://api.charmanita.dev/public/commits');
		commits = await res.json();
		loading = false;
	});
</script>

<svelte:head>
	<title>activity - charmanita.dev</title>
	<meta name="theme-color" content="#00ff88" />
</svelte:head>

<main>
	<div class="center">
		<a href="/" class="aero-pill aero-pill ghost back">← charmanita.dev</a>
		<p class="aero-heading title">activity</p>

		{#if loading}
			<p class="empty">loading...</p>
		{:else if commits.length === 0}
			<p class="empty">no commits yet</p>
		{:else}
			<div class="aero-glass feed">
				{#each commits as c}
					<a href={c.url} target="_blank" rel="noopener" class="entry">
						<div class="entry-top">
							<span class="repo">{c.repo.split('/')[1]}</span>
							<span class="branch">{c.branch}</span>
							<span class="time">{timeAgo(c.timestamp)}</span>
						</div>
						<div class="entry-bottom">
							<span class="sha">{c.sha}</span>
							<span class="msg">{c.message}</span>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</main>

<style>
	main {
		width: 100%;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		padding: 4rem 1rem;
	}

	.center {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		width: min(480px, 100%);
	}

	.back {
		font-family: var(--aero-font-display);
		font-size: 0.7rem;
		color: var(--aero-ink-soft);
		text-decoration: none;
		letter-spacing: 0.1em;
		align-self: flex-start;
		transition: color 0.2s ease;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.05s;
	}

	.back:hover {
		color: #fff;
	}

	.title {
		font-family: var(--aero-font-display);
		font-size: clamp(1rem, 4vw, 1.4rem);
		font-weight: 400;
		color: var(--aero-ink);
		letter-spacing: 0.04em;
		align-self: flex-start;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.15s;
	}

	.feed {
		display: flex;
		flex-direction: column;
		width: 100%;
		border-radius: 4px;
		overflow: hidden;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards 0.3s;
	}

	.entry {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		padding: 1rem 1.5rem;
		border-bottom: 1px solid var(--aero-divider);
		text-decoration: none;
		transition: background 0.15s ease;
	}

	.entry:last-child {
		border-bottom: none;
	}

	.entry:hover {
		background: var(--aero-inset-bg);
	}

	.entry:top {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.repo {
		font-family: var(--aero-font-body);
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--aero-aqua-deep);
		letter-spacing: 0.05em;
	}

	.branch {
		font-family: var(--aero-font-body);
		font-size: 0.65rem;
		color: var(--aero-ink-soft);
		letter-spacing: 0.05em;
	}

	.time {
		font-family: var(--aero-font-body);
		font-size: 0.65rem;
		color: var(--aero-ink-soft);
		letter-spacing: 0.05em;
		margin-left: auto;
	}

	.entry-bottom {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.sha {
		font-family: var(--aero-font-body);
		font-size: 0.65rem;
		color: var(--aero-ink-soft);
		letter-spacing: 0.05em;
		flex-shrink: 0;
	}

	.msg {
		font-family: var(--aero-font-body);
		font-size: 0.7rem;
		color: var(--aero-ink);
		letter-spacing: 0.03em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.empty {
		font-family: var(--aero-font-body);
		font-size: 0.75rem;
		color: var(--aero-ink-soft);
		letter-spacing: 0.1em;
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
