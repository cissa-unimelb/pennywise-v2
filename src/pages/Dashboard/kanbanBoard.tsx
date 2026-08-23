import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  DepartmentEnum,
  ReimbursementRead,
  StatusEnum,
} from "../../database/reimbursement";
import ReimbursementCard from "../../components/ReimbursementCard";
import { User } from "../../auth/types";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { useState } from "react";

const ALL_DEPARTMENTS: DepartmentEnum[] = [
  "IT",
  "Events",
  "Competition",
  "Education",
  "Industry",
  "Project",
  "Diversity",
  "Publicity",
  "Product",
];

const FILTER_OPTIONS = [
  { value: "department", label: "Department" },
  { value: "date", label: "From date" },
  { value: "amount", label: "Min amount" },
] as const;

type KanbanStatus = Exclude<StatusEnum, "Archived">;

const COLUMN_DETAILS: Array<{ title: KanbanStatus; note: string }> = [
  { title: "Active", note: "Awaiting review" },
  { title: "Approve", note: "Completed approvals" },
  { title: "Reject", note: "Returned requests" },
];

type FilterField = (typeof FILTER_OPTIONS)[number]["value"];

type ColumnFilter = {
  field: FilterField;
  value: string;
};

type ColumnFilters = Record<KanbanStatus, ColumnFilter>;

const INITIAL_COLUMN_FILTERS: ColumnFilters = {
  Active: { field: "department", value: "" },
  Approve: { field: "department", value: "" },
  Reject: { field: "department", value: "" },
};

const filterControlSx = {
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(103,232,249,0.25)",
  },
};

function getColumnSurfaceSx(status: StatusEnum) {
  if (status === "Approve") {
    return {
      borderColor: "rgba(20, 255, 106, 0.34)",
      background: "#0b2a20",
    };
  }

  if (status === "Reject") {
    return {
      borderColor: "rgba(251, 113, 133, 0.34)",
      background: "#2a121b",
    };
  }

  return {
    borderColor: "rgba(103, 232, 249, 0.14)",
    background: "#0b2238",
  };
}

function parseFilterDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getPurchaseDate(reimbursement: ReimbursementRead) {
  if (reimbursement.purchaseDate instanceof Date) {
    return reimbursement.purchaseDate;
  }

  const timestamp = reimbursement.purchaseDate as unknown as {
    seconds?: number;
  };
  if (typeof timestamp.seconds === "number") {
    return new Date(timestamp.seconds * 1000);
  }

  return new Date(reimbursement.purchaseDate);
}

function matchesColumnFilter(
  reimbursement: ReimbursementRead,
  filter: ColumnFilter,
) {
  if (!filter.value) {
    return true;
  }

  if (filter.field === "department") {
    return reimbursement.department === filter.value;
  }

  if (filter.field === "date") {
    return getPurchaseDate(reimbursement) >= parseFilterDate(filter.value);
  }

  const minimumAmount = Number(filter.value);
  const reimbursementAmount = Number(reimbursement.amount);

  if (Number.isNaN(minimumAmount)) {
    return true;
  }

  if (Number.isNaN(reimbursementAmount)) {
    return false;
  }

  return reimbursementAmount >= minimumAmount;
}

type KanbanBoardProps = {
  reimbursement: ReimbursementRead[];
  user: User;
  onStatusChange: (docId: string, state: StatusEnum) => void;
};

export function KanbanBoard(props: KanbanBoardProps) {
  const reimbursement = props.reimbursement;
  const user = props.user;

  const [columnFilters, setColumnFilters] = useState<ColumnFilters>(
    INITIAL_COLUMN_FILTERS,
  );

  const handleFilterFieldChange = (status: KanbanStatus, field: FilterField) => {
    setColumnFilters((current) => ({
      ...current,
      [status]: { field, value: "" },
    }));
  };

  const handleFilterValueChange = (status: KanbanStatus, value: string) => {
    setColumnFilters((current) => ({
      ...current,
      [status]: { ...current[status], value },
    }));
  };

  const columns = COLUMN_DETAILS.map((column) => ({
    ...column,
    filter: columnFilters[column.title],
    items: reimbursement.filter(
      (reim) =>
        reim.state === column.title &&
        matchesColumnFilter(reim, columnFilters[column.title]),
    ),
  }));

  return (
    <Box
      className="App-dashboard-container"
      sx={{ marginTop: { xs: 1, md: 3 }, marginBottom: { xs: 4, md: 8 } }}
    >
      <Grid container spacing={2.5}>
        {columns.map((column) => (
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
                ...getColumnSurfaceSx(column.title),
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
                <span className="app-stat-chip" style={{ color: "#fff" }}>
                  {column.items.length}
                </span>
              </Box>
              <Box sx={{ display: "grid", gap: 1.25, mb: 2 }}>
                <FormControl size="small" fullWidth>
                  <InputLabel sx={{ color: "white" }}>Filter by</InputLabel>
                  <Select
                    value={column.filter.field}
                    label="Filter by"
                    onChange={(e) =>
                      handleFilterFieldChange(
                        column.title,
                        e.target.value as FilterField,
                      )
                    }
                    sx={{
                      color: "#fff",
                      "& .MuiSelect-icon": { color: "#fff" },
                      ...filterControlSx,
                    }}
                  >
                    {FILTER_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {column.filter.field === "department" && (
                  <FormControl size="small" fullWidth>
                    <InputLabel
                      sx={{
                        color: "#fff",
                        "&.Mui-focused": { color: "#fff" },
                      }}
                    >
                      Department
                    </InputLabel>
                    <Select
                      value={column.filter.value}
                      label="Department"
                      onChange={(e) =>
                        handleFilterValueChange(column.title, e.target.value)
                      }
                      sx={{
                        color: "#fff",
                        "& .MuiSelect-icon": { color: "#fff" },
                        ...filterControlSx,
                      }}
                    >
                      <MenuItem value="">All departments</MenuItem>
                      {ALL_DEPARTMENTS.map((department) => (
                        <MenuItem key={department} value={department}>
                          {department}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                {column.filter.field === "date" && (
                  <TextField
                    size="small"
                    label="From date"
                    type="date"
                    value={column.filter.value}
                    onChange={(e) =>
                      handleFilterValueChange(column.title, e.target.value)
                    }
                    InputLabelProps={{
                      shrink: true,
                      style: { color: "rgba(255,255,255,0.6)" },
                    }}
                    inputProps={{ style: { color: "#fff" } }}
                    sx={filterControlSx}
                    fullWidth
                  />
                )}

                {column.filter.field === "amount" && (
                  <TextField
                    size="small"
                    label="Min amount ($)"
                    type="number"
                    value={column.filter.value}
                    onChange={(e) =>
                      handleFilterValueChange(column.title, e.target.value)
                    }
                    InputLabelProps={{
                      style: { color: "rgba(255,255,255,0.6)" },
                    }}
                    inputProps={{ min: 0, style: { color: "#fff" } }}
                    sx={filterControlSx}
                    fullWidth
                  />
                )}

                {column.filter.value && (
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleFilterValueChange(column.title, "")}
                    sx={{
                      color: "rgba(103,232,249,0.8)",
                      borderColor: "rgba(103,232,249,0.3)",
                      textTransform: "none",
                      justifySelf: "start",
                    }}
                  >
                    Clear filter
                  </Button>
                )}
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
                {column.items.map((reim) => (
                  <div className="Component-kanban-card-row" key={reim.docId}>
                    <ReimbursementCard
                      reimbursement={reim}
                      isTreasurer={user.isTreasurer}
                      onStatusChange={props.onStatusChange}
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
