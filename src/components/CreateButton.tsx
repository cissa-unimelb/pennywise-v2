import * as React from "react";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";

import Add from "@mui/icons-material/Add";
type Props = {
  link: string;
  title: string;
};
export default function CreateButton({ link, title }: Props) {
  return (
    <Card variant="outlined" className="Component-createbutton-container">
      <Add />
      <Link
        overlay
        underline="none"
        href={link}
        sx={{ color: "text.tertiary" }}
      >
        {title}
      </Link>
    </Card>
  );
}
