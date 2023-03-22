import { googleSignIn } from "../../auth";
import { User } from "../../auth/types";
import { useUserStore } from "../../stores/user";
import { Navigate } from "react-router-dom";
import { checkUserExists, setUser } from "../../database";
import { LoginForm } from "../../components/LoginForm";
export default function Login() {
  const { value, setUserStore } = useUserStore();
  const handleSuccess = async (user: User) => {
    setUserStore(user);
    if (!(await checkUserExists(user.id))) {
      await setUser(user);
    }
  };

  return (
    <>
      <div className="App-login-master-container">
        {value !== undefined && <Navigate to={"/dashboard"} replace={true} />}
        <LoginForm
          onClickLogin={() => {
            googleSignIn(handleSuccess, (err: any) => {
              console.log(err);
            });
          }}
        />
      </div>
    </>
  );
}
