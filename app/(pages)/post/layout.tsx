import DefaultFootbar from "@/components/footbar/DefaultFootbar";
import FunctionFootbar from "@/components/footbar/FunctionFootbar";
import DefaultTopbar from "@/components/topbar/DefaultTopbar";

const PostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen max-w-[768px] min-w-[375px] m-auto layout-shadow bg-gray-800">
      <DefaultTopbar />
      {children}
      <FunctionFootbar />
      <DefaultFootbar />
    </div>
  );
};

export default PostLayout;
