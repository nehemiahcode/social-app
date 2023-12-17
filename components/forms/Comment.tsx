"use client";

import { z } from "zod";
import { Avatar, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "../ui/input";

import { CommentValidation } from "@/lib/validation/thread";
import { addCommentToThread } from "@/lib/actions/thread.actions";
import { useState } from "react";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

function Comment({ threadId, currentUserImg, currentUserId }: Props) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathname
    );
    form.reset();
    setLoading(true);
    toast.success("comment created");
    navigator.vibrate([60, 30]);
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
        <form className="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex w-full items-center gap-3">
                <FormLabel>
                  <Avatar
                    src={currentUserImg}
                    alt="current_user"
                    size="lg"
                    className="rounded-full object-cover"
                  />
                </FormLabel>
                <FormControl className="border-none bg-transparent">
                  <Input
                    type="text"
                    {...field}
                    required
                    placeholder="Comment..."
                    className="no-focus text-light-1 outline-none"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            isLoading={loading}
            type="submit"
            className="comment-form_btn"
          >
          {loading ? "Replying..." : "Reply"}
          </Button>
        </form>
      </Form>
    </>
  );
}

export default Comment;
