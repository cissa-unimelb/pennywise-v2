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
    return (
        <Box className="App-dashboard-container" sx={{marginTop: "100px", marginBottom: "100px"}}>
            <Grid container spacing={2}>
                <Grid item container xs={4}>
                    <h1> Active </h1>
                </Grid>
                <Grid item container xs={4}>
                    <h1> Approve </h1>
                </Grid>
                <Grid item container xs={4}>
                    <h1> Reject </h1>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item container xs={4} spacing={2} sx={{height: "700px", overflowY: 'scroll'}}>
                {
                    reimbursement.map((reim, i) => (
                    reim.state === "Active" ?
                    <Grid item xs={12} key={i}>
                        <ReimbursementCard reimbursement={reim} isTreasurer={user.isTreasurer}/>
                    </Grid>
                    : null
                    ))
                }
                </Grid>
                <Grid item container xs={4} spacing={2} sx={{height: "700px", overflowY: 'scroll'}}>
                {
                    reimbursement.map((reim, i) => (
                    reim.state === "Approve" ?
                    <Grid item xs={12} key={i}>
                        <ReimbursementCard reimbursement={reim} isTreasurer={user.isTreasurer}/>
                    </Grid>
                    : null
                    ))
                }
                </Grid>

                <Grid item container xs={4} spacing={2} sx={{height: "700px", overflowY: 'scroll'}}>
                {
                    reimbursement.map((reim, i) => (
                    reim.state === "Reject" ?
                    <Grid item xs={12} key={i}>
                        <ReimbursementCard reimbursement={reim} isTreasurer={user.isTreasurer}/>
                    </Grid>
                    : null
                    ))
                }
                </Grid>
                
            </Grid>
        </Box>
    )
}