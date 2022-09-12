import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RowParameter from 'routes/Home/components/StockAnalyzerTool/RowParameter/RowParameter';
import RowHeader from './RowHeader/RowHeader';
import './StockAnalyzerTool.scss';

export default function StockAnalyzerTable() {
	let { stockTicker } = useParams();
	const [data, setData] = useState({ rg: {}, npm: {}, fcfm: {}, sb: {} });

	const fetchHistoricalData = async () => {
		await fetch(`http://localhost:8080/api/data/${stockTicker}`)
			.then((response) => response.json())
			.then((results) => setData(results));
	};

	useEffect(() => {
		fetchHistoricalData();
	}, []);

	return Object.keys(data.rg).length !== 0 ? (
		<form action='' method='get'>
			<div id='stock-analyzer-tool-container'>
				<RowHeader stockTicker={stockTicker!} />
				<RowParameter stockData={data.rg} stockTicker={stockTicker!} paramName='Revenue Growth %' />
				<RowParameter stockData={data.npm} stockTicker={stockTicker!} paramName='Net Profit Margin %' />
				<RowParameter stockData={data.fcfm} stockTicker={stockTicker!} paramName='Free Cash Flow Margin %' />
				<RowParameter stockData={data.sb} stockTicker={stockTicker!} paramName='Share Buybacks %' />
				<RowParameter stockData={'N/A'} stockTicker={stockTicker!} paramName='P/E (Price / Earnings)' />
				<RowParameter stockData={'N/A'} stockTicker={stockTicker!} paramName='P/FCF (Price / Free Cash Flow)' />
				<RowParameter stockData={'N/A'} stockTicker={stockTicker!} paramName='Desired Annual Returns %' />
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
