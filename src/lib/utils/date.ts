const dateFormatter = new Intl.DateTimeFormat(undefined, {
	year: 'numeric',
	month: 'short',
	day: 'numeric'
});

const timeFormatter = new Intl.DateTimeFormat(undefined, {
	hour: 'numeric',
	minute: '2-digit'
});

export function formatDate(isoString: string): string {
	const date = new Date(isoString);
	return `${dateFormatter.format(date)} (${timeFormatter.format(date)})`;
}