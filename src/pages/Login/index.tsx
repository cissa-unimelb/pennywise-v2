import {googleSignIn} from "../../auth";
import {AutoLoginContext, UserContext} from "../../stores/user";
import {useLocation, useNavigate} from "react-router-dom";
import {LoginForm} from "../../components/LoginForm";
import {useContext, useEffect, useState} from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const {user, setUser} = useContext(UserContext);
  const {loading: loginLoading} = useContext(AutoLoginContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Login the user, only sets the basic user details, the bank acc is set by bankform
  const login = async () => {
    setLoading(true);
    try {
      const result = await googleSignIn();
      setUser(result);
    } catch (err) {
      alert(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Automatically redirect when user is logged in
  useEffect(() => {
    if (user.id !== "") {
      if (location.state && location.state.login && user.bsb != null) {
        // if redirected to login and we have a bank acc already, we go back
        navigate(-1);
      } else {
        // else go to dashboard
        navigate('/dashboard');
      }
    }
  }, [user, navigate, location]);

  return (
    <>
      <div className="App-login-master-container">
        <LoginForm
          onClickLogin={login}
          loading={loading || loginLoading}
        />
      </div>
    </>
  );
}
