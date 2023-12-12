export default function Layout({
  children = null,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full items-start justify-start overflow-visible">
      <div className="h-full w-full overflow-visible">{children}</div>
    </div>
  );
}
