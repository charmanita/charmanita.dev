const TIME_ZONE = 'America/Chicago'; 

const dateFormatter = new Intl.DateTimeFormat(undefined, {
	year: 'numeric',
	month: 'short',
	day: 'numeric',
	timeZone: TIME_ZONE
});

const timeFormatter = new Intl.DateTimeFormat(undefined, {
	hour: 'numeric',
	minute: '2-digit',
	timeZone: TIME_ZONE
});

export function formatDate(isoString: string): string {
	const date = new Date(isoString);
	return `${dateFormatter.format(date)} (${timeFormatter.format(date)})`;
}