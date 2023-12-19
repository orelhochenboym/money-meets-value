'use server';

import { HoldingsInsertType } from '../../../../db/schema/holdings';

export const submitForm = async (newHolding: HoldingsInsertType) => {
  // const res = await db.insert(holdings).values(newHolding).returning();
  // const res = await db.select().from(holdings);
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
    cache: 'no-cache',
  }).then((data) => data.json());
  console.log(res);
  return res;
};
