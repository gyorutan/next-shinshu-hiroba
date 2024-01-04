import DefaultFootbar from "@/components/footbar/DefaultFootbar";
import DefaultTopbar from "@/components/topbar/DefaultTopbar";
import WriteTopbar from "@/components/topbar/WriteTopbar";

const WriteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen max-w-[768px] min-w-[375px] m-auto layout-shadow bg-gray-800">
      <WriteTopbar />
      {children}
      <DefaultFootbar />
    </div>
  );
};

export default WriteLayout;
