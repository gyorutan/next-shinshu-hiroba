"use client";

import { getCurrentUser } from "@/helper/getCurrentUser";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "@/helper/api";
import useAuthStore from "@/state/store";

interface User {
  id: string;
  fullname: string;
  username: string;
  studentId: string;
  email: string;
  password: string;
  userImageUrl: string;
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [filename, setFilename] = useState("");

  const deleteFile = () => {
    setFilename("");
  };

  const { setUserImageUrl, userImageUrl } = useAuthStore();

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    console.log(file);

    const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (!validFileTypes.find((type) => type === file.type)) {
      toast.error("업로드 할 수 없는 확장자입니다");
      deleteFile();
      return;
    }

    const form = new FormData();
    form.append("image", file);

    const response = await axios.post(`${api}/post/image`, form);

    const result = await response.data;

    console.log(result);

    if (result.success) {
      setUserImageUrl(result.imageUrl);
      saveUserImageUrl(result.imageUrl);
    } else {
      toast.error("파일 업로드에 실패하였습니다");
      deleteFile();
      return;
    }
  };

  const saveUserImageUrl = async (url: string) => {
    await axios.patch(
      `${api}/users/profile`,
      { url },
      {
        withCredentials: true,
      }
    );
  };

  useEffect(() => {
    const getUsers = async () => {
      const userInfo = (await getCurrentUser()).user as User | null;
      setUser(userInfo);
    };
    getUsers();
  }, []);

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col justify-center items-center gap-4">
          {userImageUrl ? (
            <Image
              src={userImageUrl!}
              height={100}
              width={100}
              alt="Profile Image"
              className="rounded-full"
            />
          ) : null}
          <div className="flex items-center gap-2">
            <Button variant={"blue"} type="button" className="font-bold">
              <label
                htmlFor="file"
                className="flex items-center gap-3 cursor-pointer"
              >
                사진 업로드
              </label>
            </Button>
            <div className="flex gap-2">
              <Input
                value={filename}
                type="file"
                id="file"
                className="cursor-pointer hidden bg-inherit text-white"
                onChange={handleUploadImage}
              />
            </div>
          </div>
        </div>
        <p className="text-lg">
          이름 : <span className="font-bold text-md">{user?.fullname}</span>
        </p>
        <p className="text-lg">
          닉네임 : <span className="font-bold text-md">{user?.username}</span>
        </p>
        <p className="text-lg">
          학적번호 :{" "}
          <span className="font-bold text-md">{user?.studentId}</span>
        </p>
        <p className="text-lg">
          이메일 : <span className="font-bold text-md">{user?.email}</span>
        </p>
      </div>
    </>
  );
};

export default UserProfile;
