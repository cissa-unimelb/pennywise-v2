import {UserContext} from "../../stores/user";
import { Header } from "../../components/Header";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import CreateButton from "../../components/CreateButton";
import { useNavigate } from "react-router-dom";
import { BankForm } from "../../components/BankForm";
import {useContext, useEffect, useState} from "react";
import {getActiveReimbursement, getMyReimbursement, ReimbursementRead} from "../../database/reimbursement";
import ReimbursementCard from "../../components/ReimbursementCard";
import {createUser} from "../../auth/types";
import {logoutSession} from "../../auth/session";

// TODO: Update Grid to Grid2. Check why can't import it.

export default function Dashboard() {
  const { user, setUser: setUserStore } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("logout");

    setUserStore(createUser(null));
    await logoutSession();
    navigate("/login");
  };

  const handleAnalytics = () => {
    navigate("/analytics");
  }

  const [reimbursement, setReimbursement] = useState<ReimbursementRead[]>([]);

  useEffect(() => {
    if (user.isTreasurer) {
      getActiveReimbursement()
        .then(setReimbursement);
    } else {
      getMyReimbursement(user)
        .then(setReimbursement);
    }
  }, [user]);

  return (
    <>
      <div className="App-master-container">
        <Header user={user} onLogout={handleLogout} onAnalytics={handleAnalytics}/>
        <Box className="App-dashboard-container">
          <Grid container spacing={4}>
            <Grid item container spacing={2}>
              <Grid item xs={12} md={3}>
                <CreateButton
                  link="#/invoice"
                  title="Create invoice"
                ></CreateButton>
              </Grid>
              <Grid item xs={12} md={3}>
                <CreateButton
                  link="#/reimbursement"
                  title="Create reimbursement"
                ></CreateButton>
              </Grid>
            </Grid>

            <Grid item container spacing={2}>
              <Grid container xs={4} rowSpacing={4} spacing={2}>
                {
                  reimbursement.map((reim, i) => (
                    <Grid item xs={12} key={i}>
                      <ReimbursementCard reimbursement={reim} isTreasurer={user.isTreasurer}/>
                    </Grid>
                  ))
                }
              </Grid>
              <Grid container xs={4}></Grid>
              <Grid container xs={4}></Grid>
            </Grid>
          </Grid>
        </Box>
        <BankForm />
      </div>
    </>
  );
}
