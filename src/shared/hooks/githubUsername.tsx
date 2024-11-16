async function getGitHubUsername(
  accessToken: string,
  setUser: (user: any) => void
): Promise<string | null> {
  const url = `https://api.github.com/user`;

  const response = await fetch(url, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();

    setUser({
      login: data.login,
      url: data.html_url,
      avatar_url: data.avatar_url,
      repo: "markdownNoteApp",
      token: accessToken,
    });
    return data.login; // GitHub
  } else {
    console.error("Failed to get GitHub username:", response.statusText);
    return null;
  }
}

export { getGitHubUsername };
