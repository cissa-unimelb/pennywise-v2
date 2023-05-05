import { googleSignIn } from "../../auth";
import { User } from "../../auth/types";
import { useUserStore } from "../../stores/user";
import { Navigate } from "react-router-dom";
import { LoginForm } from "../../components/LoginForm";
export default function Login() {
  const { value, setUserStore } = useUserStore();
  const handleSuccess = async (user: User) => {
    setUserStore(user);
  };

  return (
    <>
      <div className="App-login-master-container">
        {value !== undefined && <Navigate to={"/dashboard"} replace={true} />}
        <LoginForm
          onClickLogin={() => {
            googleSignIn(handleSuccess, (err: any) => {
              alert(err);
              console.log(err);
            });
          }}
        />
      </div>
    </>
  );
}
