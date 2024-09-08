import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import {Person} from "@mui/icons-material";
import Typography from "@mui/joy/Typography";

import { useEffect, useMemo, useState } from "react";
import { KanbanCardProps } from "./KanbanCardProps";
import { getUser } from "../../database";
import { User } from "../../auth/types";

import ReimbursementPopupButton from "./ReimbursementPopup";
import { Box, List, ListItem } from "@mui/material";
import { InvoiceSchema } from "../../database/invoice";

export default function InvoiceCard({
    info,
    isTreasurer,
    isAuthorizer
  }: KanbanCardProps){
    
    const invoiceInfo = info as InvoiceSchema;
    
    
      const handleClick = () => {
        if (invoiceInfo.driveUrl !== ""){
            window.open(invoiceInfo.driveUrl, '_blank');
        }
      }
    
      // console.log(invoiceInfo.docId);
    
      return (
        <Card className="Component-expense-card-container" sx={{backgroundColor: "black"}}>
          
          {isTreasurer?
            <div>
            </div>
          : <></>}
    
          <CardContent sx={{justifyContent: "flex-end", cursor: 'pointer'}}
                       onClick={handleClick}>
            <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
                ID: {invoiceInfo.invoice_id}
            </Typography>
            <Box
              style={{
                flexDirection: "row",
              }}
            >
              <Typography
                textColor="neutral.300"
              >
                Timestamp: {invoiceInfo.timestamp.toLocaleString()}
              </Typography>
              <Typography
                textColor="neutral.300"
              >
                Recipient: {invoiceInfo.recipient}
              </Typography>
              <Typography
                textColor="neutral.300"
              >
                ABN: {invoiceInfo.recipient_abn}
              </Typography>
              <Typography
                textColor="neutral.300"
              >
                Address: {invoiceInfo.recipient_address}
              </Typography>
              <div>
                <Typography>Items</Typography>
                <List>
                    {invoiceInfo.items.map((item, i) => (
                    <ListItem key={i}>{item.description} | {item.amount}</ListItem>
                    ))}
                </List>
              </div>
            </Box>
          </CardContent>
        </Card>
      );
}