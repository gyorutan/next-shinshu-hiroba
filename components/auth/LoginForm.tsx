"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { api } from "@/helper/api";
import toast from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    password: "",
  });

  const resetFormData = () => {
    setFormData({ ...formData, studentId: "", password: "" });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogIn = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(`${api}/auth/login`, formData, {
        withCredentials: true,
      });
      const result = await response.data;
      console.log(result);
      console.log(result.token);
      if (result.success) {
        toast.success(result.message);
        router.push("/main");
      } else {
        resetFormData();
        toast.error(result.message);
      }
    } catch (error) {
      resetFormData();
      console.log(error);
      toast.error("알 수 없는 에러");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col w-full p-20" onSubmit={handleLogIn}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <label
              htmlFor="studenId"
              className="absolute left-3 top-2 font-bold text-sm"
            >
              학적번호
            </label>
            <input
              value={formData.studentId}
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
          <div className="relative">
            <label
              htmlFor="password"
              className="absolute left-3 top-2 font-bold text-sm"
            >
              비밀번호
            </label>
            <input
              value={formData.password}
              onChange={(e) => {
                handleInputChange(e);
              }}
              id="password"
              name="password"
              required
              type="password"
              className="tracking-[4px] bg-inherit text-white w-full pt-9 pb-3 px-3 text-lg font-bold border focus:border-emerald-500 border-gray-400 outline-none rounded-md shadow-md transition"
            />
          </div>
        </div>
        {isLoading ? (
          <Button disabled variant={"emerald"} className="w-full flex gap-2">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>로그인 시도중...</span>
          </Button>
        ) : (
          <Button
            type="submit"
            variant={"emerald"}
            className="w-full font-bold"
          >
            <span>확인</span>
          </Button>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
