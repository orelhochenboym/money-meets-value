import ParameterInputElement from 'routes/Home/components/StockAnalyzerTool/RowParameter/ParameterInput/ParameterInputElement/ParameterInputElement';
import './ParameterInput.scss';

type Props = {
	paramType: string;
};

export default function ParameterInput(props: Props) {
	return (
		<div id='row-input-assumptions-container'>
			<ParameterInputElement assumptionType='low' paramType={props.paramType} />
			<ParameterInputElement assumptionType='mid' paramType={props.paramType} />
			<ParameterInputElement assumptionType='high' paramType={props.paramType} />
		</div>
	);
}
