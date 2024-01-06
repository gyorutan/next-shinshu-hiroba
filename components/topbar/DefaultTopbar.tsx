"use client";

import { Menu, Pyramid } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { api } from "@/helper/api";
import toast from "react-hot-toast";
import useAuthStore from "@/state/store";
import Image from "next/image";

const DefaultTopbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const scroll = useScrollTop();

  const { username, userLoggedIn, userImageUrl, setUsername, setUserLoggedIn } =
    useAuthStore();

  const clearStorage = () => {
    useAuthStore.persist.clearStorage();
  };

  console.log(username);
  console.log(userLoggedIn);

  const LogOut = async () => {
    const response = await axios.get(`${api}/auth/logout`, {
      withCredentials: true,
    });

    const result = await response.data;
    console.log(result);

    if (result.success) {
      setUsername(null);
      setUserLoggedIn(false);
      clearStorage();
      toast.success(result.message);
      router.push("/");
    }
  };

  return (
    <>
      <div
        className={cn(
          "z-50 px-5 py-3 items-center bg-gray-800 w-full top-0 fixed flex justify-between max-w-[768px] min-w-[375px] m-auto",
          scroll && "hidden"
        )}
      >
        {pathname === "/write" ? (
          <>
            <div className="p-2 w-[40px]"></div>
            <span className="text-lg font-bold">게시물 작성</span>
          </>
        ) : (
          <Link href={"/main"}>
            <Pyramid size={36} fill="#486081" />
          </Link>
        )}
        <Sheet>
          <SheetTrigger className="hover:bg-gray-700 rounded-full transition">
            <Menu size={40} className="p-2" />
          </SheetTrigger>
          <SheetContent className="w-[300px] bg-gray-700 border-l border-gray-600">
            <SheetHeader className="mt-8">
              {userLoggedIn ? (
                <>
                  <div className="flex flex-col w-full gap-4">
                    <div className="flex gap-2 items-center w-full h-[60px]">
                      <div className="w-[70px] h-[50px] flex justify-center items-center">
                        <Image
                          className="bg-gray-600 rounded-full"
                          src={userImageUrl!}
                          height={40}
                          width={40}
                          alt="profile"
                        />
                      </div>
                      <div className="w-[80%] h-full flex justify-start items-center">
                        <div className="text-white text-lg font-bold">
                          {username} 님
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-2">
                      <Button>내가 쓴 글</Button>
                      <Button>내가 쓴 댓글</Button>
                      <Button>좋아요 글</Button>
                      <SheetClose asChild>
                        <Button
                          asChild
                          variant={"emerald"}
                          className="font-bold"
                        >
                          <Link href={"/write"}>글쓰기</Link>
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </>
              ) : (
                <SheetClose asChild>
                  <Button asChild variant={"emerald"} className="font-bold">
                    <Link href={"/login"}>로그인</Link>
                  </Button>
                </SheetClose>
              )}
              {userLoggedIn ? (
                <div className="bg-gray-600 border-t border-gray-500 flex justify-center w-full left-0 py-6 absolute bottom-0">
                  <div className="flex gap-4">
                    <SheetClose asChild>
                      <Button asChild variant={"blue"} className="font-bold">
                        <Link href={"/profile"}>내 정보</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button
                        onClick={() => {
                          LogOut();
                        }}
                        variant={"destructive"}
                        className="font-bold"
                      >
                        로그아웃
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              ) : null}
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default DefaultTopbar;
