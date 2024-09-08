import { Box, Grid } from "@mui/material";
import { ReimbursementRead } from "../database/reimbursement";
import ReimbursementCard from "./Card/ReimbursementCard";
import InvoiceCard from "./Card/InvoiceCard";
import { User } from "../auth/types";
import { PropsWithChildren, useMemo } from "react";

type KanbanBoardProps = {
    statusContainers: any[],
    user: User,
    Card: typeof ReimbursementCard | typeof InvoiceCard
};

export function KanbanBoard({
        statusContainers,
        user,
        Card
    }: KanbanBoardProps){

    let active: any[] = [];
    let approve: any[] = [];
    let reject: any[] = [];

    useMemo(() => {for (let statusContainer of statusContainers) {
        if (statusContainer.status === "Active"){
            active.push(statusContainer);
        } else if (statusContainer.status === "Approve"){
            approve.push(statusContainer);
        } else if (statusContainer.status === "Reject"){
            reject.push(statusContainer);
        }
    }}, [statusContainers]);

    return (
        <Box sx={{marginTop: "100px", marginBottom: "100px", width: "100%"}}>
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
                <Grid item xs={4} sx={{height: "700px", overflowY: 'scroll'}}>
                {
                    active.map((info, i) => (
                    <div className="Component-kanban-card-row" key={i}>
                        <Card info={info} isTreasurer={user.isTreasurer}/>
                    </div>
                    ))
                }
                </Grid>
                <Grid item xs={4} sx={{height: "700px", overflowY: 'scroll'}}>
                {
                    approve.map((info, i) => (
                    <div className="Component-kanban-card-row" key={i}>
                        <Card info={info} isTreasurer={user.isTreasurer}/>
                    </div>
                    ))
                }
                </Grid>

                <Grid item xs={4} 
                    sx={{height: "700px", overflowY: 'scroll'}}>
                {
                    reject.map((info, i) => (
                    <div className="Component-kanban-card-row" key={i}>
                        <Card info={info} isTreasurer={user.isTreasurer}/>
                    </div>
                    ))
                }
                </Grid>
                
            </Grid>
        </Box>
    )
}