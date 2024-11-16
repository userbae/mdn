import { createGitHubRepo } from "./githubCreate";

export const checkGitHubRepo = async (
  token: string,
  githubUsername: string | null
) => {
  if (!githubUsername) return;
  const response = await fetch(
    `https://api.github.com/users/${githubUsername}/repos`,
    {
      method: "GET",

      headers: {
        Authorization: `token ${token}`,
      },
    }
  ).then((res) => res.json());

  const result = response.map((repo: any) => {
    if (repo.name == "markdownNoteApp") return true;
  });

  if (!result.includes(true)) {
    // 저장소 생성
    await createGitHubRepo(token, "markdownNoteApp");
  }
};
