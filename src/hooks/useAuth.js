import { path } from "@constants/paths";
import axios from "axios";
import { signIn, signOut } from "next-auth/react";

const useAuth = () => {
  const signup = async (data) => {
    try {
      const response = axios.post("/api/auth/signup", data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async ({ email, password }) => {
    console.log(path.appBaseUrl);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: `${path.appBaseUrl}/books`,
    });
    console.log(result);
  };

  const logout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: `${path.appBaseUrl}/login`,
    });
  };

  return { signup, login, logout };
};

export default useAuth;
