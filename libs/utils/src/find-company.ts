import { Companies } from '../../types/src';

export const findCompany = (
  companies: Companies,
  fieldToReturn: keyof (typeof companies)[number],
  value: string | number,
) => {
  const company = companies.find(
    (company) =>
      Object.values(company).includes(value.toString()) ||
      Object.values(company).includes(Number(value)),
  );

  if (!company) {
    throw new Error(`Company not found with the ${value}`);
  }

  return company[fieldToReturn];
};
