<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { formatDate } from '$lib/utils/date';
	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<h1 class="aero-heading">charmanita<span class="dot">.</span>dev guestbook</h1>
<p class="aero-body">Leave a note on the guestbook of <a href="https://charmanita.dev">charmanita.dev</a>!</p>
<form method="POST" use:enhance class="aero-glass guestbook-form">
	<label>
		Name
		<input type="text" name="name" required maxlength="60"/>
	</label>
	<label>
		Email <span class="optional">(optional, not shown publicly)</span>
		<input type="email" name="email" maxlength="255" />
	</label>
	<p class="email-disclaimer">
		If you share your email, you agree to subscribing to my blog at <a href="https://blog.charmanita.dev">blog.charmanita.dev</a>!
	</p>

	<label>
		Message
		<textarea name="message" required maxlength="500"></textarea>
	</label>
	{#if form?.error}
		<p class="form-error">{form.error}</p>
	{/if}

	<button type="submit" class=aero-pill>Sign the guestbook!</button>
</form>
<div class="entries">
	{#each data.entries as entry (entry.id)}
		<article class="aero-glass entry">
			<time datetime={entry.created_at}>{formatDate(entry.created_at)}</time>
			<p class="entry-name">{entry.name}</p>
			<p class="entry-message">{entry.message}</p>
		</article>
	{:else}
		<p class="empty">
			No entries yet - be the first to say something on the guestbook of
			<a href="https://charmanita.dev">charmanita.dev!</a>
		</p>
	{/each}
</div>

<style>
	.email-disclaimer {
		font-size: 0.75rem;
		color: var(--aero-ink-soft);
		opacity: 0.8;
		margin-top: -0.25rem;
	}
	.entries {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 640px;
		margin: 0 auto;
		padding: 1rem;
	}

	.entry {
		padding: 1.25rem 1.5rem;
	}

	.entry time {
		display: block;
		font-size: 0.75rem;
		color: var(--aero-ink-soft);
		opacity: 0.75;
		margin-bottom: 0.35rem;
	}

	.entry-name {
		font-family: var(--aero-font-display);
		font-weight: 700;
		color: var(--aero-ink);
	}

	.entry-message {
		margin-top: 0.25rem;
		color: var(--aero-ink-soft);
	}

	.empty {
		text-align: center;
		color: var(--aero-ink-soft);
	}

	.empty a {
		color: var(--aero-aqua);
	}
	.guestbook-form {
		max-width: 640px;
		margin: 0 auto 1.5rem;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.guestbook-form label {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		font-family: var(--aero-font-body);
		color: var(--aero-ink-soft);
		font-size: 0.85rem;
	}

	.guestbook-form input,
	.guestbook-form textarea {
		font-family: var(--aero-font-body);
		padding: 0.5rem 0.75rem;
		border-radius: 10px;
		border: 1px solid var(--aero-glass-border);
		background: var(--aero-inset-bg);
		color: var(--aero-ink);
	}

	.guestbook-form textarea {
		resize: vertical;
		min-height: 80px;
	}

	.form-error {
		color: var(--aero-accent);

		font-size: 0.85rem;
	}
</style>