import {googleSignIn} from "../../auth";
import {User} from "../../auth/types";
import {UserContext} from "../../stores/user";
import {Navigate} from "react-router-dom";
import {LoginForm} from "../../components/LoginForm";
import {useCallback, useContext, useEffect, useState} from "react";
import {retainSession} from "../../auth/session";

export default function Login() {
  const [loading, setLoading] = useState(true);

  // TODO: refactor to react context please
  const {user, setUser: setUserStore} = useContext(UserContext);
  const handleSuccess = useCallback(async (user: User) => {
    setUserStore(user);
  }, [setUserStore]);

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
  }, [handleSuccess]);

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
        {user.id !== "" && <Navigate to={"/dashboard"} replace={true}/>}
      </div>
    </>
  );
}
