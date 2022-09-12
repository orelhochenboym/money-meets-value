import 'assets/global.scss';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import StockAnalyzerTool from 'routes/Home/components/StockAnalyzerTool/StockAnalyzerTool';
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
