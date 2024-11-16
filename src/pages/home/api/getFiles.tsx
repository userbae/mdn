export const getRepoFiles = async (
  owner: string,
  repo: string,
  token: string,
  path = ""
) => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      method: "GET",
      headers: {
        Authorization: `token  ${token}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("저장소의 파일을 불러오는 데 실패했습니다.");
  }
};
