import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {User} from "../auth/types";
import { ACCEPT_HEADER, ACCEPT_BODY, REJECT_HEADER, REJECT_BODY } from "../emailTemplate/emailTemplate";
import {ReimbursementRead, StatusEnum, updateReimbursement} from "../database/reimbursement";

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
  let color = "red";
  let newState: StatusEnum = "Reject";

  if (approve){
    subject = ACCEPT_HEADER;
    body = ACCEPT_BODY;
    color = "green";
    newState = "Approve";
  }


  return (
    <React.Fragment>
      <Button variant="contained" 
        size="small"
        style={{
            margin: "10px",
            backgroundColor: color
        }}
        onClick={() => {
            window.open(`mailto:${user?.email}?subject=${subject}&body=${body}`);
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
          {"Finish approving and sent email?"}
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