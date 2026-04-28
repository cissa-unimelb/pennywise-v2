import * as React from "react";
import type { User } from "../auth/types";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";

type Props = {
  user: User;
  onLogout: () => void;
  onAnalytics: () => void;
};
export function Header({ user, onLogout, onAnalytics }: Props) {
  return (
    <Card variant="outlined" className="Component-header-container">
      <Avatar
        alt={user?.name}
        src={user?.photoURL}
        className="Component-header-avatar"
        sx={{ width: 56, height: 56 }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, flex: 1 }}>
        <Typography
          level="body2"
          sx={{
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "primary.300",
          }}
        >
          PennyWise
        </Typography>
        <Typography
          level="h2"
          sx={{
            fontSize: { xs: "1.25rem", md: "1.75rem", color: "#fff" },
          }}
        >
          Hello {user?.name}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1.25,
          flexWrap: "wrap",
          justifyContent: "flex-end",
        }}
      >
        {user.isTreasurer && (
          <Button
            onClick={onAnalytics}
            variant="soft"
            color="primary"
            sx={{ borderRadius: 999, px: 2 }}
          >
            Analytics
          </Button>
        )}
        <Button
          onClick={onLogout}
          variant="solid"
          color="primary"
          sx={{ borderRadius: 999, px: 2.5, color: "#041014" }}
        >
          Logout
        </Button>
      </Box>
    </Card>
  );
}
