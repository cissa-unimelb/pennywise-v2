import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {User} from "../auth/types";
import { ACCEPT_HEADER, ACCEPT_BODY, REJECT_HEADER, REJECT_BODY } from "../emailTemplate/emailTemplate";
import {EXEC_EMAILS} from "../emailTemplate/execEmails";
import {ReimbursementRead, StatusEnum, updateReimbursement} from "../database/reimbursement";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import HighlightOff from "@mui/icons-material/HighlightOff";

type ReimbursementPopupProps = {
    reimbursement: ReimbursementRead,
    user: User|null,
    approve: Boolean
}

export default function ReimbursementPopupButton(props: ReimbursementPopupProps) {
  const [open, setOpen] = React.useState(false);
  const user = props.user;
  const approve = props.approve;
  const reimbursement = props.reimbursement;

  let subject = REJECT_HEADER;
  let body = REJECT_BODY;
  let color: "success" | "error" = "error";
  let newState: StatusEnum = "Reject";
  let icon = <HighlightOff fontSize="small" />;

  if (approve){
    subject = ACCEPT_HEADER;
    body = ACCEPT_BODY;
    color = "success";
    newState = "Approve";
    icon = <CheckCircleOutline fontSize="small" />;
  }

  let mailTo = `${user?.email},`;
  mailTo += EXEC_EMAILS.join(',');


  return (
    <React.Fragment>
      <Button variant="contained" 
        size="small"
        color={color}
        startIcon={icon}
        sx={{
            minWidth: 116,
            borderRadius: 999,
            boxShadow: "0 12px 32px rgba(2, 8, 23, 0.3)"
        }}
        onClick={() => {
            window.open(`mailto:${mailTo}?subject=${subject}&body=${encodeURIComponent(body)}`);
            setOpen(true);
        }}>

        <b>{ approve ? "Approve": "Reject"}</b>
    
      </Button>
      <Dialog
        open={open}
        onClose={() => {
            setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {approve ? "Finish approval and send email?" : "Finish rejection and send email?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Click update to finalize change in reimbursement status
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={async () => {
            await updateReimbursement(reimbursement.docId, {state: newState})
            setOpen(false);
          }} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
