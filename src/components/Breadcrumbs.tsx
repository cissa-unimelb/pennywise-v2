import * as React from "react";
import { default as MBreadcrumb } from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

export default function Breadcrumbs() {
  return (
    <MBreadcrumb aria-label="breadcrumbs">
      {["PennyWise", "Dashboard"].map((item: string) => (
        <Link
          // `preventDefault` is for demo purposes
          // and is generally not needed in your app
          onClick={(event) => event.preventDefault()}
          key={item}
          underline="hover"
          color="neutral"
          fontSize="inherit"
          href="/"
        >
          {item}
        </Link>
      ))}
    </MBreadcrumb>
  );
}
