import { Range } from '../../../../../components/ui/range';

type MetricProps = {
  label: string;
  value?: number | Date;
  formatter: Intl.NumberFormat;
};

type RangeMetricProps = {
  min?: number;
  max?: number;
  label: string;
  value?: number;
};

export const Metric: React.FC<MetricProps> = ({ label, value, formatter }) => {
  let processedValue;

  if (typeof value === 'number') {
    processedValue = formatter?.format(value);
  } else if (value) {
    processedValue = new Date(value).toLocaleDateString();
  }

  return (
    <div className="flex flex-col items-start">
      {/* <span>{value ? formatter?.format(value) : 'N/A'}</span> */}
      <span>{processedValue ?? 'N/A'}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
};

export const RangeMetric: React.FC<RangeMetricProps> = ({
  label,
  value,
  max,
  min,
}) => {
  return (
    <div className="flex flex-col items-start h-fit w-fit">
      <div className="flex justify-center items-center w-fit gap-2">
        <span>{min}</span>
        <Range
          disabled
          value={[value ?? 0]}
          min={min}
          max={max}
          className="w-32"
        />
        <span>{max}</span>
      </div>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
};
