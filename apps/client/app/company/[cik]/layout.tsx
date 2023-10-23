export default function Layout({
  table,
  info,
}: {
  children: React.ReactNode;
  table: React.ReactNode;
  info: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {info}
      {table}
    </div>
  );
}
