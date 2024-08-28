import { Navigate } from "react-router-dom";
import {UserContext} from "../stores/user";
import {useContext} from "react";

type Props = {
  children: JSX.Element | JSX.Element[];
  treasurerOnly?: boolean
};

export default function ProtectedRoute({ children, treasurerOnly }: Props) {
  const { user} = useContext(UserContext);
  if (user.id === "") {
    // user is not authenticated
    return <Navigate to="/login" replace={true} />;
  }

  if (treasurerOnly && !user.isTreasurer) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return <>{children}</>;
}
