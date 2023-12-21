'use server';

import { revalidatePath } from 'next/cache';
import {
  HoldingsInsertType,
  holdings,
} from '../../../../../db/schema/holdings';

export const submitForm = async (newHolding: HoldingsInsertType) => {
  const res = await db.insert(holdings).values(newHolding);

  revalidatePath('/profile/holdings', 'page');
  return res;
};
