import * as React from "react";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";

import Add from "@mui/icons-material/Add";
type Props = {
  link: string;
  title: string;
};
export default function CreateButton({ link, title }: Props) {
  return (
    <Card variant="outlined" className="Component-createbutton-container">
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          background:
            "linear-gradient(135deg, rgba(34, 211, 238, 0.22), rgba(14, 165, 233, 0.08))",
          boxShadow: "0 0 0 8px rgba(34, 211, 238, 0.05)",
        }}
      >
        <Add sx={{ fontSize: 32, color: "#67e8f9" }} />
      </Box>
      <Typography level="h4" sx={{ color: "common.white" }}>
        {title}
      </Typography>

      <Link overlay underline="none" href={link} sx={{ color: "transparent" }}>
        {title}
      </Link>
    </Card>
  );
}
