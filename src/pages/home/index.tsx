import { Nav, New } from "@/features";
import { userInfo } from "@/shared";
import { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { deleteFileFromRepo, getRepoFiles } from "./api";

interface GithubFile {
  name: string;
}

export const Home = () => {
  const [files, setFiles] = useState<GithubFile[]>([]);
  const { login, repo, token } = useRecoilValue(userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    getRepoFiles(login, repo, token).then((data) => {
      setFiles(data);
    });
  }, []);
  return (
    <div className="flex flex-col min-h-screen gap-3">
      <Nav />
      <div className="px-4 flex-1 bg-gray-50 gap-4">
        <New login={login} repo={repo} token={token} />
        {files.length > 0 &&
          files.map((file) => (
            // 노트 리스트
            <div
              className="m-3 p-3 bg-white flex justify-between items-center rounded-lg border border-gray-200"
              key={file.name}
              onClick={() => {
                navigate(`/${file.name}`);
              }}
            >
              <div className="flex flex-col gap-3">
                <h1 className="text-2xl font-bold">{file.name as string}</h1>
              </div>
              <IoTrashOutline
                className="hover:text-red-500 cursor-pointer text-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFileFromRepo(login, repo, token, file.name);
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
