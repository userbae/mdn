export const createNewFileInRepo = async (
  owner: string,
  repo: string,
  token: string,
  filePath: string,
  content: string
) => {
  // 파일 내용을 Base64 인코딩
  const fileContent = btoa(content);

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message: "새 파일 추가", // 커밋 메시지
          content: fileContent, // Base64 인코딩된 파일 내용
          branch: "main", // 브랜치 설정
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("파일 생성 성공:", data);
      return data;
    } else {
      const errorData = await response.json();
      console.error("파일 생성 실패:", errorData);
      throw new Error(errorData.message);
    }
  } catch (error: any) {
    console.error("새 파일 생성 중 오류 발생:", error.message);
  }
};
