"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/helper/api";
import axios from "axios";
import { AlertCircle, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PostProps {
  _id: string;
  writerId: string;
  writer: string;
  title: string;
  content: string;
  imageUrl: string;
}

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<PostProps>({
    _id: "",
    writerId: "",
    writer: "",
    title: "",
    content: "",
    imageUrl: "",
  });
  // const [writedComment, setWritedComment] = useState("");

  const fetchPostDetail = async () => {
    const response = await axios.get(`${api}/post/${postId}`);
    const result = await response.data;
    console.log(result);
    setPost(result.post);
  };

  useEffect(() => {
    fetchPostDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pt-14">
      <div className="flex flex-col p-5 gap-3 border-b-[1px] border-gray-600">
        <div className="text-lg">{post.title}</div>
        <div className="text-sm text-opacity-90 text-gray-100 space-y-1">
          <p>
            장르&nbsp;&nbsp;
            <span className="text-gray-300 text-opacity-30">|</span>
            &nbsp;&nbsp;8시간전&nbsp;&nbsp;
            <span className="text-gray-300 text-opacity-30">|</span>
            &nbsp;&nbsp;{post.writer}
          </p>
          <p>
            조회수 1,000,000&nbsp;&nbsp;
            <span className="text-gray-300 text-opacity-30">|</span>
            &nbsp;&nbsp;댓글 100&nbsp;&nbsp;
            <span className="text-gray-300 text-opacity-30">|</span>
            &nbsp;&nbsp;추천 4,748
          </p>
        </div>
      </div>
      <div className="p-5 space-y-6 border-b-[1px] border-gray-600">
        {post.imageUrl ? (
          <Image src={post.imageUrl} alt="" height={100} width={100} />
        ) : null}
        <p>{post.content}</p>
      </div>
      <div className="flex justify-center items-center py-3 gap-3 border-b-[1px] border-gray-600">
        <Button
          variant={"outline"}
          className="bg-inherit hover:bg-gray-700 hover:text-white border-gray-500 px-5 flex gap-3"
        >
          <ThumbsUp size={20} fill="#9ca3af" />
          <span>4,748</span>
        </Button>
        <Button
          variant={"outline"}
          className="bg-inherit hover:bg-gray-700 hover:text-white border-gray-500 px-5 flex gap-3"
        >
          <ThumbsDown size={20} fill="#9ca3af" />
          <span>320</span>
        </Button>
      </div>
      <div className="py-1 px-4 border-b-[1px] border-gray-700 bg-gray-700 flex justify-end">
        <Button variant={"link"} className="px-2 flex gap-2 text-white ">
          <Share2 size={20} />
          <span>공유하기</span>
        </Button>
        <Button variant={"link"} className="px-2 flex gap-2 text-white">
          <AlertCircle size={20} />
          <span>신고</span>
        </Button>
      </div>
      <div className="p-3 border-b-[1px] border-gray-600">
        <div className="flex gap-3 items-center">
          <span>댓글</span>
          <span className="text-sm">
            총 <span className="text-green-400">30</span>개
          </span>
        </div>
      </div>
      {/* {isLoggedIn ? ( */}
      <div className="p-5 flex flex-col gap-2 bg-gray-700 border-b-[1px] border-gray-600">
        <textarea
          placeholder="타인의 권리를 침해하거나 명예를 훼손하는 글은 제재를 받을 수 있습니다"
          className="min-h-[100px] w-full border px-3 py-2 text-sm border-gray-400 bg-gray-800 outline-none"
        />
        <div className="flex justify-between">
          <div className="flex w-full items-center gap-2">
            <label
              htmlFor="file"
              className="flex items-center gap-3 cursor-pointer"
            >
              <span className="font-bold text-sm hover:bg-blue-400 bg-blue-500 transition text-white py-2.5 px-5 rounded-2xl">
                사진 추가
              </span>
            </label>
            <div>
              <Button
                type="button"
                // onClick={() => {
                //   deleteFile();
                // }}
                variant={"destructive"}
                className="rounded-2xl font-bold"
              >
                삭제
              </Button>
            </div>
            <div className="flex gap-2">
              <Input
                // value={filename}
                type="file"
                id="file"
                className="cursor-pointer hidden bg-inherit text-white"
                // onChange={handleUploadFile}
              />
            </div>
          </div>
          <Button
            type="button"
            className="px-5 bg-emerald-500 rounded-2xl font-bold hover:bg-emerald-400"
          >
            작성
          </Button>
        </div>
      </div>
      {/* ) : null} */}
      <div className="">
        <div className="p-4 border-b-[1px] border-gray-900">어쩌구</div>
        <div className="p-4 border-b-[1px] border-gray-900">어쩌구</div>
        <div className="p-4 border-b-[1px] border-gray-900">어쩌구</div>
        <div className="p-4 border-b-[1px] border-gray-900">어쩌구</div>
        <div className="p-4 border-b-[1px] border-gray-900">어쩌구</div>
        <div className="p-4 border-b-[1px] border-gray-900">어쩌구</div>
        <div className="p-4 border-b-[1px] border-gray-900">어쩌구</div>
        <div className="p-4 border-b-[1px] border-gray-900">어쩌구</div>
      </div>
    </div>
  );
};

export default PostDetail;
