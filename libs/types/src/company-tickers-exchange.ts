import { z } from 'zod';

export const CompanyTickersExchangeSchema = z.object({
  fields: z.array(z.string()),
  data: z.array(z.array(z.string().or(z.number()).or(z.null()))),
});

export type CompanyTickersExchange = z.infer<
  typeof CompanyTickersExchangeSchema
>;
