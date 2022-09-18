import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './StockSearchResults.scss';

type Props = {
	stockTicker: string;
};

export default function StockSearchResults(props: Props) {
	const [data, setData] = useState([{ ticker: '', name: '', cik: '' }]);

	useEffect(() => {
		if (props.stockTicker !== '') {
			const timeoutId = setTimeout(async () => {
				await fetch(`http://localhost:8080/api/search/${props.stockTicker}`)
					.then((response) => response.json())
					.then((results) => setData(results));
			}, 1000);
			return () => clearTimeout(timeoutId);
		} else {
			setData([{ ticker: '', name: '', cik: '' }]);
		}
	}, [props.stockTicker]);

	return data.length === 1 ? (
		<div />
	) : (
		<div id='search-results-container'>
			{data.map((searchResult, i) => (
				<NavLink reloadDocument={true} id='result' key={i} to={`/calculate/${searchResult.cik}`}>{`${searchResult.ticker} - ${searchResult.name}`}</NavLink>
			))}
		</div>
	);
}
