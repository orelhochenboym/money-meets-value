export default function Layout({
  table,
  info,
  chart,
  children,
}: {
  children: React.ReactNode;
  table: React.ReactNode;
  info: React.ReactNode;
  chart: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start overflow-visible">
      {info}
      <div className="h-full w-full overflow-visible pt-4">{children}</div>
    </div>
  );
}
