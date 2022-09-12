import React from 'react';
import './HeaderStockLabel.scss';

type Props = {
	stockTicker: string;
};

export default function HeaderStockLabel(props: Props) {
	return (
		<>
			<div id='stock-label-header-container'>{`Stock Ticker: ${props.stockTicker}`}</div>
		</>
	);
}
