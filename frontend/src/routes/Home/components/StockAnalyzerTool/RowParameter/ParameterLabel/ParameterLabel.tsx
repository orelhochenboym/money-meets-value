import React from 'react';
import './ParameterLabel.scss';

type Props = {
	paramName: string;
	paramType: string;
};

export default function ParameterLabel(props: Props) {
	return props.paramType === 'sb' ? <div id='param-label-text'>{props.paramName + ' (CAGR)'}</div> : <div id='param-label-text'>{props.paramName}</div>;
}
