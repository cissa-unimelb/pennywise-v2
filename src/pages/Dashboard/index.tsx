import { useUserStore } from "../../stores/user";
import { Header } from "../../components/Header";
import ExpenseCard from "../../components/ExpenseCard";
import Box from "@mui/material/Box";
import Grid from "@mui/joy/Grid";
import CreateButton from "../../components/CreateButton";
import { useNavigate } from "react-router-dom";
import { BankForm } from "../../components/BankForm";
import {useEffect, useState} from "react";
import {getActiveReimbursement, getMyReimbursement, Reimbursement} from "../../database/reimbursement";
import ReimbursementCard from "../../components/ReimbursementCard";
import {User} from "../../auth/types";

export default function Dashboard() {
  const { value } = useUserStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("logout");
    navigate("/login");
  };

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
              reimbursement.map((reim, i) => (
                <Grid xs={12} md={3} key={i}>
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
