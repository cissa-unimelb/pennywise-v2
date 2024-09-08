import {UserContext} from "../../stores/user";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import CreateButton from "../../components/CreateButton";
import { BankForm } from "../../components/BankForm";
import {useContext, useEffect, useState} from "react";
import {getAllReimbursement, getMyReimbursement, ReimbursementRead} from "../../database/reimbursement";
import { KanbanBoard } from "../../components/KanbanBoard";
import ReimbursementCard from "../../components/Card/ReimbursementCard";

// TODO: Update Grid to Grid2. Check why can't import it.

export default function Dashboard() {
  const { user, setUser: setUserStore } = useContext(UserContext);
  const [reimbursement, setReimbursement] = useState<ReimbursementRead[]>([]);

  useEffect(() => {
    if (user.isTreasurer) {
      getAllReimbursement()
        .then(setReimbursement);
    } else {
      getMyReimbursement(user)
        .then(setReimbursement);
    }
  }, [user]);

  return (
    <>
      <div className="App-master-container">
        <Box className="App-dashboard-container">
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <CreateButton
                link="#/reimbursement"
                title="Create reimbursement"
              ></CreateButton>
            </Grid>
          </Grid>
          <KanbanBoard user={user} statusContainers={reimbursement}  Card={ReimbursementCard}/>
        </Box>
        <BankForm />
      </div>
    </>
  );
}
