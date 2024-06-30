"use client";
import MenuList from "@/app/_utils/MenuList";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { LogIn, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { SiRsocket } from "react-icons/si";

function SideNav() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <section className="p-5 md:py-8 bg-lime-100 fixed top-0 z-50 w-full flex justify-between shadow-sm items-center">
        <Menu
          className="md:hidden h-7 w-7 text-slate-500 cursor-pointer"
          onClick={handleToggle}
        />
        <div className="absolute right-4">
          <UserButton />
        </div>
      </section>
      <div
        className={`fixed inset-0 w-72 z-[60] bg-lime-100 ${isOpen ? "block" : "hidden"} md:block`}
      >
        <div className="h-full p-5 border-r lg:relative lg:translate-x-0 lg:transform-none">
          <div className="flex justify-between items-center">
            <h1 className="flex items-center text-2xl font-semibold text-gray-400 font-mono">
              <SiRsocket className="text-blue-500" /> ocialTalk
            </h1>
            <X
              className="md:hidden h-7 w-7 text-slate-500 cursor-pointer"
              onClick={closeSidebar}
            />
          </div>
          <div className="flex flex-col mt-10">
            {MenuList.map((item, index) => (
              <Link key={index} href={item.path} onClick={closeSidebar}>
                <h2 className="group p-4 flex gap-5 items-center justify-start rounded-md cursor-pointer hover:bg-slate-100 text-slate-500">
                  <item.icon className="group-hover:animate-bounce" />
                  {item.name}
                </h2>
              </Link>
            ))}
          </div>
          <div className="absolute bottom-10 flex gap-3 items-center">
            {!user ? (
              <Link href="/sign-up">
                <Button
                  variant="ghost"
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <LogIn />
                  Sign In
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-3 p-3">
                <UserButton /> Profile
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
