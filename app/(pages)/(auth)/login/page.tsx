import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <p className="text-3xl font-bold">로그인</p>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
