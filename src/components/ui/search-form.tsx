"use client";

import { Input } from "@/components/ui/input";

import { LoadingButton } from "@/components/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "convex/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../convex/_generated/api";

const formSchema = z.object({
  search: z.string().min(1).max(250),
});

export function SearchForm({
  setResults,
}: {
  setResults: (notes: typeof api.chunks.searchInDocument._returnType) => void;
}) {
  const search = useAction(api.chunks.searchInDocument);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await search({
      queryText: values.search,
    }).then(setResults);
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-2 "
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  className="bg-zinc-900 border-zinc-800 h-16 pl-14 pr-36 text-zinc-200 placeholder-zinc-500 rounded-xl"
                  placeholder="Search over all your notes and documents using vector searching"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          isLoading={form.formState.isSubmitting}
          loadingText="Searching..."
        >
          Search
        </LoadingButton>
      </form>
    </Form>
  );
}
