import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { app } from "../fb";

const auth = getAuth(app);
const provider = new GithubAuthProvider();

async function signInWithGitHub() {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;

    if (accessToken) {
      return accessToken;
    } else {
      throw new Error("Access token is missing");
    }
  } catch (error) {
    console.error("GitHub 로그인 실패:", error);
    throw error;
  }
}

export { signInWithGitHub };
