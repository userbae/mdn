import { userInfo } from "@/shared";
import { useState } from "react";
import { BsGithub, BsThreeDotsVertical } from "react-icons/bs";
import { useRecoilValue, useResetRecoilState } from "recoil";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { login, url, avatar_url, repo } = useRecoilValue(userInfo);
  const reset = useResetRecoilState(userInfo);
  const logout = () => {
    // 로컬 스토리지 또는 세션에서 토큰 삭제
    localStorage.removeItem("github_token"); // 저장된 토큰 키 이름에 따라 수정
    reset();
    console.log("로그아웃되었습니다.");
    window.location.href = "/"; // 로그인 페이지로 리다이렉트
  };
  return (
    <nav className="flex justify-between h-16 p-4 items-center relative">
      <div className="text-2xl font-bold">MDNote</div>

      <BsThreeDotsVertical
        className="text-xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      ></BsThreeDotsVertical>
      <menu
        className={`absolute right-0 top-16 bg-white p-4 rounded-lg shadow-lg transition-all duration-200 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-[-10px] pointer-events-none"
        } `}
      >
        <li className="  rounded-md px-2 py-1 flex  items-center gap-2  ">
          <img src={avatar_url} alt="avatar" className="w-5 h-5 rounded-full" />
          <div className="flex flex-col gap-1">
            <span>{login}</span>
          </div>
        </li>
        <li className="cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1">
          <a
            href={url + "/" + repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <BsGithub className="text-xl" />깃 허브
          </a>
        </li>
        <li className="cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1">
          환경설정
        </li>
        <li
          className="cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1"
          onClick={logout}
        >
          로그아웃
        </li>
        <hr className="my-2" />
        <li className="cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1 ">
          다크모드
        </li>
      </menu>
    </nav>
  );
};
