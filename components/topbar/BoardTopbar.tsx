"use client";

import { PencilLine, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks/useScrollTop";

const BoardTopbar = () => {
  const scroll = useScrollTop();
  return (
    <>
      <div
        className={cn(
          "z-50 py-2 px-4 items-center bg-gray-800 w-full top-[64px] fixed flex justify-between max-w-[768px] min-w-[375px] m-auto",
          scroll && "top-0"
        )}
      >
        <div>
          <span className="">전체</span>
        </div>
        <div className="flex gap-2">
          <span className="hover:bg-gray-700 p-2 rounded-full">
            <Search size={20} />
          </span>
          <Link href={"/write"} className="hover:bg-gray-700 p-2 rounded-full">
            <PencilLine size={20} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default BoardTopbar;
