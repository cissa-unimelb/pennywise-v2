import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import GoogleIcon from "@mui/icons-material/Google";
type Props = {
  onClickLogin: () => void;
  loading: boolean;
};
export function LoginForm({ onClickLogin, loading }: Props) {
  return (
    <Card variant="outlined" className="Componnet-login-container">
      <Box style={{}}>
        <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
          Welcome to Pennywise V2!
        </Typography>

        <Typography level="body2">Log in to continue</Typography>
      </Box>
      <Box>
        <Button
          variant="solid"
          color="primary"
          startDecorator={<GoogleIcon />}
          sx={{ ml: "auto", fontWeight: 600 }}
          onClick={onClickLogin}
          disabled={loading}
        >
          Login with Google
        </Button>
      </Box>
    </Card>
  );
}
