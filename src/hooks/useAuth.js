import { path } from "@constants/paths";
import { toastConfig } from "@constants/toastConfig";
import axios from "axios";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const useAuth = () => {
  const { push } = useRouter();

  const signup = async (data) => {
    const loading = toast.loading("Creating Account...");
    try {
      const response = await axios.post("/api/auth/signup", data);
      toast.update(loading, {
        ...toastConfig,
        render: (
          <div className="text-center">
            Hey! <b>{response.data.name}</b> Your account has been created.
            <br />
            Please Login to Continue...
          </div>
        ),
        type: "success",
        isLoading: false,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.update(loading, {
        ...toastConfig,
        render: (
          <div className="text-center">
            {error.response.data}
            <br />
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
    console.log(result);
    if (result.error) {
      const error = JSON.parse(result.error);
      toast.update(loading, {
        ...toastConfig,
        render: <div className="text-center">{error.msg}</div>,
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
