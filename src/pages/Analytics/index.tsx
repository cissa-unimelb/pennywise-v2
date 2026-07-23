import { useEffect, useMemo, useState } from "react";
import {
  approvedReimbursementDepartmentStatistics,
  DepartmentStatistics,
  getSpreadSheetExport,
} from "../../database/analytics";

import styles from "./analytics.module.css";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { PieChart } from "../../components/AnalyticChart";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import { materialTheme } from "../../theme";

/**
 * Fake a csv download by clicking on an <a> tag
 * @param filename Name of file
 * @param blob Data blob
 */
function downloadCSV(filename: string, blob: Blob) {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";

  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
}

const analyticsColumns: GridColDef<DepartmentStatistics>[] = [
  {
    field: "name",
    headerName: "Industry",
    width: 150,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 150,
  },
  {
    field: "totalPrice",
    headerName: "Total Price",
    width: 200,
  },
  {
    field: "highestPrice",
    headerName: "Highest Price",
    width: 200,
  },
];

const surfaceSx = {
  borderRadius: "28px",
  border: "1px solid rgba(103, 232, 249, 0.14)",
  background:
    "linear-gradient(180deg, rgba(11, 18, 32, 0.96), rgba(4, 8, 19, 0.94))",
  boxShadow: "0 24px 80px rgba(2, 8, 23, 0.55)",
  backdropFilter: "blur(18px)",
  color: "#ecfeff",
};

const dataGridSx = {
  minHeight: 420,
  color: "#ecfeff",
  borderColor: "rgba(103, 232, 249, 0.12)",
  backgroundColor: "rgba(2, 8, 23, 0.6)",
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "rgba(8, 145, 178, 0.12)",
    color: "#ecfeff",
    borderBottomColor: "rgba(103, 232, 249, 0.12)",
  },
  "& .MuiDataGrid-cell": {
    borderColor: "rgba(103, 232, 249, 0.08)",
    color: "#ecfeff",
  },
  "& .MuiDataGrid-row": {
    backgroundColor: "transparent",
  },
  "& .MuiDataGrid-row:hover": {
    backgroundColor: "rgba(103, 232, 249, 0.05)",
  },
  "& .MuiDataGrid-footerContainer": {
    borderTopColor: "rgba(103, 232, 249, 0.12)",
    backgroundColor: "rgba(8, 145, 178, 0.08)",
    color: "#a5f3fc",
  },
  "& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
    {
      color: "#a5f3fc",
    },
  "& .MuiSvgIcon-root, & .MuiIconButton-root": {
    color: "#a5f3fc",
  },
  "& .MuiDataGrid-overlay": {
    backgroundColor: "rgba(2, 8, 23, 0.6)",
    color: "#ecfeff",
  },
};

export function Analytics() {
  const [stats, setStats] = useState<Record<string, DepartmentStatistics>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    (async () => {
      setStats(await approvedReimbursementDepartmentStatistics());
    })();
  }, []);

  const generateSpreadSheet = async () => {
    setLoading(true);
    const spreadsheet = await getSpreadSheetExport();
    downloadCSV(
      "reimbursements.csv",
      new Blob([spreadsheet], { type: "text/csv" }),
    );
    setLoading(false);
  };

  const departmentCosts = useMemo(() => {
    const costs: any = {};
    Object.entries(stats).forEach(([name, st]) => {
      costs[name] = st.totalPrice;
    });
    return costs;
  }, [stats]);

  return (
    <ThemeProvider theme={materialTheme}>
      <CssBaseline />
      <div className={styles.page}>
        <div className={styles.pageInner}>
          <Card className={styles.heroCard} sx={surfaceSx}>
            <CardContent>
              <div className={styles.header}>
                <div>
                  <Typography variant="overline" className={styles.kicker}>
                    Treasurer view
                  </Typography>
                  <Typography variant="h3" className={styles.title}>
                    Analytics
                  </Typography>
                  <Typography variant="body1" className={styles.subcopy}>
                    Department based analytics and ability to export into a
                    spreadsheet
                  </Typography>
                </div>
                <Button onClick={handleBack} variant="contained">
                  Back
                </Button>
              </div>
            </CardContent>
          </Card>
          <Box className={styles.actions}>
            <Button
              onClick={generateSpreadSheet}
              variant="contained"
              disabled={loading}
            >
              Generate SpreadSheet
            </Button>
          </Box>

          <div className={styles.content}>
            <div style={{ flex: "2" }}>
              <Card className={styles.contentCard} sx={surfaceSx}>
                <CardContent>
                  <Typography variant="h4" className={styles.sectionTitle}>
                    Approved Reimbursements
                  </Typography>
                  <Typography variant="body2" className={styles.cardNote}>
                    Approved reimbursement data by department
                  </Typography>
                  <br />
                  <DataGrid
                    columns={analyticsColumns}
                    rows={Object.values(stats)}
                    getRowId={(row) => row.name}
                    disableRowSelectionOnClick
                    sx={dataGridSx}
                  />
                </CardContent>
              </Card>
            </div>
            <div style={{ flex: "1" }}>
              <Card className={styles.contentCard} sx={surfaceSx}>
                <CardContent>
                  <PieChart departmentCosts={departmentCosts} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
