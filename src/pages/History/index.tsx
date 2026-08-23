import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../database";
import {
  getArchivedReimbursements,
  ReimbursementRead,
} from "../../database/reimbursement";
import { UserContext } from "../../stores/user";

type HistoryRow = {
  id: string;
  department: string;
  event: string;
  user: string;
  purchaseDate: string;
  amount: string;
  state: string;
  receiptUrl: string;
};

const columns: GridColDef<HistoryRow>[] = [
  { field: "department", headerName: "Department", minWidth: 130, flex: 1 },
  { field: "event", headerName: "Event", minWidth: 180, flex: 1.5 },
  { field: "user", headerName: "Submitted by", minWidth: 170, flex: 1.25 },
  {
    field: "purchaseDate",
    headerName: "Purchase date",
    minWidth: 180,
    flex: 1.25,
  },
  { field: "amount", headerName: "Amount", minWidth: 110, flex: 0.75 },
  { field: "state", headerName: "Status", minWidth: 110, flex: 0.75 },
];

function formatPurchaseDate(reimbursement: ReimbursementRead) {
  return reimbursement.purchaseDate.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function History() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [rows, setRows] = useState<HistoryRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;

    const loadHistory = async () => {
      setLoading(true);
      try {
        const reimbursements = await getArchivedReimbursements(user);
        const rowsWithUsers = await Promise.all(
          reimbursements.map(async (reimbursement) => {
            const submittingUser = await getUser(reimbursement.userid);

            return {
              id: reimbursement.docId,
              department: reimbursement.department || "Unspecified",
              event: reimbursement.event,
              user: submittingUser?.name || "Unknown",
              purchaseDate: formatPurchaseDate(reimbursement),
              amount: reimbursement.amount,
              state: reimbursement.state,
              receiptUrl: reimbursement.receiptUrl,
            };
          }),
        );

        if (isCurrent) {
          setRows(rowsWithUsers);
        }
      } catch (error) {
        console.error("Could not load reimbursement history", error);
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    };

    loadHistory();

    return () => {
      isCurrent = false;
    };
  }, [user]);

  return (
    <Box sx={{ maxWidth: 1280, mx: "auto", px: { xs: 2, md: 4 }, py: 4 }}>
      <Card
        sx={{ backgroundColor: "#0b2238", borderRadius: "28px", color: "#fff" }}
      >
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="overline" color="primary">
                PennyWise
              </Typography>
              <Typography variant="h4" color="#fff">
                Reimbursement history
              </Typography>
            </Box>
            <Button onClick={() => navigate("/dashboard")} variant="outlined">
              Back to dashboard
            </Button>
          </Box>
          <Box sx={{ height: 620, width: "100%" }}>
            <DataGrid
              columns={columns}
              rows={rows}
              loading={loading}
              disableRowSelectionOnClick
              onRowClick={({ row }) => window.open(row.receiptUrl, "_blank")}
              pageSizeOptions={[10, 25, 50]}
              sx={{
                backgroundColor: "#0b2238",
                borderColor: "rgba(103, 232, 249, 0.25)",
                color: "#fff",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#061a2b",
                  color: "#fff",
                  borderBottomColor: "rgba(103, 232, 249, 0.25)",
                },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "#061a2b",
                },
                "& .MuiDataGrid-cell": {
                  color: "#fff",
                  borderColor: "rgba(103, 232, 249, 0.12)",
                },
                "& .MuiDataGrid-row": {
                  cursor: "pointer",
                },
                "& .MuiDataGrid-footerContainer": {
                  color: "#fff",
                  borderTopColor: "rgba(103, 232, 249, 0.25)",
                },
                "& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows, & .MuiSvgIcon-root":
                  {
                    color: "#fff",
                  },
              }}
              initialState={{
                pagination: { paginationModel: { page: 0, pageSize: 10 } },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
