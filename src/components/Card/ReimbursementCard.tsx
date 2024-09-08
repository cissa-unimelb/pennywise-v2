import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import {Person} from "@mui/icons-material";
import Typography from "@mui/joy/Typography";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Casino from "@mui/icons-material/Casino";
import Box from "@mui/joy/Box";

import {ReimbursementRead} from "../../database/reimbursement";
import {useEffect, useMemo, useState} from "react";
import {getUser} from "../../database";
import {User} from "../../auth/types";
import ReimbursementPopupButton from "./ReimbursementPopup";
import { KanbanCardProps } from "./KanbanCardProps";



export default function ReimbursementCard(
  {
    info,
    isTreasurer,
    isAuthorizer
  }: KanbanCardProps) {

  
  const reimbursementInfo = info as ReimbursementRead;


  const time = useMemo(() => {
    return (reimbursementInfo.purchaseDate as Date).toLocaleString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, [reimbursementInfo]);

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    getUser(reimbursementInfo.userid)
      .then(setUser)
  }, [reimbursementInfo]);

  const handleClick = () => {
    if (reimbursementInfo.department) {
      window.open(reimbursementInfo.receiptUrl, '_blank');
    }
  }

  // console.log(reimbursementInfo.docId);

  return (
    <Card className="Component-expense-card-container" sx={{backgroundColor: "black"}}>
      
      {isTreasurer?
        <div>
          <ReimbursementPopupButton user={user} status={"Approve"} reimbursement={reimbursementInfo}/>
          <ReimbursementPopupButton user={user} status={"Reject"} reimbursement={reimbursementInfo}/>
        </div>
      : <></>}

      {reimbursementInfo.status === "Approve" && isAuthorizer?
        <div>
          <ReimbursementPopupButton user={user} status={"Paid"} reimbursement={reimbursementInfo}/>
        </div>
        :<></>
      }

      <CardContent sx={{justifyContent: "flex-end", cursor: 'pointer'}}
                   onClick={handleClick}>
        <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
          {reimbursementInfo.event} | {reimbursementInfo.department || "unspecified"}
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
            {reimbursementInfo.amount}
          </Typography>
          <Typography
            startDecorator={<Casino/>}
            textColor="neutral.300"
          >
            {reimbursementInfo.status}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
