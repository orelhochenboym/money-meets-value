import 'assets/global.scss';
import StockAnalyzerTool from 'components/StockAnalyzerTool/StockAnalyzerTool';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from 'routes/Home/Home';

export default function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Home />}>
					<Route path='calculate/:stockTicker' element={<StockAnalyzerTool />} />
				</Route>
				<Route path='*' element={<Navigate to={'/'} />} />
			</Routes>
		</div>
	);
}
