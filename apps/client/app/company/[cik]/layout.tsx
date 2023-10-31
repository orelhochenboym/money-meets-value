export default function Layout({
  table,
  info,
  chart,
}: {
  children: React.ReactNode;
  table: React.ReactNode;
  info: React.ReactNode;
  chart: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-8">
      <div className="flex h-fit-w-full">
        {info}
        {chart}
      </div>
      {table}
    </div>
  );
}
