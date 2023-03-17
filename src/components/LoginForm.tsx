import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import GoogleIcon from "@mui/icons-material/Google";
type Props = {
  onClickLogin: () => void;
};
export function LoginForm({ onClickLogin }: Props) {
  return (
    <Card
      variant="outlined"
      sx={{ width: 320, height: 120, justifyContent: "space-between" }}
    >
      <Box style={{}}>
        <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
          Welcome to Pennywise V2!
        </Typography>

        <Typography level="body2">Log in to continue</Typography>
      </Box>
      <Box>
        {/* <div>
          <Typography level="body3">Total price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            $2,900
          </Typography>
        </div> */}
        <Button
          variant="solid"
          color="primary"
          startDecorator={<GoogleIcon />}
          sx={{ ml: "auto", fontWeight: 600 }}
          onClick={onClickLogin}
        >
          Login with Google
        </Button>
      </Box>
    </Card>
  );
}
