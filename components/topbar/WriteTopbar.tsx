"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks/useScrollTop";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const WriteTopbar = () => {
  const router = useRouter();
  const scroll = useScrollTop();
  return (
    <>
      <div
        className={cn(
          "z-50 px-5 py-3 items-center bg-gray-800 w-full top-0 fixed flex justify-between max-w-[768px] min-w-[375px] m-auto",
          scroll && "hidden"
        )}
      >
        <div className="p-2 w-[40px]"></div>
        <span className="text-lg font-bold">게시물 작성</span>
        <Sheet>
          <SheetTrigger className="hover:bg-gray-700 rounded-full transition">
            <Menu size={40} className="p-2" />
          </SheetTrigger>
          <SheetContent className="w-[300px] lg:w-[400px] bg-gray-700 border-l border-gray-600">
            <SheetHeader>
              <SheetTitle className="text-white mt-5">닉네임</SheetTitle>
              <div className="flex flex-col justify-center gap-2 p-5">
                <SheetClose asChild>
                  <Button>내 정보</Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button>내가 쓴 글</Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button>내가 쓴 댓글</Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant={"emerald"} className="font-bold">
                    글쓰기
                  </Button>
                </SheetClose>
                <SheetClose asChild className="absolute left-12 bottom-10">
                  <Button variant={"blue"} className="font-bold">
                    계정 설정
                  </Button>
                </SheetClose>
                <SheetClose asChild className="absolute right-12 bottom-10">
                  <Button
                    onClick={() => {
                      router.push("/");
                    }}
                    variant={"destructive"}
                    className="font-bold"
                  >
                    로그아웃
                  </Button>
                </SheetClose>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default WriteTopbar;
