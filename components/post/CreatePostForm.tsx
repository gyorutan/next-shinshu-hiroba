"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/helper/api";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import useAuthStore from "@/state/store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreatePostForm = () => {
  const router = useRouter();
  const [contentLength, setContentLength] = useState(Number(0));
  const [isLoading, setIsLoading] = useState(false);
  const [filename, setFilename] = useState("");
  const [postData, setPostData] = useState({
    genre: "",
    title: "",
    content: "",
    file: "",
    imageUrl: "",
  });

  const { userLoggedIn } = useAuthStore();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;
    const length = e.target.value.length;
    if (name === "content") {
      setContentLength(length);
    }
    setPostData({ ...postData, [name]: value });
  };

  const deleteFile = () => {
    setFilename("");
    setPostData({ ...postData, imageUrl: "" });
  };

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
      setPostData({ ...postData, imageUrl: result.imageUrl });
    } else {
      toast.error("파일 업로드에 실패하였습니다");
      deleteFile();
      return;
    }
  };

  const handleCreatePost = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (postData.genre === "") {
      toast.error("장르를 선택해주세요");
      return;
    }
    try {
      setIsLoading(true);

      const response = await axios.post(`${api}/post`, postData, {
        withCredentials: true,
      });

      const result = await response.data;

      console.log(result);

      if (result.success) {
        toast.success(result.message);
        router.push("/board");
      } else {
        toast.error(result.message);
        setPostData({ ...postData, title: "", content: "" });
      }
    } catch (error) {
      console.log(error);
      toast.error("알 수 없는 오류");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userLoggedIn === false) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form
        onSubmit={handleCreatePost}
        className="p-5 mt-[60px] min-h-[90vh] mb-[90px]"
      >
        <div className="space-y-2">
          <Select
            onValueChange={(e) => {
              setPostData({ ...postData, genre: e });
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="장르를 선택하세요..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="자유">자유</SelectItem>
                <SelectItem value="유머">유머</SelectItem>
                <SelectItem value="정보">정보</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="relative">
            <label
              htmlFor="title"
              className="absolute left-3 top-2 font-medium text-sm text-white"
            >
              제목
            </label>
            <input
              value={postData.title}
              onChange={(e) => {
                handleChange(e);
              }}
              id="title"
              name="title"
              required
              type="text"
              className="bg-inherit text-white w-full text-sm pt-9 pb-3 px-3 text font-bold border border-gray-500 outline-none rounded-md shadow-md transition"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="content"
              className="absolute left-3 top-2 font-medium text-sm text-white"
            >
              내용
            </label>
            <textarea
              value={postData.content}
              onChange={(e) => {
                handleChange(e);
              }}
              maxLength={200}
              id="content"
              name="content"
              required
              className="h-[220px] max-h-[220px] min-h-20 text-white bg-inherit w-full pt-9 pb-3 px-3 font-bold border border-gray-500 outline-none rounded-md shadow-md transition"
            />
            <span className="absolute right-3 top-2 text-sm text-white text-opacity-60">
              {contentLength} / 200
            </span>
          </div>
          <Separator className="bg-gray-600" />
          <div className="flex p-4 items-end gap-4">
            <div>
              {postData.imageUrl ? (
                <Image
                  src={`${postData.imageUrl}`}
                  alt="image"
                  height={200}
                  width={200}
                  className=""
                />
              ) : (
                <div className="text-white text-sm border border-gray-400 h-[200px] w-[200px] flex justify-center items-center">
                  사진 미리보기
                </div>
              )}
            </div>
            {postData.imageUrl ? null : (
              <div className="flex w-full items-center gap-2">
                <Button variant={"blue"} type="button" className="font-bold">
                  <label
                    htmlFor="file"
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    사진 추가
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
            )}
            <div>
              {postData.imageUrl ? (
                <Button
                  type="button"
                  onClick={() => {
                    deleteFile();
                  }}
                  variant={"destructive"}
                  className="rounded-2xl font-bold"
                >
                  사진 삭제
                </Button>
              ) : null}
            </div>
          </div>
          <Separator className="bg-gray-600" />
          {isLoading ? (
            <Button disabled variant={"emerald"} className="w-full flex gap-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>저장하는중...</span>
            </Button>
          ) : (
            <Button
              variant={"emerald"}
              type="submit"
              className="w-full font-bold"
            >
              저장
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default CreatePostForm;
