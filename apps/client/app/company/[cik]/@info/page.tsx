const getCompanyInfo = async (cik: string) => {
  const companyinfo = await fetch(`http://localhost:3000/api/${cik}`, {
    cache: 'no-cache',
  }).then((res) => res.json());

  return companyinfo;
};

export default async function Index({ params }: { params: { cik: string } }) {
  const companyinfo = await getCompanyInfo(params.cik);

  return <div className="h-1/2 w-full">{JSON.stringify(companyinfo)}</div>;
}
