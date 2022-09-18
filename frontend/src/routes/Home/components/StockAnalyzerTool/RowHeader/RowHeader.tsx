import React from 'react';
import HeaderHistorical from 'routes/Home/components/StockAnalyzerTool/RowHeader/HeaderHistorical/HeaderHistorical';
import HeaderMyAssumptions from 'routes/Home/components/StockAnalyzerTool/RowHeader/HeaderMyAssumptions/HeaderMyAssumptions';
import HeaderStockLabel from 'routes/Home/components/StockAnalyzerTool/RowHeader/HeaderStockLabel/HeaderStockLabel';
import './RowHeader.scss';

export default function RowHeader() {
	return (
		<div id='row-header-container'>
			<HeaderStockLabel />
			<HeaderHistorical />
			<HeaderMyAssumptions />
		</div>
	);
}
