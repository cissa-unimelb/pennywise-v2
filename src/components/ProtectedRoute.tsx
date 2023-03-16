import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/user";
type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export const ProtectedRoute = ({ children }: Props) => {
  const { value } = useUserStore();
  if (!value) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};
