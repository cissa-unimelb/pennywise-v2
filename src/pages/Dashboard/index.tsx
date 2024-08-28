import {UserContext} from "../../stores/user";
import { Header } from "../../components/Header";
import Box from "@mui/material/Box";
import Grid from "@mui/joy/Grid";
import CreateButton from "../../components/CreateButton";
import { useNavigate } from "react-router-dom";
import { BankForm } from "../../components/BankForm";
import {useContext, useEffect, useState} from "react";
import {getActiveReimbursement, getMyReimbursement, ReimbursementRead} from "../../database/reimbursement";
import ReimbursementCard from "../../components/ReimbursementCard";
import {createUser} from "../../auth/types";
import {logoutSession} from "../../auth/session";

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
          <Grid container spacing={2}>
            <Grid xs={12} md={3}>
              <CreateButton
                link="#/invoice"
                title="Create invoice"
              ></CreateButton>
            </Grid>
            <Grid xs={12} md={3}>
              <CreateButton
                link="#/reimbursement"
                title="Create reimbursement"
              ></CreateButton>
            </Grid>
            {
              reimbursement.map((reim, i) => (
                <Grid xs={12} md={3} key={i}>
                  <ReimbursementCard reimbursement={reim} isTreasurer={user.isTreasurer}/>
                </Grid>
              ))
            }

          </Grid>
        </Box>
        <BankForm />
      </div>
    </>
  );
}
