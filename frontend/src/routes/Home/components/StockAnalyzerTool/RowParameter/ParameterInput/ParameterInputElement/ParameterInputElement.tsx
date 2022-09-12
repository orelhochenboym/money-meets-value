import React, { useState } from 'react';
import correctParameterInput from 'routes/Home/utils/correctParameterInput';
import './ParameterInputElement.scss';

type Props = {
	assumptionType: string;
	paramType: string;
};

export default function ParameterInputElement(props: Props) {
	const [assumption, setAssumption] = useState('');

	function onAssumptionChange(e: React.ChangeEvent<HTMLInputElement>): void {
		e.target.value = correctParameterInput(e);
		setAssumption(e.target.value);
	}

	return props.paramType === 'pe' || props.paramType === 'pfcf' ? (
		<div className='input-container'>
			<input type='text' style={{ padding: '0.35rem' }} onChange={onAssumptionChange} value={assumption} name={props.paramType + '-' + props.assumptionType} id='input-box' autoComplete='off' required />
		</div>
	) : (
		<div className='input-container'>
			<input type='text' onChange={onAssumptionChange} value={assumption} name={props.paramType + '-' + props.assumptionType} id='input-box' autoComplete='off' required />
			<i className='percent'>%</i>
		</div>
	);
}
