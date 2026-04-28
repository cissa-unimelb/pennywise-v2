import { UserContext } from "../../stores/user";
import { Header } from "../../components/Header";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CreateButton from "../../components/CreateButton";
import { useNavigate } from "react-router-dom";
import { BankForm } from "../../components/BankForm";
import { useContext, useEffect, useState } from "react";
import {
  getAllReimbursement,
  getMyReimbursement,
  ReimbursementRead,
} from "../../database/reimbursement";
import { createUser } from "../../auth/types";
import { logoutSession } from "../../auth/session";
import { KanbanBoard } from "./kanbanBoard";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";

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
  };

  const [reimbursement, setReimbursement] = useState<ReimbursementRead[]>([]);

  useEffect(() => {
    if (user.isTreasurer) {
      getAllReimbursement().then(setReimbursement);
    } else {
      getMyReimbursement(user).then(setReimbursement);
    }
  }, [user]);

  return (
    <>
      <div className="App-master-container">
        <Header
          user={user}
          onLogout={handleLogout}
          onAnalytics={handleAnalytics}
        />
        <Box className="App-dashboard-container">
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <Card
                variant="outlined"
                className="app-shell-card"
                sx={{ p: 3, borderRadius: "28px", width: "100%" }}
              >
                <Typography
                  level="body2"
                  sx={{
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: "primary.300",
                    mb: 1,
                  }}
                >
                  Quick actions
                </Typography>
                <Typography
                  level="h2"
                  sx={{
                    fontSize: { xs: "1.5rem", md: "2rem" },
                    mb: 0.75,
                    color: "#fff",
                  }}
                >
                  Start a finance request.
                </Typography>
              </Card>
            </Grid>
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
        </Box>
        <KanbanBoard user={user} reimbursement={reimbursement} />
        <BankForm />
      </div>
    </>
  );
}
