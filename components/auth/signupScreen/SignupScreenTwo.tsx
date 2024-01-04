"use client";

import { ChangeEvent } from "react";
import { Button } from "../../ui/button";

interface PropsData {
  username: string;
  studentId: string;
  checkUsername: string;
  checkStudentId: string;
  handleBeforeScreen: () => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showNumberThreeScreen: () => void;
}

const SignupScreenTwo = ({
  username,
  studentId,
  checkUsername,
  checkStudentId,
  handleInputChange,
  handleBeforeScreen,
  showNumberThreeScreen,
}: PropsData) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <label
              htmlFor="username"
              className="absolute left-3 top-2 font-bold text-sm"
            >
              닉네임
            </label>
            {checkUsername === "unavailable-username" ? (
              <span className="absolute right-3 top-2 font-medium text-sm text-red-500">
                이미 사용중인 닉네임입니다
              </span>
            ) : null}
            {checkUsername === "available-username" ? (
              <span className="absolute right-3 top-2 text-sm text-emerald-500">
                사용 가능한 닉네임입니다
              </span>
            ) : null}
            {checkUsername === "regex" ? (
              <span className="absolute right-3 top-2 text-sm text-red-500">
                영문・일어・숫자 / 3 ~ 10자
              </span>
            ) : null}
            <input
              value={username}
              onChange={(e) => {
                handleInputChange(e);
              }}
              id="username"
              name="username"
              required
              type="text"
              className="bg-inherit w-full pt-9 pb-2 px-3 text-lg font-bold border focus:border-emerald-500 border-gray-400 outline-none rounded-md transition"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="studenId"
              className="absolute left-3 top-2 font-bold text-sm"
            >
              학적번호
            </label>
            {checkStudentId === "unavailable-studentId" ? (
              <span className="absolute right-3 top-2 text-sm text-red-500">
                이미 존재하는 학번입니다
              </span>
            ) : null}
            {checkStudentId === "available-studentId" ? (
              <span className="absolute right-3 top-2 text-sm text-emerald-500">
                사용 가능한 학번입니다
              </span>
            ) : null}
            {checkStudentId === "regex" ? (
              <span className="absolute right-3 top-2 text-sm text-red-500">
                학번 형식이 올바르지 않습니다
              </span>
            ) : null}

            <input
              value={studentId}
              onChange={(e) => {
                handleInputChange(e);
              }}
              id="studentId"
              name="studentId"
              required
              type="text"
              className="bg-inherit w-full pt-9 pb-2 px-3 text-lg font-bold border focus:border-emerald-500 border-gray-400 outline-none rounded-md transition"
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
          <Button
            type="button"
            variant={"blue"}
            onClick={() => {
              showNumberThreeScreen();
            }}
            className="w-full font-bold"
          >
            다음
          </Button>
        </div>
      </div>
    </>
  );
};

export default SignupScreenTwo;
