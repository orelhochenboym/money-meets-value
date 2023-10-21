import { z } from 'zod';

export const FactSchema = z.record(
  z.object({
    label: z.string(),
    description: z.string(),
    units: z.record(
      z.array(
        z.object({
          start: z.string().optional(),
          end: z.string(),
          val: z.number(),
          accn: z.string(),
          fy: z.number(),
          fp: z.string(),
          form: z.string(),
          filed: z.string(),
          frame: z.string().optional(),
        }),
      ),
    ),
  }),
);

export type Fact = z.infer<typeof FactSchema>;

export const CompanyFactsSchema = z.object({
  cik: z.number(),
  entityName: z.string(),
  facts: z.object({ dei: FactSchema, 'us-gaap': FactSchema }),
});

export type CompanyFacts = z.infer<typeof CompanyFactsSchema>;
