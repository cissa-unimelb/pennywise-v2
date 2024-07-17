import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/user";

type Props = {
  children: JSX.Element | JSX.Element[];
  treasurerOnly?: boolean
};

export default function ProtectedRoute({ children, treasurerOnly }: Props) {
  const { value } = useUserStore();
  if (value.id === "") {
    // user is not authenticated
    return <Navigate to="/login" replace={true} />;
  }

  if (treasurerOnly && !value.isTreasurer) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return <>{children}</>;
}
