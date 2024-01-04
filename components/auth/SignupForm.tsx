"use client";

import { ChangeEvent, useEffect, useState } from "react";
import SignupScreenOne from "./signupScreen/SignupScreenOne";
import toast from "react-hot-toast";
import SignupScreenTwo from "./signupScreen/SignupScreenTwo";
import { useDebounce } from "@/hooks/useDebounce";
import axios from "axios";
import { api } from "@/helper/api";
import SignupScreenThree from "./signupScreen/SignupScreenThree";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const router = useRouter();
  const [pageData, setPageData] = useState({
    screenNumber: 1,
    isLoading: false,
    passwordConfirmDisable: true,
  });
  const [formData, setFormData] = useState({
    sei: "",
    mei: "",
    username: "",
    studentId: "",
    password: "",
    passwordConfirm: "",
  });
  const [isChecking, setIsChecking] = useState({
    username: "normal",
    studentId: "normal",
    password: "normal",
    passwordConfirm: "normal",
  });

  useEffect(() => {
    if (formData.passwordConfirm === "") {
      setIsChecking({ ...isChecking, passwordConfirm: "normal" });
      return;
    } else if (formData.passwordConfirm !== "") {
      if (formData.password === formData.passwordConfirm) {
        setIsChecking({ ...isChecking, passwordConfirm: "same" });
      } else if (formData.password !== formData.passwordConfirm) {
        setIsChecking({ ...isChecking, passwordConfirm: "not-same" });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formData.password,
    formData.passwordConfirm,
    isChecking.password,
    isChecking.passwordConfirm,
    pageData.passwordConfirmDisable,
  ]);

  const resetFormData = () => {
    setFormData({
      ...formData,
      sei: "",
      mei: "",
      username: "",
      studentId: "",
      password: "",
      passwordConfirm: "",
    });
  };

  // CheckingValue
  const checkingValue = async (name: string, value: string) => {
    const usernameRegex = new RegExp("^[a-zA-Z0-9ぁ-んァ-ン一-龯]{3,10}$");
    const studentIdRegex = new RegExp("^[0-9]{2}[a-z]{1}[0-9]{4}[a-z]{1}$");
    const passwordRegex = new RegExp("^[a-zA-Z0-9]{6,20}$");

    if (name === "username" && !value) {
      setIsChecking({ ...isChecking, username: "normal" });
      return;
    } else if (name === "username" && value) {
      const result = usernameRegex.test(value);
      if (result) {
        const response = await axios.get(`${api}/auth/${name}/${value}`);
        const result = await response.data;
        console.log("닉네임 중복검사 결과", result);
        setIsChecking({ ...isChecking, username: result.result });
      } else {
        setIsChecking({ ...isChecking, username: "regex" });
        return;
      }
    }

    if (name === "studentId" && !value) {
      setIsChecking({ ...isChecking, studentId: "normal" });
      return;
    } else if (name === "studentId" && value) {
      const result = studentIdRegex.test(value);
      console.log(result);
      if (result) {
        const response = await axios.get(`${api}/auth/${name}/${value}`);
        const result = await response.data;
        console.log("학적번호 중복검사 결과", result);
        setIsChecking({ ...isChecking, studentId: result.result });
      } else {
        setIsChecking({ ...isChecking, studentId: "regex" });
        return;
      }
    }

    // password의 값이 null일때
    if (name === "password" && !value) {
      setIsChecking({ ...isChecking, password: "normal" });
      setPageData({ ...pageData, passwordConfirmDisable: true });
      return;
    }
    // null이 아니면 password의 정규식 검증
    else if (name === "password" && value) {
      const result = passwordRegex.test(value);
      // password의 정규식 검증이 통과하면 상태 변경
      if (result) {
        setIsChecking({ ...isChecking, password: "available-password" });
        setPageData({ ...pageData, passwordConfirmDisable: false });
      }
      // 정규식 검증에 실패했을때
      else {
        setIsChecking({ ...isChecking, password: "regex" });
        setPageData({ ...pageData, passwordConfirmDisable: true });
        return;
      }
    }
  };

  // 디바운스
  const onChangeDebounced = useDebounce(checkingValue);

  // 인풋 핸들러
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData({ ...formData, [name]: value });
    onChangeDebounced(name, value);
  };

  // 이전 스크린 보여주기
  const handleBeforeScreen = () => {
    setPageData({ ...pageData, screenNumber: pageData.screenNumber - 1 });
  };

  // 2번째 스크린 보여주기
  const showNumberTwoScreen = () => {
    if (formData.sei === "") {
      toast.error("성을 입력해주세요");
      return;
    } else if (formData.mei === "") {
      toast.error("이름을 입력해주세요");
      return;
    }
    setPageData({ ...pageData, screenNumber: 2 });
  };

  // 3번째 스크린 보여주기
  const showNumberThreeScreen = () => {
    if (formData.username === "") {
      toast.error("닉네임을 입력해주세요");
      return;
    } else if (formData.studentId === "") {
      toast.error("학번을 입력해주세요");
      return;
    } else if (
      isChecking.username === "regex" ||
      isChecking.studentId === "regex"
    ) {
      toast.error("입력한 형식이 올바르지 않습니다");
      return;
    } else if (isChecking.username !== "available-username") {
      toast.error("사용할 수 없는 닉네임입니다");
      return;
    } else if (isChecking.studentId !== "available-studentId") {
      toast.error("사용할 수 없는 학적번호입니다");
      return;
    }
    setPageData({ ...pageData, screenNumber: 3 });
  };

  const handleSignUp = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      isChecking.username !== "available-username" ||
      isChecking.studentId !== "available-studentId" ||
      isChecking.password !== "available-password"
    ) {
      toast.error("입력한 형식이 올바르지 않습니다");
      return;
    } else if (isChecking.passwordConfirm === "not-same") {
      toast.error("비밀번호가 일치하지 않습니다");
      return;
    }
    try {
      setPageData({ ...pageData, isLoading: true });

      const response = await axios.post(`${api}/auth/signup`, formData);
      const result = await response.data;
      console.log("회원가입 응답", result);

      if (result.success) {
        toast.success(result.message);
        router.push("/login");
      } else {
        toast.error(result.message);
        resetFormData();
        setPageData({ ...pageData, screenNumber: 1 });
      }
    } catch (error) {
      console.log(error);
      toast.error("알 수 없는 에러");
    } finally {
      setPageData({ ...pageData, isLoading: false });
    }
  };

  return (
    <>
      <form className="flex flex-col w-full p-20" onSubmit={handleSignUp}>
        {pageData.screenNumber === 1 ? (
          <SignupScreenOne
            sei={formData.sei}
            mei={formData.mei}
            handleInputChange={handleInputChange}
            showNumberTwoScreen={showNumberTwoScreen}
          />
        ) : null}
        {pageData.screenNumber === 2 ? (
          <SignupScreenTwo
            username={formData.username}
            studentId={formData.studentId}
            checkUsername={isChecking.username}
            checkStudentId={isChecking.studentId}
            handleInputChange={handleInputChange}
            handleBeforeScreen={handleBeforeScreen}
            showNumberThreeScreen={showNumberThreeScreen}
          />
        ) : null}
        {pageData.screenNumber === 3 ? (
          <SignupScreenThree
            password={formData.password}
            passwordConfirm={formData.passwordConfirm}
            checkPassword={isChecking.password}
            checkPasswordConfirm={isChecking.passwordConfirm}
            passwordConfirmDisable={pageData.passwordConfirmDisable}
            isLoading={pageData.isLoading}
            handleInputChange={handleInputChange}
            handleBeforeScreen={handleBeforeScreen}
          />
        ) : null}
      </form>
    </>
  );
};

export default SignupForm;
