"use client";

import { api } from "@/helper/api";
import { calculatePostTime } from "@/helper/formatting";
import axios from "axios";
import { ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PostsProps {
  id: string;
  genre: string;
  writer: string;
  title: string;
  content: string;
  imageUrl: string;
  likes: string[];
  createdAt: Date;
}

const PostItems = () => {
  const [posts, setPosts] = useState<PostsProps[]>([]);

  console.log(posts);

  const fetchAllPosts = async () => {
    const response = await axios.get(`${api}/post`);
    const result = response.data;
    setPosts(result.posts);

    // const response = await fetch(`${api}/post`, {
    //   method: "GET",
    // });

    // const result = await response.json();

    // console.log(result);
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <>
      <div className="flex flex-col shadow-md w-full mt-[170px] mb-[115px] gap-[1px] border-y-[1px] border-gray-700 bg-gray-700">
        {posts.map((post) => (
          <Link key={post.id} href={`/post/${post.id}`}>
            <div className="bg-gray-800 border-none">
              <div className="flex w-full justify-between items-center py-2.5">
                <div className="w-[12%] flex flex-col justify-center items-center gap-1">
                  <div className="text-white flex justify-center items-center">
                    <ThumbsUp size={14} fill="#9ca3af" />
                  </div>
                  <div className="text-white text-sm flex justify-center items-center">
                    <span>{post.likes.length}</span>
                  </div>
                </div>
                <div className="w-[73%] flex flex-col justify-center item-start">
                  <div className="p-1 text-gray-100">{post.title}</div>
                  <div className="p-1 text-gray-300 text-sm">
                    <span className="text-gray-300">{post.genre}</span>
                    &nbsp;&nbsp;
                    <span className="text-gray-300 text-opacity-30">|</span>
                    &nbsp;&nbsp;
                    <span className="text-gray-300">
                      {calculatePostTime(post.createdAt)}
                    </span>
                    &nbsp;&nbsp;
                    <span className="text-gray-300 text-opacity-30">|</span>
                    &nbsp;&nbsp;
                    {post.writer}
                  </div>
                </div>
                <div className="w-[18%] flex justify-end px-3">
                  {post.imageUrl ? (
                    <Image
                      priority
                      src={post.imageUrl}
                      alt="image"
                      height={60}
                      width={60}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default PostItems;
