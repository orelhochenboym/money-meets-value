import { Navbar } from './components/navbar/navbar';

export default function Layout({
  info = null,
  children = null,
  params,
}: {
  children: React.ReactNode;
  table: React.ReactNode;
  info: React.ReactNode;
  params: { cik: string | null };
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start overflow-visible">
      {info}
      <Navbar cik={params.cik} />
      <div className="h-full w-full overflow-visible pt-4">{children}</div>
    </div>
  );
}
