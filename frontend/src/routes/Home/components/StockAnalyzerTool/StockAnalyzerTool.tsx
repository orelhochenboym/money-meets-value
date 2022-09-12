import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RowParameter from 'routes/Home/components/StockAnalyzerTool/RowParameter/RowParameter';
import RowHeader from './RowHeader/RowHeader';
import './StockAnalyzerTool.scss';

export default function StockAnalyzerTable() {
	let { stockTicker } = useParams();
	const [data, setData] = useState({ rg: {}, npm: {}, fcfm: {}, sb: {} });

	useEffect(() => {
		const fetchHistoricalData = async () => {
			await fetch(`http://localhost:8080/api/data/${stockTicker}`)
				.then((response) => response.json())
				.then((results) => setData(results));
		};

		fetchHistoricalData();
	}, [stockTicker]);

	return Object.keys(data.rg).length !== 0 ? (
		<form action='' method='get'>
			<div id='stock-analyzer-tool-container'>
				<RowHeader stockTicker={stockTicker!} />
				<RowParameter stockData={data.rg} paramName='Revenue Growth %' />
				<RowParameter stockData={data.npm} paramName='Net Profit Margin %' />
				<RowParameter stockData={data.fcfm} paramName='Free Cash Flow Margin %' />
				<RowParameter stockData={data.sb} paramName='Share Buybacks %' />
				<RowParameter stockData={'N/A'} paramName='P/E (Price / Earnings)' />
				<RowParameter stockData={'N/A'} paramName='P/FCF (Price / Free Cash Flow)' />
				<RowParameter stockData={'N/A'} paramName='Desired Annual Returns %' />
				<div id='calculate-btn-container'>
					<button id='calculate-btn' type='submit'>
						Calculate
					</button>
				</div>
			</div>
		</form>
	) : (
		<div />
	);
}
