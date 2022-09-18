import React from 'react';
import './ParameterData.scss';

type Props = {
	paramType: string;
	stockData: any;
};

export default function ParameterData(props: Props) {
	let yearOne = props.stockData[1];
	let yearFive = props.stockData[5];
	let yearTen = props.stockData[10];
	if (props.paramType === 'pe' || props.paramType === 'pfcf') {
		return (
			<div id='data-container'>
				<div id='one-year-data'>{yearOne !== 'N/A' ? `${yearOne}` : 'N/A'}</div>
				<div id='five-year-data'>{yearFive !== 'N/A' ? `${yearFive}` : 'N/A'}</div>
				<div id='ten-year-data'>{yearTen !== 'N/A' ? `${yearTen}` : 'N/A'}</div>
			</div>
		);
	}
	return props.paramType === 'dar' || props.paramType === 'sb' ? (
		<div id='data-container'></div>
	) : (
		<div id='data-container'>
			<div id='one-year-data'>{yearOne !== 'N/A' ? `${yearOne}%` : 'N/A'}</div>
			<div id='five-year-data'>{yearFive !== 'N/A' ? `${yearFive}%` : 'N/A'}</div>
			<div id='ten-year-data'>{yearTen !== 'N/A' ? `${yearTen}%` : 'N/A'}</div>
		</div>
	);
}
