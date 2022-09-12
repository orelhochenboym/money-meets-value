import React, { useState } from 'react';
import StockSearchInput from 'routes/Home/components/StockSearch/StockSearchInput/StockSearchInput';
import StockSearchResults from 'routes/Home/components/StockSearch/StockSearchResults/StockSearchResults';
import './StockSearch.scss';

export default function StockSearchForm() {
	const [stockTicker, setStockTicker] = useState('');

	function handleChange(stockTicker: string) {
		setStockTicker(stockTicker);
	}

	return (
		<div id='stock-search-container'>
			<StockSearchInput stockTicker={stockTicker} onStockChange={handleChange} />
			<StockSearchResults stockTicker={stockTicker} />
		</div>
	);
}
