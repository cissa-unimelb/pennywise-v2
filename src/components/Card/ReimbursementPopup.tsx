import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {User} from "../../auth/types";
import { ACCEPT_HEADER, ACCEPT_BODY, REJECT_HEADER, REJECT_BODY, PAID_HEADER, PAID_BODY, PAYMENT_PENDING_HEADER, PAYMENT_PENDING_BODY } from "../../emailTemplate/emailTemplate";
import {EXEC_EMAILS} from "../../emailTemplate/execEmails";
import {ReimbursementRead, StatusEnum, updateReimbursement} from "../../database/reimbursement";

type ReimbursementPopupProps = {
    reimbursement: ReimbursementRead,
    user: User|null,
    status: StatusEnum
}

export default function ReimbursementPopupButton(props: ReimbursementPopupProps) {
  const [open, setOpen] = React.useState(false);
  const user = props.user;
  const status = props.status;
  const reimbursement = props.reimbursement;

  let subject = REJECT_HEADER;
  let body = REJECT_BODY;
  let color = "red";

  if (status === "Approve"){
    subject = ACCEPT_HEADER;
    body = ACCEPT_BODY;
    color = "green";
  } else if (status === "Paid"){
    subject = PAID_HEADER;
    body = PAID_BODY;
    color = "blue";
  }

  let mailTo = `${user?.email},`;
  mailTo += EXEC_EMAILS.join(',');


  return (
    <React.Fragment>
      <Button variant="contained" 
        size="small"
        style={{
            margin: "10px",
            backgroundColor: color
        }}
        onClick={() => {
            window.open(`mailto:${mailTo}?subject=${subject}&body=${encodeURIComponent(body)}`);
            setOpen(true);
        }}>

        <b>{status}</b>
    
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
          {"Finish approving and sent email?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Click update to finalize change in reimbursement status.
            Click send reminders to remind executives (if any).
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            status === "Approve" ?
            <Button onClick={async () => {
              window.open(`mailto:${EXEC_EMAILS}?subject=${PAYMENT_PENDING_HEADER}&body=${encodeURI(PAYMENT_PENDING_BODY)}`)
            }} autoFocus>
              Send reminder
            </Button>
            :<></>
          }
          
          <Button onClick={async () => {
            await updateReimbursement(reimbursement.docId, {status: status})
            setOpen(false);
          }} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}