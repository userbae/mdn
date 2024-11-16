import {
  getGitHubUsername,
  signInWithGitHub,
  userInfo,
  checkGitHubRepo,
} from "@/shared";
import { BsGithub } from "react-icons/bs";
import { useRecoilState } from "recoil";

export const Login = () => {
  const [, setUser] = useRecoilState(userInfo);
  const login = async () => {
    const token = await signInWithGitHub();

    const githubUsername = await getGitHubUsername(token, setUser);
    // 저장소 존재 여부 확인 및 생성
    await checkGitHubRepo(token, githubUsername);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5 p-4">
      <h1 className="text-2xl font-bold">MDNote</h1>
      <button
        onClick={login}
        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
      >
        <BsGithub /> GitHub 로그인
      </button>
    </div>
  );
};
