import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {Person} from "@mui/icons-material";
import Typography from "@mui/joy/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Casino from "@mui/icons-material/Casino";
import Box from "@mui/joy/Box";

import {ReimbursementRead} from "../database/reimbursement";
import {useEffect, useMemo, useState} from "react";
import {getUser} from "../database";
import {User} from "../auth/types";
import ReimbursementPopupButton from "./ReimbursementPopup";


type Props = {
  reimbursement: ReimbursementRead,
  isTreasurer: boolean
};

export default function ReimbursementCard(
  {
    reimbursement,
    isTreasurer
  }: Props) {

  const showApproveButton = reimbursement.state !== "Approve";
  const showRejectButton = reimbursement.state !== "Reject";

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

  const handleClick = () => {
    if (reimbursement.department) {
      window.open(reimbursement.receiptUrl, '_blank');
    }
  }

  // console.log(reimbursement.docId);

  return (
    <Card
      className="Component-expense-card-container Component-expense-cover"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <CardContent sx={{justifyContent: "flex-end", cursor: 'pointer', pb: 1}}
                   onClick={handleClick}>
        <Typography level="body2" sx={{textTransform: "uppercase", letterSpacing: "0.16em", color: "#67e8f9", mb: 0.75}}>
          {reimbursement.department || "Unspecified"}
        </Typography>
        <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
          {reimbursement.event}
        </Typography>
        <Box
          style={{
            flexDirection: "row",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
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
          <Typography
            startDecorator={<Casino/>}
            textColor="neutral.300"
          >
            {reimbursement.state}
          </Typography>
        </Box>
      </CardContent>

      {isTreasurer?
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            justifyContent: "flex-end",
            px: 2,
            pt: 1.5,
            pb: 1,
            mt: "auto",
          }}
        >
          {showApproveButton && (
            <ReimbursementPopupButton user={user} approve={true} reimbursement={reimbursement}/>
          )}
          {showRejectButton && (
            <ReimbursementPopupButton user={user} approve={false} reimbursement={reimbursement}/>
          )}
        </Box>
      : <></>}
    </Card>
  );
}
