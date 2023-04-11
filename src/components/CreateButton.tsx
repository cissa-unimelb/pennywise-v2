import * as React from "react";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";

import Add from "@mui/icons-material/Add";

interface Props {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function CreateButton({
  onClick,
}: Props) {
  return (
    <div onClick={onClick}>
      <Card variant="outlined" className="Component-createbutton-container">
        <Add />
        <span
          // overlay
          // underline="none"
          
          // sx={{ color: "text.tertiary" }}
        >
          Add expenses
        </span>
      </Card>
    </div>

  );
}
