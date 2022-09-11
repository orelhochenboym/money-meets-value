import React, { useState } from 'react';
import StockResults from '../StockResults/StockResults';
import StockSearchInput from '../StockSearchInput/StockSearchInput';
import './StockSearch.scss';

export default function StockSearchForm() {
	const [stockTicker, setStockTicker] = useState('');

	function handleChange(stockTicker: string) {
		setStockTicker(stockTicker);
	}

	return (
		<div id='stock-search-container'>
			<StockSearchInput stockTicker={stockTicker} onStockChange={handleChange} />
			<StockResults stockTicker={stockTicker} onStockChange={handleChange} />
		</div>
	);
}
