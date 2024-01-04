"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { Bell, Bird, PackageSearch, Pyramid, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const DefaultFootbar = () => {
  const pathname = usePathname();
  const [value, setValue] = useState({
    main: false,
    board: false,
    giveAway: false,
    notification: false,
    settings: false,
  });
  useEffect(() => {
    switch (pathname) {
      case "/main":
        setValue({
          ...value,
          main: true,
          board: false,
          giveAway: false,
          notification: false,
          settings: false,
        });
        break;
      case "/board":
        setValue({
          ...value,
          main: false,
          board: true,
          giveAway: false,
          notification: false,
          settings: false,
        });
        break;
      case "/give-away":
        setValue({
          ...value,
          giveAway: true,
          notification: false,
          settings: false,
          main: false,
          board: false,
        });
        break;
      case "/notification":
        setValue({
          ...value,
          notification: true,
          settings: false,
          main: false,
          board: false,
          giveAway: false,
        });
        break;
      case "/settings":
        setValue({
          ...value,
          settings: true,
          main: false,
          board: false,
          giveAway: false,
          notification: false,
        });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <div className="z-50 bg-gray-900 h-[60px] border-t items-center border-gray-800 w-full bottom-0 fixed flex justify-between max-w-[768px] min-w-[375px] m-auto">
        <Button
          asChild
          className="w-full h-full rounded-none bg-inherit hover:bg-gray-700"
        >
          <Link
            href={"/main"}
            className={cn(
              "flex flex-col justify-center items-center opacity-70",
              value.main && "opacity-100"
            )}
          >
            <Pyramid size={20} />
            <span className="text-[12px] font-thin">메인</span>
          </Link>
        </Button>
        <Button
          asChild
          className="w-full h-full rounded-none bg-inherit hover:bg-gray-700"
        >
          <Link
            href={"/board"}
            className={cn(
              "flex flex-col justify-center items-center opacity-70",
              value.board && "opacity-100"
            )}
          >
            <Bird size={20} />
            <span className="text-[12px] font-thin">게시판</span>
          </Link>
        </Button>
        <Button
          asChild
          className="w-full h-full rounded-none bg-inherit hover:bg-gray-700"
        >
          <Link
            href={"/give-away"}
            className={cn(
              "flex flex-col justify-center items-center opacity-70",
              value.giveAway && "opacity-100"
            )}
          >
            <PackageSearch size={20} />
            <span className="text-[12px] font-thin">물건</span>
          </Link>
        </Button>
        <Button
          asChild
          className="w-full h-full rounded-none bg-inherit hover:bg-gray-700"
        >
          <Link
            href={"/notification"}
            className={cn(
              "flex flex-col justify-center items-center opacity-70",
              value.notification && "opacity-100"
            )}
          >
            <Bell size={20} />
            <span className="text-[12px] font-thin">알림</span>
          </Link>
        </Button>
        <Button
          asChild
          className="w-full h-full rounded-none bg-inherit hover:bg-gray-700"
        >
          <Link
            href={"/settings"}
            className={cn(
              "flex flex-col justify-center items-center opacity-70",
              value.settings && "opacity-100"
            )}
          >
            <Settings size={20} />
            <span className="text-[12px] font-thin">설정</span>
          </Link>
        </Button>
      </div>
    </>
  );
};

export default DefaultFootbar;
