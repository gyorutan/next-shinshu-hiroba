"use client";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpToLine,
  Home,
  RotateCw,
} from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const FunctionFootbar = () => {
  const router = useRouter();
  const gotoTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className="border-t border-slate-500 z-50 fixed flex bottom-[60px] w-full max-w-[768px] min-w-[375px] m-auto bg-gray-600">
        <Button
          onClick={() => {
            router.back();
          }}
          className="w-full flex justify-center rounded-none bg-inherit hover:bg-gray-500 transition"
        >
          <span className="text-base font-bold">
            <ArrowLeft size={20} />
          </span>
        </Button>
        <Button
          onClick={() => {
            router.forward();
          }}
          className="w-full flex justify-center rounded-none bg-inherit hover:bg-gray-500 transition"
        >
          <span className="text-base font-bold">
            <ArrowRight size={20} />
          </span>
        </Button>
        <Button
          onClick={() => {
            router.push("/board");
          }}
          className="w-full flex justify-center rounded-none bg-inherit hover:bg-gray-500 transition"
        >
          <span className="text-base font-bold">
            <Home size={20} />
          </span>
        </Button>
        <Button
          onClick={() => {
            router.refresh();
          }}
          className="w-full flex justify-center rounded-none bg-inherit hover:bg-gray-500 transition"
        >
          <span className="text-base font-bold">
            <RotateCw size={20} />
          </span>
        </Button>
        <Button
          onClick={() => {
            gotoTop();
          }}
          className="w-full flex justify-center rounded-none bg-inherit hover:bg-gray-500 transition"
        >
          <span className="text-base font-bold">
            <ArrowUpToLine size={20} />
          </span>
        </Button>
      </div>
    </>
  );
};

export default FunctionFootbar;
