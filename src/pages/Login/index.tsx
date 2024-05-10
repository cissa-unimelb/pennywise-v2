import {googleSignIn} from "../../auth";
import {User} from "../../auth/types";
import {useUserStore} from "../../stores/user";
import {Navigate} from "react-router-dom";
import {LoginForm} from "../../components/LoginForm";

export default function Login() {
  // TODO: refactor to react context please
  const {value, setUserStore} = useUserStore();
  const handleSuccess = async (user: User) => {
    setUserStore(user);
  };

  const login = () => {
    googleSignIn()
      .then(handleSuccess)
      .catch(err => {
        alert(err);
        console.log(err);
      });
  };

  return (
    <>
      <div className="App-login-master-container">
        {value.id !== "" && <Navigate to={"/dashboard"} replace={true}/>}
        <LoginForm
          onClickLogin={login}
        />
      </div>
    </>
  );
}
