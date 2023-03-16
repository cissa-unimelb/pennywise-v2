import { googleSignIn } from "../auth";
import { User } from "../auth/types";
import { useUserStore } from "../stores/user";
import { Navigate } from "react-router-dom";
import { Button } from "../components/Button";
import { checkUserExists, setUser } from "../database";

export default function Login() {
  const { value, setUserStore } = useUserStore();
  console.log(value);
  const handleSuccess = async (user: User) => {
    console.log(user);
    setUserStore(user);
    if (!(await checkUserExists(user.id))) {
      await setUser(user);
    }
  };

  return (
    <div>
      {value !== undefined && <Navigate to={"/pagetwo"} replace={true} />}
      <h1>Login</h1>
      <Button
        text={"Login"}
        onClick={() => {
          googleSignIn(handleSuccess, (err: any) => {
            console.log(err);
          });
        }}
      />
    </div>
  );
}
