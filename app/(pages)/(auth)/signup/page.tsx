import SignupForm from "@/components/auth/SignupForm";

const SignupPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <p className="text-3xl font-bold">회원가입</p>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
