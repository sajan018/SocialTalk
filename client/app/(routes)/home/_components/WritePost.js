import { UserDetailContext } from "@/app/_context/UserDetailContext";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { Image, Send, Video } from "lucide-react";
import React, { useContext, useState } from "react";

function WritePost({ getAllPost }) {
  const { user } = useUser();
  const [userInputPost, setUserInputPost] = useState();
  const [createPost, setCreatePost] = useState(false);
  const { toast } = useToast();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const onCreatePost = () => {
    const data = {
      postText: userInputPost,
      createdAt: Date.now().toString(),
      createdBy: userDetail._id,
    };

    GlobalApi.createPost(data).then(
      (resp) => {
        console.log(resp);
        setUserInputPost("");
        if (resp) {
          getAllPost();
          toast({
            title: "Awesome!",
            description: "Your Post Publish succesasfully",
            variant: "success",
          });
        }
      },
      (error) => {
        toast({
          title: "Opps!!!",
          description: "Some Server Side Error!",
          variant: "destructive",
        });
      }
    );
  };
  return (
    <div>
      {!createPost && (
        <div className="flex justify-between rounded-2xl bg-lime-300 px-4 sm:py-4">
          <main class="flex py-6 relative bottom-3  w-full items-baseline justify-between text-center">
            <h1 class="max-w-4xl font-display text-3xl  font-bold tracking-normal text-slate-900 sm:text-5xl">
              Want To Create
              <span class="relative whitespace-nowrap text-orange-400">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  class="absolute top-2/3 left-0 h-[0.58em] w-full fill-orange-300/70"
                  preserveAspectRatio="none"
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                </svg>
                <span class="relative">New Post</span>
              </span>
            </h1>
            <Button className='mt-10 bg-green-500 hover:bg-green-400'
              onClick={() => setCreatePost(true)}
            >
              Create Post →
            </Button>
          </main>
        </div>
      )}

      {createPost ? (
        <div>
          <div className="flex justify-between">
            <h2 className="text-[30px] font-medium text-gray-600">
              Hello,{user?.fullName}
            </h2>
            <Button
              onClick={() => setCreatePost(false)}
              className="bg-gray-500"
            >
              X
            </Button>
          </div>

          <h2 className="text-gray-400">
            What's New with you? Would you like to share somthing with community
          </h2>
          <div
            className="p-5 border  
        rounded-lg mt-5 bg-lime-100"
          >
            <h2>Create Post</h2>
            <div className="p-4 bg-white rounded-lg mt-2">
              <textarea
                placeholder="What's New"
                className="outline-none w-full h-[20vh]"
                value={userInputPost}
                onChange={(e) => setUserInputPost(e.target.value)}
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-5">
                <h2
                  className="flex gap-2 items-center cursor-pointer
                    hover:bg-lime-200 p-2  rounded-lg"
                >
                  <Image className="h-5 w-5" /> Image{" "}
                </h2>
                <h2
                  className="flex gap-2 items-center cursor-pointer
                    hover:bg-lime-200 p-2 rounded-lg"
                >
                  <Video className="h-5 w-5" /> Video{" "}
                </h2>
              </div>
              <Button
                className="bg-blue-500 rounded-xl gap-2
                hover:bg-blue-700"
                disabled={!userInputPost?.length}
                onClick={() => onCreatePost()}
              >
                <Send className="h-4 w-4" /> Publish
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default WritePost;
