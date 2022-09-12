import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './StockResults.scss';

type Props = {
	stockTicker: string;
	onStockChange: Function;
};

export default function StockResults(props: Props) {
	const [data, setData] = useState({});

	useEffect(() => {
		if (props.stockTicker !== '') {
			const timeoutId = setTimeout(async () => {
				await fetch(`http://localhost:8080/api/search/${props.stockTicker}`)
					.then((response) => response.json())
					.then((results) => setData(results));
			}, 1000);
			return () => clearTimeout(timeoutId);
		} else {
			setData({});
		}
	}, [props.stockTicker]);

	return Object.keys(data).length === 0 ? (
		<div />
	) : (
		<div id='search-results-container'>
			{Object.keys(data).map((key, i) => (
				<NavLink reloadDocument={true} id='result' key={i} to={`/calculate/${key}`}>{`${key} - ${data[key as keyof typeof data]}`}</NavLink>
			))}
		</div>
	);
}
