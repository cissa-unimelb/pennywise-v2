import * as React from "react";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";

import Add from "@mui/icons-material/Add";

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function CreateButton({
  onClick,
}: Props) {
  return (
    <Card variant="outlined" className="Component-createbutton-container">
      <Add />
      <span
        // overlay
        // underline="none"
        onClick = {onClick}
        // sx={{ color: "text.tertiary" }}
      >
        Add expenses
      </span>
    </Card>
  );
}
