"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@nextui-org/react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import { ThreadValidation } from "@/lib/validation/thread";
import { createThread } from "@/lib/actions/thread.actions";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

function PostThread({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    if (!organization) {
      await createThread({
        text: values.thread,
        author: userId,
        communityId: null,
        path: pathname,
      });
    } else {
      await createThread({
        text: values.thread,
        author: userId,
        communityId: organization.id,
        path: pathname,
      });
    }
    setLoading(true);
    toast.success("post created");
    navigator.vibrate([60, 30]);
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "rgb(135, 126, 255)",
              color: "white",
            
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />

      <Form {...form}>
        <form
          className="mt-10 flex flex-col justify-start gap-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Content
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Textarea {...field} className="h-[320px]" />
                </FormControl>
                <FormMessage className="text-[0.7rem]" />
              </FormItem>
            )}
          />

          <Button type="submit" isLoading={loading} className=" rounded bg-primary-500">
            Post Thread
          </Button>
        </form>
      </Form>
    </>
  );
}

export default PostThread;
