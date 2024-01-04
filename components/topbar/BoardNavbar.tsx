"use client";

import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import { Flame, Sun, ThumbsUp } from "lucide-react";
import Link from "next/link";

const BoardNavbar = () => {
  const scroll = useScrollTop();
  return (
    <div
      className={cn(
        "text-sm z-50 items-center shadow-md h-[40px] bg-gray-800 w-full top-[116px] fixed flex justify-between max-w-[768px] min-w-[375px] m-auto",
        scroll && "top-[52px]"
      )}
    >
      <Link
        href={"/board"}
        className="hover:bg-gray-700 h-full transition w-full flex gap-2 justify-center items-center"
      >
        <Sun size={20} />
        <span>최신</span>
      </Link>
      <Link
        href={"/board"}
        className="hover:bg-gray-700 transition h-full w-full flex gap-2 justify-center items-center"
      >
        <Flame size={20} />
        <span>인기</span>
      </Link>
      <Link
        href={"/board"}
        className="hover:bg-gray-700 transition h-full w-full flex gap-2 justify-center items-center"
      >
        <ThumbsUp size={20} />
        <span>베스트</span>
      </Link>
    </div>
  );
};

export default BoardNavbar;
