import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { Person } from "@mui/icons-material";
import Typography from "@mui/joy/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArchiveIcon from "@mui/icons-material/Archive";
import Casino from "@mui/icons-material/Casino";
import Box from "@mui/joy/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import {
  ReimbursementRead,
  StatusEnum,
  updateReimbursement,
} from "../database/reimbursement";
import { useEffect, useMemo, useState } from "react";
import { getUser } from "../database";
import { User } from "../auth/types";
import ReimbursementPopupButton from "./ReimbursementPopup";

type Props = {
  reimbursement: ReimbursementRead;
  isTreasurer: boolean;
  onStatusChange?: (docId: string, state: StatusEnum) => void;
};

export default function ReimbursementCard({
  reimbursement,
  isTreasurer,
  onStatusChange,
}: Props) {
  const showApproveButton = reimbursement.state !== "Approve";
  const showRejectButton = reimbursement.state !== "Reject";
  const showReviewButton =
    reimbursement.state === "Approve" || reimbursement.state === "Reject";
  const [isReviewing, setIsReviewing] = useState(false);

  const time = useMemo(() => {
    return reimbursement.purchaseDate.toLocaleString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [reimbursement]);

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    getUser(reimbursement.userid).then(setUser);
  }, [reimbursement]);

  const handleClick = () => {
    if (reimbursement.department) {
      window.open(reimbursement.receiptUrl, "_blank");
    }
  };

  const handleReview = async () => {
    setIsReviewing(true);
    try {
      await updateReimbursement(reimbursement.docId, { state: "Active" });
      onStatusChange?.(reimbursement.docId, "Active");
    } catch (error) {
      console.error("Could not return reimbursement to review", error);
    } finally {
      setIsReviewing(false);
    }
  };

  const handleArchive = async () => {
    setIsReviewing(true);
    try {
      await updateReimbursement(reimbursement.docId, { state: "Archived" });
      onStatusChange?.(reimbursement.docId, "Archived");
    } catch (error) {
      console.error("Could not archive reimbursement", error);
    } finally {
      setIsReviewing(false);
    }
  };

  // console.log(reimbursement.docId);

  return (
    <Card
      className="Component-expense-card-container Component-expense-cover"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <CardContent
        sx={{ justifyContent: "flex-end", cursor: "pointer", pb: 1 }}
        onClick={handleClick}
      >
        <Typography
          level="body2"
          sx={{
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            color: "#67e8f9",
            mb: 0.75,
          }}
        >
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
            flexWrap: "wrap",
          }}
        >
          <Typography startDecorator={<Person />} textColor="neutral.300">
            {user == null ? "..." : user.name}
          </Typography>
          <Typography
            startDecorator={<AccessTimeIcon />}
            textColor="neutral.300"
          >
            {time}
          </Typography>
          <Typography
            startDecorator={<AttachMoneyIcon />}
            textColor="neutral.300"
          >
            {reimbursement.amount}
          </Typography>
          <Typography startDecorator={<Casino />} textColor="neutral.300">
            {reimbursement.state}
          </Typography>
        </Box>
      </CardContent>

      {isTreasurer && reimbursement.state !== "Archived" ? (
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
            <ReimbursementPopupButton
              user={user}
              approve={true}
              reimbursement={reimbursement}
            />
          )}
          {showRejectButton && (
            <ReimbursementPopupButton
              user={user}
              approve={false}
              reimbursement={reimbursement}
            />
          )}
          {showReviewButton && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Button
                variant="outlined"
                size="small"
                disabled={isReviewing}
                onClick={handleReview}
                sx={{ minWidth: 116, borderRadius: 999 }}
              >
                Review
              </Button>
              <IconButton
                aria-label="Archive reimbursement"
                size="small"
                onClick={handleArchive}
                sx={{
                  backgroundColor: "#67e8f9",
                  color: "#0b2238",
                  "&:hover": { backgroundColor: "#a5f3fc" },
                }}
              >
                <ArchiveIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      ) : (
        <></>
      )}
    </Card>
  );
}
