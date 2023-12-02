import Link from 'next/link';

type Props = { label: string; value?: string; isLink?: boolean };

export const CompanyDescriptionItem: React.FC<Props> = ({
  label,
  value,
  isLink,
}) => {
  return (
    <div className="flex flex-col items-start gap-1 text-start">
      <dt className="text-muted-foreground text-sm font-medium">{label}</dt>
      {isLink ? (
        <Link
          href={value ?? '#'}
          className="text-sm"
          rel="noopener noreferrer"
          target="_blank"
        >
          {value ?? 'N/A'}
        </Link>
      ) : (
        <dd className="text-sm">{value ?? 'N/A'}</dd>
      )}
    </div>
  );
};
