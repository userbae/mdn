import { createNewFileInRepo } from "./api";

export const New = ({
  login,
  repo,
  token,
}: {
  login: string;
  repo: string;
  token: string;
}) => {
  // 저장할 파일 경로와 이름 랜덤 생성
  const generateRandomFileName = () => {
    return `note-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}.md`;
    // 예: "note-1700000000000-abc123.md"
  };

  const content =
    "# My New Note\n\nThis is a new note created in the repository!"; // 파일 내용

  return (
    <div
      className="flex m-3"
      onClick={() =>
        createNewFileInRepo(
          login,
          repo,
          token,
          generateRandomFileName(),
          content
        )
      }
    >
      <button className="bg-white dark:bg-gray-800 w-full flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-blue-50 dark:hover:bg-gray-700 p-4 transition-all duration-200">
        <svg
          className="text-indigo-500 dark:text-indigo-400"
          width="24"
          height="24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
        </svg>
        <span className="font-medium text-gray-900 dark:text-gray-100">
          새 노트 작성하기
        </span>
      </button>
    </div>
  );
};
