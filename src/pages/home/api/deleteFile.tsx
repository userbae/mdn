export const deleteFileFromRepo = async (
  owner: string,
  repo: string,
  token: string,
  filePath: string
) => {
  try {
    // 1. 최신 파일 정보 가져오기 (SHA 포함)
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
      console.error("파일 정보 가져오기 실패:", errorData);
      throw new Error("파일 정보 가져오기 중 오류 발생.");
    }

    const fileData = await getFileResponse.json();
    const fileSha = fileData.sha; // 삭제할 파일의 SHA 값

    // 2. 삭제 요청
    const deleteResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message: "파일 삭제", // 커밋 메시지
          sha: fileSha, // 삭제할 파일의 SHA
          branch: "main", // 삭제할 브랜치 (기본값은 main)
        }),
      }
    );

    if (deleteResponse.ok) {
      const deleteData = await deleteResponse.json();
      console.log("파일 삭제 성공:", deleteData);
      return window.location.reload();
    } else {
      const errorData = await deleteResponse.json();
      console.error("파일 삭제 실패:", errorData);
      throw new Error("파일 삭제 중 오류 발생.");
    }
  } catch (error) {
    console.error("파일 삭제 중 오류 발생:", error);
    return null;
  }
};
