import { z } from 'zod';

export const CompaniesSchema = z.array(
  z.record(z.string().or(z.number()).nullable()),
);

export type Companies = z.infer<typeof CompaniesSchema>;
