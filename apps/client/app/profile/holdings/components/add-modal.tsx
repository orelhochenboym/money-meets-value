'use client';

import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../../components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../components/ui/form';
import { Input } from '../../../../components/ui/input';
import {
  HoldingsInsertSchema,
  HoldingsInsertType,
} from '../../../../db/schema/holdings';

type Props = { userId: string };

export const AddModal = NiceModal.create<Props>(({ userId }) => {
  const modal = useModal();
  const closeModal = React.useCallback(() => {
    modal.hide();
  }, [modal]);

  const form = useForm<HoldingsInsertType>({
    resolver: zodResolver(HoldingsInsertSchema),
    defaultValues: { userId },
  });

  return (
    <Dialog open={modal.visible} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a holding to your portfolio</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              () => {
                console.log(`Success`);
              },
              () => {
                console.log(`Error`);
              },
            )}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="stockId"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Symbol</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Cost</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="default" className="self-end">
              Add Holding
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});
