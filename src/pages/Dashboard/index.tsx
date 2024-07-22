import { useUserStore } from "../../stores/user";
import { Header } from "../../components/Header";
import Box from "@mui/material/Box";
import Grid from "@mui/joy/Grid";
import CreateButton from "../../components/CreateButton";
import { useNavigate } from "react-router-dom";
import { BankForm } from "../../components/BankForm";
import {useEffect, useState} from "react";
import {getActiveReimbursement, getMyReimbursement, Reimbursement} from "../../database/reimbursement";
import ReimbursementCard from "../../components/ReimbursementCard";
import {createUser, User} from "../../auth/types";
import {logoutSession} from "../../auth/session";

export default function Dashboard() {
  const { value, setUserStore } = useUserStore();
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

  const [reimbursement, setReimbursement] = useState<Reimbursement[]>([]);

  useEffect(() => {
    const user: User = value;
    if (user.isTreasurer) {
      getActiveReimbursement()
        .then(setReimbursement);
    } else {
      getMyReimbursement(user)
        .then(setReimbursement);
    }
  }, [value]);

  return (
    <>
      <div className="App-master-container">
        <Header user={value} onLogout={handleLogout} onAnalytics={handleAnalytics}/>
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
                  <ReimbursementCard reimbursement={reim} isTreasurer={value.isTreasurer}/>
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
