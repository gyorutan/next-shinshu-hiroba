"use client";

import { ChangeEvent } from "react";
import { Button } from "../../ui/button";
import { Loader2 } from "lucide-react";

interface PropsData {
  password: string;
  passwordConfirm: string;
  checkPassword: string;
  checkPasswordConfirm: string;
  passwordConfirmDisable: boolean;
  isLoading: boolean;
  handleBeforeScreen: () => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SignupScreenThree = ({
  password,
  passwordConfirm,
  checkPassword,
  checkPasswordConfirm,
  passwordConfirmDisable,
  isLoading,
  handleInputChange,
  handleBeforeScreen,
}: PropsData) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <label
              htmlFor="password"
              className="absolute left-3 top-2 font-bold text-sm"
            >
              비밀번호
            </label>
            {checkPassword === "available-password" ? (
              <p className="absolute right-3 top-2 text-sm text-green-500">
                올바른 비밀번호 형식입니다
              </p>
            ) : null}
            {checkPassword === "regex" ? (
              <span className="absolute right-3 top-2 text-sm text-red-500">
                영문・숫자 / 6 ~ 20자
              </span>
            ) : null}
            <input
              value={password}
              onChange={(e) => {
                handleInputChange(e);
              }}
              id="password"
              name="password"
              required
              type="password"
              className={
                checkPassword === "unavailable-password" ||
                checkPassword === "regex"
                  ? "tracking-[4px] bg-inherit text-white w-full pt-9 pb-2 px-3 text-lg font-bold border focus:border-red-500 border-gray-400 outline-none rounded-md shadow-md transition"
                  : "tracking-[4px] bg-inherit text-white w-full pt-9 pb-2 px-3 text-lg font-bold border focus:border-emerald-500 border-gray-400 outline-none rounded-md shadow-md transition"
              }
            />
          </div>
          <div className="relative">
            <label
              htmlFor="passwordConfirm"
              className="absolute left-3 top-2 font-bold text-sm"
            >
              비밀번호 확인
            </label>
            {checkPasswordConfirm === "same" ? (
              <p className="absolute right-3 top-2 text-sm text-green-500">
                비밀번호가 일치합니다
              </p>
            ) : null}
            {checkPasswordConfirm === "not-same" ? (
              <p className="absolute right-3 top-2 text-sm text-red-500">
                비밀번호가 일치하지 않습니다
              </p>
            ) : null}
            <input
              value={passwordConfirm}
              onChange={(e) => {
                handleInputChange(e);
              }}
              id="passwordConfirm"
              name="passwordConfirm"
              required
              disabled={passwordConfirmDisable}
              type="password"
              className={
                checkPasswordConfirm === "not-same"
                  ? "disabled:cursor-not-allowed disabled:opacity-50 tracking-[4px] bg-inherit text-white w-full pt-9 pb-2 px-3 text-lg font-bold border focus:border-red-500 border-gray-400 outline-none rounded-md shadow-md transition"
                  : "disabled:cursor-not-allowed disabled:opacity-50 tracking-[4px] bg-inherit text-white w-full pt-9 pb-2 px-3 text-lg font-bold border focus:border-emerald-500 border-gray-400 outline-none rounded-md shadow-md transition"
              }
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => {
              handleBeforeScreen();
            }}
            className="w-full font-bold"
          >
            뒤로가기
          </Button>
          {isLoading ? (
            <Button disabled variant={"emerald"} className="w-full flex gap-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>계정 생성중...</span>
            </Button>
          ) : (
            <Button
              type="submit"
              variant={"emerald"}
              className="w-full font-bold"
            >
              <span>가입하기</span>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default SignupScreenThree;
