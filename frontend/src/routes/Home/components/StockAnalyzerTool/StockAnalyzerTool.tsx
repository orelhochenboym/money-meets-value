import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RowParameter from 'routes/Home/components/StockAnalyzerTool/RowParameter/RowParameter';
import RowHeader from './RowHeader/RowHeader';
import './StockAnalyzerTool.scss';

export default function StockAnalyzerTable() {
	let { cik } = useParams();
	const [data, setData] = useState({ rg: {}, npm: {}, fcfm: {}, pe: {}, pfcf: {} });

	useEffect(() => {
		const fetchHistoricalData = async () => {
			await fetch(`http://localhost:8080/api/data/${cik}`)
				.then((response) => response.json())
				.then((results) => setData(results));
		};

		fetchHistoricalData();
		console.log(data);
	}, [cik]);

	return Object.keys(data.rg).length !== 0 ? (
		<form action='' method='get'>
			<div id='stock-analyzer-tool-container'>
				<RowHeader />
				<RowParameter stockData={data.rg} paramName='Revenue Growth %' />
				<RowParameter stockData={data.npm} paramName='Net Profit Margin %' />
				<RowParameter stockData={data.fcfm} paramName='Free Cash Flow Margin %' />
				<RowParameter stockData={data.pe} paramName='P/E (Price / Earnings)' />
				<RowParameter stockData={data.pfcf} paramName='P/FCF (Price / Free Cash Flow)' />
				<RowParameter stockData={'N/A'} paramName='Share Buybacks %' />
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
