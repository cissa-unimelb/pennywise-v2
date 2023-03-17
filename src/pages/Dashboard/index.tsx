import { useUserStore } from "../../stores/user";
import { Header } from "../../components/Header";
import { useTheme } from "@mui/joy/styles";
import Breadcrumbs from "../../components/Breadcrumbs";
import ExpenseCard from "../../components/ExpenseCard";
import Box from "@mui/material/Box";
import Grid from "@mui/joy/Grid";
import Button from "@mui/joy/Button";
import ThumbUp from "@mui/icons-material/ThumbUp";
import CreateButton from "../../components/CreateButton";
import SideMenu from "../../components/SideMenu";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
export default function Dashboard() {
  const { value } = useUserStore();
  const theme = useTheme();
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("logout");
    navigate("/login");
  };

  const Test = styled.div`
    display: flex;
    flex-direction: row;
  `;

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
          height: "100vh",
          padding: 30,
          backgroundColor: theme.palette.background.level1,
        }}
      >
        <Header user={value} onClickLogout={() => handleLogout()} />
        <Test />
        <Box
          style={{
            marginTop: 30,
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "80%",
          }}
        >
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
