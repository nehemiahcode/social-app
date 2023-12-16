import { redirect } from "next/navigation";

// import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { fetchUserPosts } from "@/lib/actions/user.actions";
import { Skeleton, Card } from "@nextui-org/react";
import ThreadCard from "../cards/ThreadCard";

// interface Result {
//   name: string;
//   image: string;
//   id: string;
//   threads: {
//     _id: string;
//     text: string;
//     parentId: string | null;
//     author: {
//       name: string;
//       image: string;
//       id: string;
//     };
//     community: {
//       id: string;
//       name: string;
//       image: string;
//     } | null;
//     createdAt: string;
//     children: {
//       author: {
//         image: string;
//       };
//     }[];
//   }[];
// }

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {
  let result = await fetchUserPosts(accountId);

  //   if (accountType === "Community") {
  //     result = await fetchCommunityPosts(accountId);
  //   } else {
  //     result = await fetchUserPosts(accountId);
  //   }

  if (!result) {
    redirect("/");
  }

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.length === 0 ? (
        <>
          {result.threads.map((thread: any) => (
            <Card
              key={thread._id}
              className="md:w-[360px] w-full  space-y-5 p-4"
              radius="lg"
            >
              <div className="min-w-[300px] w-full flex items-center gap-3">
                <div>
                  <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
              </div>

              <div className="space-y-3">
                <Skeleton className="w-3/5 h-3 rounded-lg" />
                <Skeleton className="w-3/5 h-3 rounded-lg" />
                <Skeleton className="w-full h-3 rounded-lg" />
              </div>
            </Card>
          ))}
        </>
      ) : (
        result.threads.map((thread: any) => (
          <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={currentUserId}
            parentId={thread.parentId}
            content={thread.text}
            community={thread.community}
            createdAt={thread.createdAt}
            comments={thread.children}
            author={
              accountType === "User"
                ? { name: result.name, image: result.image, id: result.id }
                : {
                    name: thread.author.name,
                    image: thread.author.image,
                    id: thread.author.id,
                  }
            }
            //   community={
            //     accountType === "Community"
            //       ? { name: result.name, id: result.id, image: result.image }
            //       : thread.community
            //   }
            //   createdAt={thread.createdAt}
            //   comments={thread.children}
          />
        ))
      )}
    </section>
  );
}

export default ThreadsTab;
