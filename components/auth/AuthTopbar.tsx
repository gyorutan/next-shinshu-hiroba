"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { LogIn, UserRoundPlus, X } from "lucide-react";

const AuthTopbar = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="fixed top-0 w-full max-w-[768px] min-w-[375px] m-auto flex justify-between items-center p-6">
        <Button asChild variant={"link"} className="text-white">
          <Link
            className="flex gap-2"
            href={pathname === "/login" ? "/signup" : "/login"}
          >
            {pathname === "/login" ? (
              <UserRoundPlus size={20} />
            ) : (
              <LogIn size={20} />
            )}
            {pathname === "/login" ? "회원가입" : "로그인"}
          </Link>
        </Button>
        <Button
          asChild
          variant={"gray"}
          className="text-white rounded-full p-2"
        >
          <Link className="" href="/">
            <X />
          </Link>
        </Button>
      </div>
    </>
  );
};

export default AuthTopbar;
