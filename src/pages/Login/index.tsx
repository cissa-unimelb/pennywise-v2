import { googleSignIn } from "../../auth";
import { User } from "../../auth/types";
import { useUserStore } from "../../stores/user";
import { Navigate } from "react-router-dom";
import { checkUserExists, setUser } from "../../database";
import { LoginForm } from "../../components/LoginForm";
import { useTheme } from "@mui/joy/styles";
export default function Login() {
  const { value, setUserStore } = useUserStore();
  const theme = useTheme();
  console.log(value);
  const handleSuccess = async (user: User) => {
    console.log(user);
    setUserStore(user);
    if (!(await checkUserExists(user.id))) {
      await setUser(user);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          height: "100vh",
          backgroundColor: theme.palette.background.level1,
          paddingBottom: 100,
        }}
      >
        {value !== undefined && <Navigate to={"/dashboard"} replace={true} />}
        <LoginForm
          onClickLogin={() => {
            googleSignIn(handleSuccess, (err: any) => {
              console.log(err);
            });
          }}
        />
      </div>
    </>
  );
}
