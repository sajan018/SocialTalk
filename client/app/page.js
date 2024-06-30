"use client";
import Image from "next/image";
import { useEffect } from "react";
import GlobalApi from "./_utils/GlobalApi";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SiRsocket } from "react-icons/si";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    user && createUserProfile();
    // router.push('/home')
  }, [user]);

  /**
   * Uset to create user profile
   */
  const createUserProfile = () => {
    if (!localStorage.getItem("isLogin")) {
      const data = {
        name: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
        image: user.imageUrl,
      };
      GlobalApi.createUser(data).then((resp) => {
        console.log(resp.data);
        localStorage.setItem("isLogin", true);
      });
    }
  };

  return (
    <div className="bg-lime-300 max-w-[100vw] min-h-screen overflow-hidden">
      <header className="flex justify-between items-center p-3 py-4 bg-lime-300">
        <div className="flex gap-4 text-gray-800 font-serif font-semibold text-[20px]">
          <p className="hidden sm:block">Welcome to </p>
          <h1 className="flex items-center text-2xl font-semibold text-gray-400 font-mono">
            <SiRsocket className="text-blue-500" /> ocialTalk
          </h1>
        </div>
        <div>
          {user ? (
            <div className="flex gap-5 items-center">
              <Link href="/home">
                <Button>Dashboard</Button>
              </Link>{" "}
              <UserButton />
            </div>
          ) : (
            <Link href="/sign-in">
              <Button>SIgn-in</Button>
            </Link>
          )}
        </div>
      </header>
      <section className="md:p-10 lg:p-20">
        <div className="p-5 text-center flex justify-between items-center mx-auto">
          <p className="text-gray-500 text-xl sm:text-3xl font-serif font-semibold">Your Can Share Your Thought While Posting with Others</p>
          <Image
            src="/undraw_posts_givd.svg"
            className="w-40 h-[40vh] sm:w-80"
            width={30}
            height={30}
            alt="img"
          />
        </div>
        <div className="p-5 text-center flex justify-between items-center mx-auto">
           <Image
            src="/undraw_wall_post_re_y78d.svg"
            className="w-40 h-[40vh] sm:w-80"
            width={30}
            height={30}
            alt="img"
          />
          <p className="text-gray-500 text-xl sm:text-3xl font-serif font-semibold">Your Can Share Your Opinion by Commenting on others post</p>
        </div>
        <div className="p-5 text-center flex justify-between items-center mx-auto">
          <p className="text-gray-500 text-xl sm:text-3xl font-serif font-semibold">Like Your Buddies Post</p>
          <Image
            src="/undraw_buddies_2ae5.svg"
            className="w-40 h-[40vh] sm:w-80"
            width={30}
            height={30}
            alt="img"
          />
        </div>
      </section>
    </div>
  );
}
