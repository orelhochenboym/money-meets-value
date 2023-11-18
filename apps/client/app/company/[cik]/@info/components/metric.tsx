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
    <div className="flex h-fit w-fit  flex-col items-start">
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
    <div className="flex h-fit w-fit flex-col items-start">
      <div className="flex w-fit items-center justify-center gap-2">
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
