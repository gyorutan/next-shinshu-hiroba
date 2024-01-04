import { Button } from "@/components/ui/button";
import { LogIn, Pyramid, UserRoundPlus } from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <>
      <div className="h-screen flex flex-col gap-12 justify-center items-center">
        <div className="flex justify-center items-center gap-2">
          <Pyramid size={95} fill="#486081" />
          <div className="flex flex-col gap-2 items-end">
            <h1 className="flex text-5xl font-bold justify-center items-center gap-4">
              <span>대학교 광장</span>
            </h1>
            <p className="text-gray-300 text-lg">대학교 종합 커뮤니티</p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button asChild size={"lg"} variant={"blue"}>
            <Link href={"/login"} className="font-semibold flex gap-2">
              <LogIn size={20} />
              <span>로그인</span>
            </Link>
          </Button>
          <Button asChild size={"lg"} variant={"emerald"}>
            <Link href={"/signup"} className="font-semibold flex gap-2">
              <UserRoundPlus size={20} />
              <span>회원가입</span>
            </Link>
          </Button>
        </div>
        <Button variant={"link"} asChild>
          <Link href={"/main"} className="text-white text-opacity-70">
            나중에 로그인할게요
          </Link>
        </Button>
      </div>
    </>
  );
};

export default LandingPage;
