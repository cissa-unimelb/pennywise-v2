import {Navigate} from "react-router-dom";
import {AutoLoginContext, UserContext} from "../stores/user";
import {useContext} from "react";

type Props = {
  children: JSX.Element | JSX.Element[];
  treasurerOnly?: boolean
};

export default function ProtectedRoute({ children, treasurerOnly }: Props) {
  const { user} = useContext(UserContext);
  const {loading} = useContext(AutoLoginContext);

  // Wait for Firebase to restore its persisted session before making an auth
  // decision. The user context is intentionally empty during this period.
  if (loading) {
    return null;
  }

  if (user.id === "") {
    return <Navigate to="/login" state={{login: true}} replace />;
  }

  if (treasurerOnly && !user.isTreasurer) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
