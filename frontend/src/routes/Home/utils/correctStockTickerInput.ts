import React from 'react';

export default function correctStockTickerInput(e: React.ChangeEvent<HTMLInputElement>): string {
	return (
		e.target.value
			// Replaces any character which isn't a letter.
			.replace(/[^a-zA-Z]/g, '')

			// Replaces all duplicate dots('.) - so there can be only one dot.
			.replace(/(\..*?)\..*/g, '$1')

			// Replaces any character which isn't a letter.
			.replace(/([a-zA-Z]{5})(.)/g, '$1')
			.toUpperCase()
	);
}
