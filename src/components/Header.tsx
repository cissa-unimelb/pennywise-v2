import * as React from "react";
import type { User } from "../auth/types";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Avatar from "@mui/joy/Avatar";
type Props = {
  user: User | undefined;
};
export function Header({ user }: Props) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "80%",
        height: 50,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 5,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar
          alt={user?.name}
          src={user?.photoURL}
          style={{
            marginRight: 15,
          }}
        />
        <Typography level="h3" fontSize="md" sx={{ mb: 0.5 }}>
          Hello {user?.name}, Welcome to PennyWise!
        </Typography>
      </div>
      <Button color="danger" onClick={function () {}} variant="soft">
        Logout
      </Button>
    </Card>
  );
}
