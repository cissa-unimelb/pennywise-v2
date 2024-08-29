export const REJECT_HEADER = "Reimbursement Rejected"
export const REJECT_BODY = `Hi [Name],\n
Thank you for submitting your reimbursement request through CISSA Pennywise.
After careful review, we regret to inform you that your request has been declined due to the following reason(s):
Duplicate reimbursement
Missing receipt or insufficient information
Reimbursement amount inconsistent with the receipt
If you have any questions or can provide additional details, please feel free to contact me at [treasurer's email] or on discord. We hope to resolve this soon and proceed with your reimbursement.
Once you are happy to resubmit, please go through the Pennywise Reimbursement Application Process again.
\nBest regards,\n
[Treasurer's Name]`



export const ACCEPT_HEADER = "Reimbursement Request Approved"
export const ACCEPT_BODY = `Hi [Name],\n
Thank you for submitting your reimbursement request through CISSA Pennywise.
We're happy to inform you that your request has been reviewed and approved by the Treasurer! The next step is approval from the other executives, after which the funds will be transferred to your account within 1-5 business days.
If you have any questions or need further assistance, please don't hesitate to reach out to me at [treasurer's email].
\nBest regards,\n
[Treasurer's Name]`



// TODO: Check firebase email
export const PAYMENT_PENDING_HEADER = "Action Required: Pending Reimbursement Approval"
export const PAYMENT_PENDING_BODY = `Hi Execs,\n
A new reimbursement request has been initiated and approved by the Treasurer. Please log in to Pennywise and click "approve" to move forward with processing the reimbursement.
If you have any questions or need further information, feel free to reach out to me at [Treasurer’s email].
\nBest regards,\n
[Treasurer’s Name]`

