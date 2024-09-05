import {UserContext} from "../../stores/user";
import { Navigate } from "react-router-dom";
import {useContext} from "react";
export default function Login() {
  const { user } = useContext(UserContext);

  return (
    <>
      {user.id !== "" && <Navigate to={"/dashboard"} replace={true} />}

      {user.id === "" && <Navigate to={"/login"} replace={true} />}
    </>
  );
}
