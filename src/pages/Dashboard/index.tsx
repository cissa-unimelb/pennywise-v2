import { useUserStore } from "../../stores/user";
import { Header } from "../../components/Header";
import ExpenseCard from "../../components/ExpenseCard";
import Box from "@mui/material/Box";
import Grid from "@mui/joy/Grid";
import CreateButton from "../../components/CreateButton";
import { useNavigate } from "react-router-dom";
import { BankForm } from "../../components/BankForm";
import {useEffect, useState} from "react";
import {getActiveReimbursement, Reimbursement} from "../../database/reimbursement";
import ReimbursementCard from "../../components/ReimbursementCard";

export default function Dashboard() {
  const { value } = useUserStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("logout");
    navigate("/login");
  };

  const [reimbursement, setReimbursement] = useState<Reimbursement[]>([]);

  useEffect(() => {
    getActiveReimbursement()
      .then(setReimbursement);
  }, []);

  return (
    <>
      <div className="App-master-container">
        <Header user={value} onClickLogout={() => handleLogout()} />
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
              reimbursement.map(reim => (
                <Grid xs={12} md={3}>
                  <ReimbursementCard reimbursement={reim} />
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
