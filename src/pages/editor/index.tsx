import { userInfo } from "@/shared";

import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import rehypeRaw from "rehype-raw";

export const Editor = () => {
  const { login, repo, token } = useRecoilValue(userInfo);
  const [title, setTitle] = useState(``);
  const [content, setContent] = useState(``);
  const { editor } = useParams();
  const [viewMode, setViewMode] = useState(false);

  useEffect(() => {
    let fetch = fetchFileContent(login, repo, token, editor as string);
    fetch.then((rep) => {
      setTitle(rep?.title as string);
      setContent(rep?.content as string);
    });
  }, []);

  return (
    <div className="m-3 flex flex-col h-full">
      <div className="flex justify-between mb-3 border-b border-gray-200 pb-5">
        <div className="text-2xl font-bold" children={title} />
        <menu className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-xl cursor-pointer border border-gray-500 rounded-md p-2">
            <div
              className={`text-sm ${viewMode ? "text-blue-500 font-bold" : ""}`}
              onClick={() => setViewMode(true)}
            >
              코드
            </div>
            <div
              className={`text-sm ${
                !viewMode ? "text-blue-500 font-bold" : ""
              }`}
              onClick={() => setViewMode(false)}
            >
              뷰
            </div>
          </div>
          <button
            onClick={() =>
              saveUpdatedFileToRepo(
                login,
                repo,
                token,
                editor as string,
                content
              )
            }
          >
            저장
          </button>
        </menu>
      </div>
      {viewMode ? (
        <div className="flex-1 flex ">
          <textarea
            className="w-full h-full outline-none resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            className="prose"
          >
            {content}
          </Markdown>
        </div>
      ) : (
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          className="prose"
        >
          {content}
        </Markdown>
      )}
    </div>
  );
};

const fetchFileContent = async (
  owner: string,
  repo: string,
  token: string,
  filePath: string
) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      const content = new TextDecoder().decode(
        Uint8Array.from(atob(data.content), (c) => c.charCodeAt(0))
      ); // Base64 디코딩
      const title = filePath.split("/").pop(); // 파일 경로에서 파일 이름 추출

      return { title, content };
    } else {
      const errorData = await response.json();
      console.error("파일 불러오기 실패:", errorData);
      throw new Error(errorData.message);
    }
  } catch (error: any) {
    console.error("파일 불러오는 중 오류 발생:", error.message);
    return null;
  }
};

const saveUpdatedFileToRepo = async (
  owner: string,
  repo: string,
  token: string,
  filePath: string,
  newContent: string
) => {
  try {
    // 1. 최신 파일 정보 가져오기
    const getFileResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!getFileResponse.ok) {
      const errorData = await getFileResponse.json();
      console.error("파일 읽기 실패:", errorData);
      throw new Error("파일 읽기 중 오류 발생.");
    }

    const fileData = await getFileResponse.json();
    const fileSha = fileData.sha; // 최신 SHA 값 가져오기

    // 2. 새 내용 Base64로 인코딩
    const encodeToBase64 = (str: string) =>
      btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
          String.fromCharCode(parseInt(p1, 16))
        )
      );
    const updatedContent = encodeToBase64(newContent);

    // 3. 파일 업데이트 요청
    const updateResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message: "파일 내용 업데이트", // 커밋 메시지
          content: updatedContent, // Base64로 인코딩된 새 내용
          name: "hi",
          path: "hi",
          sha: fileSha, // 최신 SHA 값
          branch: "main", // 업데이트할 브랜치
        }),
      }
    );

    if (updateResponse.ok) {
      const updatedData = await updateResponse.json();
      console.log("파일 업데이트 성공:", updatedData);
      return updatedData;
    } else {
      const errorData = await updateResponse.json();
      console.error("파일 업데이트 실패:", errorData);
      throw new Error("파일 업데이트 중 오류 발생.");
    }
  } catch (error: any) {
    console.error("파일 업데이트 중 오류 발생:", error.message);
    return null;
  }
};
