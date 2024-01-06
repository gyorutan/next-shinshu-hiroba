import MainScreen from "@/components/MainScreen";

const MainPage = () => {
  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center">
      <p className="text-4xl font-bold">메인 페이지</p>
      <p className="text-2xl font-bold">개발중입니다</p>
      <MainScreen />
    </div>
  );
};

export default MainPage;
