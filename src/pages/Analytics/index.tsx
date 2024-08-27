import {useEffect, useMemo, useState} from "react";
import {
  activeReimbursementDepartmentStatistics,
  DepartmentStatistics,
  getSpreadSheetExport
} from "../../database/analytics";

import styles from './analytics.module.css';
import {useNavigate} from "react-router-dom";
import {DataGrid, GridColDef} from '@mui/x-data-grid';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


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
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  }

  useEffect(() => {
    (async () => {
      setStats(await activeReimbursementDepartmentStatistics());
    })();
  }, []);

  const generateSpreadSheet = async () => {
    // TODO: add a loading indicator
    const spreadsheet = await getSpreadSheetExport();
    downloadCSV('reimbursements.csv', new Blob([spreadsheet], {type: 'text/csv'}));
  };

  return <div className={styles.page}>
    <Card>
      <CardContent>
        <div className={styles.header}>
          <Typography variant="h3">Analytics</Typography>
          <Button onClick={handleBack} variant="contained">Back</Button>
        </div>
      </CardContent>
    </Card>
    <br/>

    <div>
      <Button onClick={generateSpreadSheet} variant="contained">Generate SpreadSheet</Button>
    </div>
    <br/>

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
}