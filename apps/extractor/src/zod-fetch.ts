import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export const zodFetch = async <T>(
  url: string,
  schema: z.ZodType<T>,
): Promise<z.infer<typeof schema>> => {
  const response = await fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  });

  const safeParsed = schema.safeParse(response);

  if (!safeParsed.success) {
    throw fromZodError(safeParsed.error);
  }

  return response;
};
