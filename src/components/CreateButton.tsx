import * as React from "react";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";

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
