import React from 'react';
import HeaderHistorical from 'routes/Home/components/StockAnalyzerTool/RowHeader/HeaderHistorical/HeaderHistorical';
import HeaderMyAssumptions from 'routes/Home/components/StockAnalyzerTool/RowHeader/HeaderMyAssumptions/HeaderMyAssumptions';
import HeaderStockLabel from 'routes/Home/components/StockAnalyzerTool/RowHeader/HeaderStockLabel/HeaderStockLabel';
import './RowHeader.scss';

type Props = {
	stockTicker: string;
};

export default function RowHeader(props: Props) {
	return (
		<div id='row-header-container'>
			<HeaderStockLabel stockTicker={props.stockTicker} />
			<HeaderHistorical />
			<HeaderMyAssumptions />
		</div>
	);
}
