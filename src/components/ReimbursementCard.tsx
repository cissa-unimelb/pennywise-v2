import * as React from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Box from "@mui/joy/Box";
import {Reimbursement} from "../database/reimbursement";
import {useEffect, useMemo, useState} from "react";
import {getUser} from "../database";
import {User} from "../auth/types";
import {Person, SupervisedUserCircle, VerifiedUserOutlined} from "@mui/icons-material";

type Props = {
  reimbursement: Reimbursement
};

export default function ReimbursementCard(
  {
    reimbursement
  }: Props) {


  const time = useMemo(() => {
    return reimbursement.purchaseDate.toLocaleString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, [reimbursement]);

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    getUser(reimbursement.userid)
      .then(setUser)
  }, [reimbursement]);

  return (
    <Card className="Component-expense-card-container">
      <CardCover>
        <img
          src="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320"
          srcSet="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover className="Component-expense-cover"/>
      <CardContent sx={{justifyContent: "flex-end"}}>
        <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
          {reimbursement.event}
        </Typography>
        <Box
          style={{
            flexDirection: "row",
          }}
        >
          <Typography
            startDecorator={<Person/>}
            textColor="neutral.300"
          >
            {user == null ? "..." : user.name}
          </Typography>
          <Typography
            startDecorator={<AccessTimeIcon/>}
            textColor="neutral.300"
          >
            {time}
          </Typography>
          <Typography
            startDecorator={<AttachMoneyIcon/>}
            textColor="neutral.300"
          >
            {reimbursement.amount}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
