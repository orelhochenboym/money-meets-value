import React from 'react';
import { Outlet } from 'react-router-dom';
import StockSearch from './components/StockSearch/StockSearch';

export default function Home() {
	return (
		<>
			<StockSearch />
			<Outlet />
		</>
	);
}
