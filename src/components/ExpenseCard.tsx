import * as React from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Box from "@mui/joy/Box";
type Props = {
  date: string;
  description: string;
  event: string;
  amount: number;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
export default function ExpenseCard({
  date,
  description,
  event,
  amount,
  onClick,
}: Props) {
  return (
    <Card
      sx={{
        minHeight: 150,
        flex: 1,
        "&:hover": {
          boxShadow: "sm",
          borderColor: "neutral.outlinedHoverBorder",
        },
      }}
      //   onClick={onClick}
    >
      <CardCover>
        <img
          src="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320"
          srcSet="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
        }}
      />
      <CardContent sx={{ justifyContent: "flex-end" }}>
        <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
          {event}
        </Typography>
        <Box
          style={{
            flexDirection: "row",
          }}
        >
          <Typography
            startDecorator={<AccessTimeIcon />}
            textColor="neutral.300"
          >
            {date}
          </Typography>
          <Typography
            startDecorator={<AttachMoneyIcon />}
            textColor="neutral.300"
          >
            {amount}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
