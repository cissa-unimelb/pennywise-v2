import * as React from "react";
import type { User } from "../auth/types";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import Button from "@mui/joy/Button";
type Props = {
  user: User | undefined;
  onClickLogout: () => void;
};
export function Header({ user, onClickLogout }: Props) {
  return (
    <Card variant="outlined" className="Component-header-container">
      <Avatar
        alt={user?.name}
        src={user?.photoURL}
        className="Component-header-avatar"
      />
      <Typography level="h3" fontSize="md" sx={{ mb: 0.5 }}>
        Hello {user?.name}, Welcome to Pennywise!
      </Typography>

      <div style={{position: "absolute", top: 0, right: 0}}>
        <Button onClick={onClickLogout}>Logout</Button>
      </div>
    </Card>
  );
}
