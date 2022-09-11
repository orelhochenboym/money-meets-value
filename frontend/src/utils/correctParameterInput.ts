export default function correctParameterInput(e: React.ChangeEvent<HTMLInputElement>): string {
	return (
		e.target.value
			// Replaces all characters besides the range 0-9, dot('.'), and minus('-).
			.replace(/[^0-9.-]/g, '')

			// Replaces all duplicate dots('.) - so there can be only one dot.
			.replace(/(\..*?)\..*/g, '$1')

			// Limits the accuracy of the input value to 2 decimals.
			.replace(/^([0-9]*)(\.)([0-9]{2})(.)$/g, '$1$2$3')

			// Replaces all duplicate minuses. There can be only one minus at the start of the value string.
			.replace(/(-.*?)-.*/g, '$1')

			// Replaces the string '-0' with '0'.
			.replace(/^-0[^.]/g, '0')

			// Replaces duplicate zeros on the integer part of the number (left to the '.').
			.replace(/^0[^.]/g, '0')
	);
}
