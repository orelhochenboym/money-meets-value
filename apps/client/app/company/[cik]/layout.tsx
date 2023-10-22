export default function Layout({
  children,
  table,
}: {
  children: React.ReactNode;
  table: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {children}
      {table}
    </div>
  );
}
