import { Box, Grid } from "@mui/material";
import { ReimbursementRead } from "../../database/reimbursement";
import ReimbursementCard from "../../components/ReimbursementCard";
import { User } from "../../auth/types";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";

type KanbanBoardProps = {
  reimbursement: ReimbursementRead[];
  user: User;
};

export function KanbanBoard(props: KanbanBoardProps) {
  const reimbursement = props.reimbursement;
  const user = props.user;

  let active: ReimbursementRead[] = [];
  let approve: ReimbursementRead[] = [];
  let reject: ReimbursementRead[] = [];

  reimbursement.map((reim, i) => {
    if (reim.state === "Active") {
      active.push(reim);
    } else if (reim.state === "Approve") {
      approve.push(reim);
    } else if (reim.state === "Reject") {
      reject.push(reim);
    }
    return null;
  });

  return (
    <Box
      className="App-dashboard-container"
      sx={{ marginTop: { xs: 1, md: 3 }, marginBottom: { xs: 4, md: 8 } }}
    >
      <Grid container spacing={2.5}>
        {[
          { title: "Active", items: active, note: "Awaiting review" },
          { title: "Approve", items: approve, note: "Completed approvals" },
          { title: "Reject", items: reject, note: "Returned requests" },
        ].map((column) => (
          <Grid item xs={12} md={4} key={column.title}>
            <Card
              variant="outlined"
              className="app-shell-card"
              sx={{
                p: 2.25,
                borderRadius: "28px",
                minHeight: 780,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                  mb: 2,
                }}
              >
                <div>
                  <Typography
                    level="h4"
                    sx={{ fontSize: "1.35rem", color: "#fff" }}
                  >
                    {column.title}
                  </Typography>
                  <Typography level="body2" sx={{ color: "neutral.400" }}>
                    {column.note}
                  </Typography>
                </div>
                <span className="app-stat-chip">{column.items.length}</span>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  pr: 0.5,
                  overflowY: "auto",
                  scrollbarWidth: "thin",
                }}
              >
                {column.items.length === 0 && (
                  <Box
                    sx={{
                      minHeight: 180,
                      borderRadius: "22px",
                      border: "1px dashed rgba(103, 232, 249, 0.18)",
                      display: "grid",
                      placeItems: "center",
                      color: "#fff",
                    }}
                  >
                    No reimbursements in this column.
                  </Box>
                )}
                {column.items.map((reim, i) => (
                  <div className="Component-kanban-card-row" key={i}>
                    <ReimbursementCard
                      reimbursement={reim}
                      isTreasurer={user.isTreasurer}
                    />
                  </div>
                ))}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
