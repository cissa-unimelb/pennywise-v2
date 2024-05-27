import { useUserStore } from "../../stores/user";
import { Navigate } from "react-router-dom";
export default function Login() {
  const { value } = useUserStore();

  return (
    <>
      {value.id !== "" && <Navigate to={"/dashboard"} replace={true} />}

      {value.id === "" && <Navigate to={"/login"} replace={true} />}
    </>
  );
}
