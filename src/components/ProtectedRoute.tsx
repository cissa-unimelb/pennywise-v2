import {useNavigate} from "react-router-dom";
import {UserContext} from "../stores/user";
import {useContext, useEffect} from "react";

type Props = {
  children: JSX.Element | JSX.Element[];
  treasurerOnly?: boolean
};

export default function ProtectedRoute({ children, treasurerOnly }: Props) {
  const { user} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id === "") {
      // user is not authenticated
      navigate('/login', {state:{login: true}});
    } else if (treasurerOnly && !user.isTreasurer) {
      // user is not treasurer
      navigate('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return <>{children}</>;
}
