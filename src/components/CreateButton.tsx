import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";

import Add from "@mui/icons-material/Add";
export default function CreateButton() {
  return (
    <Card variant="outlined" className="Component-createbutton-container">
      <Add />
      <Link
        overlay
        underline="none"
        href="#interactive-card"
        sx={{ color: "text.tertiary" }}
      >
        Add expenses
      </Link>
    </Card>
  );
}
