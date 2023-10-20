const getCompanyFacts = async (cik: string) => {
  const companyfacts = await fetch(
    `https://data.sec.gov/api/xbrl/companyfacts/CIK${cik}.json`,
  ).then((res) => res.json());

  return companyfacts;
};

export default async function Index({ params }: { params: { cik: string } }) {
  const companyfacts: { cik: number; entityName: string } =
    await getCompanyFacts(params.cik);

  return (
    <div className="h-full w-full border-2 border-green-400">
      {companyfacts.entityName}
    </div>
  );
}
