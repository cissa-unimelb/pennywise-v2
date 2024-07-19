import {googleSignIn} from "../../auth";
import {User} from "../../auth/types";
import {useUserStore} from "../../stores/user";
import {Navigate} from "react-router-dom";
import {LoginForm} from "../../components/LoginForm";
import {useEffect, useState} from "react";
import {retainSession} from "../../auth/session";

export default function Login() {
  const [loading, setLoading] = useState(true);

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
      })
      .finally(() => {
        setLoading(false);
      })
  };

  useEffect(() => {
    retainSession()
      .then(handleSuccess)
      .catch(() => {
        console.log('failed to automatically sign in');
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  return (
    <>
      <div className="App-login-master-container">
        {
          !loading && (
            <LoginForm
              onClickLogin={login}
            />
          )
        }
        {value.id !== "" && <Navigate to={"/dashboard"} replace={true}/>}
      </div>
    </>
  );
}
