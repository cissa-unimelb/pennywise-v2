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
      <Box>
        <Typography
          level="body2"
          sx={{
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "common.white",
            mb: 1,
          }}
        >
          Cissa finance portal
        </Typography>
        <Typography
          level="h2"
          sx={{ fontSize: "2rem", mb: 1, color: "common.white" }}
        >
          Welcome to Pennywise.
        </Typography>
        <Typography level="body1" sx={{ color: "neutral.300" }}>
          Sign in with Google to continue using the same invoice and
          reimbursement workflows.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography level="body2" sx={{ color: "neutral.400" }}>
          Cyan finance workspace
        </Typography>
        <Button
          variant="solid"
          color="primary"
          startDecorator={<GoogleIcon />}
          sx={{
            ml: "auto",
            minWidth: 220,
            fontWeight: 700,
            px: 2.5,
            py: 1.25,
            borderRadius: 999,
            color: "#041014",
            background: "linear-gradient(135deg, #67e8f9, #06b6d4)",
            boxShadow: "0 16px 36px rgba(6, 182, 212, 0.35)",
            border: "1px solid rgba(103, 232, 249, 0.4)",
            "&:hover": {
              background: "linear-gradient(135deg, #a5f3fc, #22d3ee)",
            },
            "&.Mui-disabled": {
              color: "rgba(4, 16, 20, 0.55)",
              background: "rgba(103, 232, 249, 0.32)",
            },
          }}
          onClick={onClickLogin}
          disabled={loading}
        >
          Login with Google
        </Button>
      </Box>
    </Card>
  );
}
