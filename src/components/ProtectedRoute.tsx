import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/user";
type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function ProtectedRoute({ children }: Props) {
  const { value } = useUserStore();
  if (value.id === "") {
    // user is not authenticated
    return <Navigate to="/login" replace={true} />;
  }
  return <>{children}</>;
}
