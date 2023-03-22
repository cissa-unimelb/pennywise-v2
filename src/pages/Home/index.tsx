import { useUserStore } from "../../stores/user";
import { Navigate } from "react-router-dom";
export default function Login() {
  const { value } = useUserStore();

  return (
    <>
      {value !== undefined && <Navigate to={"/dashboard"} replace={true} />}

      {value === undefined && <Navigate to={"/login"} replace={true} />}
    </>
  );
}
