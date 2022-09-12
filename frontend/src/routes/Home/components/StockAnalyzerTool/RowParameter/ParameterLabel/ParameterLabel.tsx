import React from 'react';
import './ParameterLabel.scss';

type Props = {
	paramString: String;
	paramType: string;
};

export default function ParameterLabel(props: Props) {
	return props.paramType === 'sb' ? <div id='param-label-text'>{props.paramString + ' (CAGR)'}</div> : <div id='param-label-text'>{props.paramString}</div>;
}
