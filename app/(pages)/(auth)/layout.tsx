import AuthTopbar from "@/components/auth/AuthTopbar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen max-w-[768px] min-w-[375px] m-auto layout-shadow bg-gray-800">
      <AuthTopbar />
      {children}
    </div>
  );
};

export default AuthLayout;
