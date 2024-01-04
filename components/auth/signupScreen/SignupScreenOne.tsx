"use client";

import { ChangeEvent } from "react";
import { Button } from "../../ui/button";

interface PropsData {
  sei: string;
  mei: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showNumberTwoScreen: () => void;
}

const SignupScreenOne = ({
  sei,
  mei,
  handleInputChange,
  showNumberTwoScreen,
}: PropsData) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <label
              htmlFor="sei"
              className="absolute left-3 top-2 font-bold text-sm"
            >
              성
            </label>
            <input
              value={sei}
              onChange={(e) => {
                handleInputChange(e);
              }}
              id="sei"
              name="sei"
              required
              type="text"
              className="bg-inherit w-full pt-9 pb-2 px-3 text-lg font-bold border focus:border-emerald-500 border-gray-400 outline-none rounded-md transition"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="mei"
              className="absolute left-3 top-2 font-bold text-sm"
            >
              이름
            </label>
            <input
              value={mei}
              onChange={(e) => {
                handleInputChange(e);
              }}
              id="mei"
              name="mei"
              required
              type="text"
              className="bg-inherit w-full pt-9 pb-2 px-3 text-lg font-bold border focus:border-emerald-500 border-gray-400 outline-none rounded-md transition"
            />
          </div>
        </div>
        <Button
          type="button"
          variant={"blue"}
          onClick={() => {
            showNumberTwoScreen();
          }}
          className="w-full font-bold"
        >
          다음
        </Button>
      </div>
    </>
  );
};

export default SignupScreenOne;
