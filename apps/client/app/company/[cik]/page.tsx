export default function Index({ params }: { params: { cik: string } }) {
  return <div>{params.cik}</div>;
}
