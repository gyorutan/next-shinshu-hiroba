import DefaultFootbar from "@/components/footbar/DefaultFootbar";
import DefaultTopbar from "@/components/topbar/DefaultTopbar";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen max-w-[768px] min-w-[375px] m-auto layout-shadow bg-gray-800">
      <DefaultTopbar />
      {children}
      <DefaultFootbar />
    </div>
  );
};

export default DefaultLayout;
