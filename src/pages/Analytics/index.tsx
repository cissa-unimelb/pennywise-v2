import {useEffect, useMemo, useState} from "react";
import {
  activeReimbursementDepartmentStatistics,
  DepartmentStatistics,
  getSpreadSheetExport, getSpreadSheetExportInvoices
} from "../../database/analytics";

import styles from './analytics.module.css';
import {DataGrid, GridColDef} from '@mui/x-data-grid';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {BarChart, PieChart} from "../../components/AnalyticChart";
import {ButtonGroup} from "@mui/material";


/**
 * Fake a csv download by clicking on an <a> tag
 * @param filename Name of file
 * @param blob Data blob
 */
function downloadCSV(filename: string, blob: Blob) {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';

  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
}

const analyticsColumns: GridColDef<DepartmentStatistics>[] = [
  {
    field: 'name',
    headerName: 'Industry',
    width: 150
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 150
  },
  {
    field: 'totalPrice',
    headerName: 'Total Price',
    width: 200,
  },
  {
    field: 'highestPrice',
    headerName: 'Highest Price',
    width: 200,
  }
];

export function Analytics() {
  const [stats, setStats] = useState<Record<string, DepartmentStatistics>>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setStats(await activeReimbursementDepartmentStatistics());
    })();
  }, []);

  const generateSpreadSheet = async () => {
    setLoading(true);
    const spreadsheet = await getSpreadSheetExport();
    downloadCSV('reimbursements.csv', new Blob([spreadsheet], {type: 'text/csv'}));
    setLoading(false);
  };

  const generateSpreadSheetInvoices = async () => {
    setLoading(true);
    const spreadsheet = await getSpreadSheetExportInvoices();
    downloadCSV('invoices.csv', new Blob([spreadsheet], {type: 'text/csv'}));
    setLoading(false);
  };

  const departmentCosts = useMemo(()=> {
    const costs: any = {};
    Object.entries(stats).forEach(([name, st]) => {
      costs[name] = st.totalPrice;
    })
    return costs;
  }, [stats]);

  return <div className={styles.page}>
    <div>
      <Typography variant="h6">Generate Spreadsheets</Typography>
      <ButtonGroup>
        <Button onClick={generateSpreadSheet} variant="contained" disabled={loading}>
          Reimbursement
        </Button>
        <br/>
        <Button onClick={generateSpreadSheetInvoices} variant="contained" disabled={loading}>
          Invoice
        </Button>
      </ButtonGroup>
    </div>
    <br/>

    <div className={styles.content}>
      <div style={{flex: '2'}}>
        <Card>
          <CardContent>
            <Typography variant="h4">Active Reimbursements</Typography>
            <br/>
            <DataGrid columns={analyticsColumns}
                      rows={Object.values(stats)}
                      getRowId={row => row.name}
                      disableRowSelectionOnClick/>
          </CardContent>
        </Card>
      </div>
      <div style={{flex: '1'}}>
        <Card>
          <CardContent>
            <PieChart departmentCosts={departmentCosts}/>
            <BarChart/>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
}