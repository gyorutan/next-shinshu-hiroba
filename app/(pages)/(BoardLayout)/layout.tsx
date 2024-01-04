import DefaultFootbar from "@/components/footbar/DefaultFootbar";
import FunctionFootbar from "@/components/footbar/FunctionFootbar";
import BoardNavbar from "@/components/topbar/BoardNavbar";
import BoardTopbar from "@/components/topbar/BoardTopbar";
import DefaultTopbar from "@/components/topbar/DefaultTopbar";

const BoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen max-w-[768px] min-w-[375px] m-auto layout-shadow bg-gray-800">
      <DefaultTopbar />
      <BoardTopbar />
      <BoardNavbar />
      {children}
      <FunctionFootbar />
      <DefaultFootbar />
    </div>
  );
};

export default BoardLayout;
