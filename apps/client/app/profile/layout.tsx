import { Navbar } from './components/navbar';

export default function Layout({
  children = null,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full items-start justify-start gap-4 overflow-visible">
      <Navbar />
      <div className="h-full w-full overflow-visible">{children}</div>
    </div>
  );
}
