import { path } from "@constants/paths";
import { toastConfig } from "@constants/toastConfig";
import axios from "axios";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const useAuth = () => {
  const { push } = useRouter();

  const signup = async (data) => {
    try {
      const loading = toast.loading("Creating Account...");
      const response = axios.post("/api/auth/signup", data);
      toast.update(loading, {
        ...toastConfig,
        render: (
          <div className="text-center">
            {response.data}.<br />
            Please Login to Continue...
          </div>
        ),
        type: "success",
        isLoading: false,
      });
    } catch (error) {
      toast.update(loading, {
        ...toastConfig,
        render: (
          <div className="text-center">
            Account creation Failed! <br /> Please Try Again...
          </div>
        ),
        type: "error",
        isLoading: false,
      });
      console.log(error);
    }
  };

  const login = async ({ email, password }) => {
    const loading = toast.loading("Attempting to Login...");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: `${path.appBaseUrl}/books`,
    });
    if (result.error) {
      toast.update(loading, {
        ...toastConfig,
        render: <div className="text-center">{result.error}</div>,
        type: "error",
        isLoading: false,
      });
    } else {
      toast.update(loading, {
        ...toastConfig,
        render: <div className="text-center">User Successfully Logged in.</div>,
        type: "success",
        isLoading: false,
      });
    }
    console.log("result", result);
  };

  const logout = async () => {
    await toast.promise(
      signOut({
        redirect: false,
        // callbackUrl: `${path.appBaseUrl}/login`,
      }),
      {
        pending: "Logging Out...",
        error: (
          <div className="text-center">
            Log Out Failed! <br /> Please Try Again...
          </div>
        ),
        success: "User Logged Out Successfully!",
      }
    );
    push("/login");
  };

  return { signup, login, logout };
};

export default useAuth;
