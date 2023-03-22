import { useUserStore } from "../../stores/user";
import { Header } from "../../components/Header";
import ExpenseCard from "../../components/ExpenseCard";
import Box from "@mui/material/Box";
import Grid from "@mui/joy/Grid";
import CreateButton from "../../components/CreateButton";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const { value } = useUserStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("logout");
    navigate("/login");
  };

  return (
    <>
      <div className="App-master-container">
        <Header user={value} onClickLogout={() => handleLogout()} />
        <Box className="App-dashboard-container">
          <Grid container spacing={2}>
            <Grid xs={12} md={3}>
              <CreateButton></CreateButton>
            </Grid>
            <Grid xs={12} md={3}>
              <ExpenseCard
                event="Industry Connect"
                amount={100}
                date="2021-10-10"
                description="Annual Industry Connect"
                onClick={() => {}}
              />
            </Grid>
            <Grid xs={12} md={3}>
              <ExpenseCard
                event="Industry Connect"
                amount={100}
                date="2021-10-10"
                description="Annual Industry Connect"
                onClick={() => {}}
              />
            </Grid>
            <Grid xs={12} md={3}>
              <ExpenseCard
                event="Industry Connect"
                amount={100}
                date="2021-10-10"
                description="Annual Industry Connect"
                onClick={() => {}}
              />
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
