import React from 'react';
import ParameterData from 'routes/Home/components/StockAnalyzerTool/RowParameter/ParameterData/ParameterData';
import ParameterInput from 'routes/Home/components/StockAnalyzerTool/RowParameter/ParameterInput/ParameterInput';
import ParameterLabel from 'routes/Home/components/StockAnalyzerTool/RowParameter/ParameterLabel/ParameterLabel';
import './RowParameter.scss';

type Props = {
	paramName: string;
	stockTicker: string;
	stockData: Object;
};

const vocabulary: object = {
	'Revenue Growth %': 'rg',
	'Net Profit Margin %': 'npm',
	'Free Cash Flow Margin %': 'fcfm',
	'P/E (Price / Earnings)': 'pe',
	'P/FCF (Price / Free Cash Flow)': 'pfcf',
	'Share Buybacks %': 'sb',
	'Desired Annual Returns %': 'dar',
};

export default function RowParameter(props: Props) {
	const paramType = vocabulary[props.paramName as keyof typeof vocabulary];
	return (
		<div id='param-row-container'>
			<ParameterLabel paramString={props.paramName} paramType={paramType} />
			<ParameterData stockData={props.stockData} stockTicker={props.stockTicker} paramType={paramType} />
			<ParameterInput paramType={paramType} />
		</div>
	);
}
