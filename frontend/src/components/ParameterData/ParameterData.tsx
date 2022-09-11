import React from 'react';
import './ParameterData.scss';

type Props = {
	stockTicker: string;
	paramType: string;
	stockData: any;
};

export default function ParameterData(props: Props) {
	let { yearOne, yearFive, yearTen } = props.stockData;
	return props.paramType === 'dar' || props.paramType === 'pe' || props.paramType === 'pfcf' ? (
		<div id='data-container'></div>
	) : (
		<div id='data-container'>
			<div id='one-year-data'>{yearOne !== -101 ? `${yearOne}%` : 'N/A'}</div>
			<div id='five-year-data'>{yearFive !== -101 ? `${yearFive}%` : 'N/A'}</div>
			<div id='ten-year-data'>{yearTen !== -101 ? `${yearTen}%` : 'N/A'}</div>
		</div>
	);
}
