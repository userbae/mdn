async function createGitHubRepo(accessToken: string, repoName: string) {
  const url = `https://api.github.com/user/repos`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `token ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: repoName,
      description: "This repository stores notes from my note-taking app.",
      private: true, // 비공개 저장소로 설정
    }),
  });

  if (response.ok) {
    console.log("Repository created successfully!");
  } else {
    const errorData = await response.json();
    // 에러 메시지 내용 파악

    console.error(
      "Failed to create repository:",
      response.status,
      response.statusText,
      errorData.message
    );
  }
}

export { createGitHubRepo };
