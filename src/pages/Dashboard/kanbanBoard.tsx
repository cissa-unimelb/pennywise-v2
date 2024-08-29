import { Box, Grid } from "@mui/material";
import { ReimbursementRead } from "../../database/reimbursement";
import ReimbursementCard from "../../components/ReimbursementCard";
import { User } from "../../auth/types";

type KanbanBoardProps = {
    reimbursement: ReimbursementRead[],
    user: User
};

export function KanbanBoard(props: KanbanBoardProps){
    const reimbursement = props.reimbursement;
    const user = props.user;

    let active: ReimbursementRead[] = [];
    let approve: ReimbursementRead[] = [];
    let reject: ReimbursementRead[] = [];

    reimbursement.map((reim, i) => {
        if (reim.state === "Active"){
            active.push(reim);
        } else if (reim.state === "Approve"){
            approve.push(reim);
        } else if (reim.state === "Reject"){
            reject.push(reim);
        }
        return null;
    });

    return (
        <Box className="App-dashboard-container" sx={{marginTop: "100px", marginBottom: "100px"}}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <h1> Active </h1>
                </Grid>
                <Grid item xs={4}>
                    <h1> Approve </h1>
                </Grid>
                <Grid item xs={4}>
                    <h1> Reject </h1>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={4} spacing={2} sx={{height: "700px", overflowY: 'scroll'}}>
                {
                    active.map((reim, i) => (
                    <div className="Component-kanban-card-row">
                        <ReimbursementCard reimbursement={reim} isTreasurer={user.isTreasurer}/>
                    </div>
                    ))
                }
                </Grid>
                <Grid item xs={4} spacing={2} sx={{height: "700px", overflowY: 'scroll'}}>
                {
                    approve.map((reim, i) => (
                    <div className="Component-kanban-card-row">
                        <ReimbursementCard reimbursement={reim} isTreasurer={user.isTreasurer}/>
                    </div>
                    ))
                }
                </Grid>

                <Grid item xs={4} 
                    spacing={2}
                    sx={{height: "700px", overflowY: 'scroll'}}>
                {
                    reject.map((reim, i) => (
                    <div className="Component-kanban-card-row">
                        <ReimbursementCard reimbursement={reim} isTreasurer={user.isTreasurer}/>
                    </div>
                    ))
                }
                </Grid>
                
            </Grid>
        </Box>
    )
}