import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../stores/user";
import {
  getArchivedReimbursements,
  ReimbursementRead,
} from "../../database/reimbursement";
import ReimbursementCard from "../../components/ReimbursementCard";

export default function History() {
  const { user } = useContext(UserContext);
  const [reimbursements, setReimbursements] = useState<ReimbursementRead[]>([]);

  useEffect(() => {
    getArchivedReimbursements(user).then(setReimbursements);
  }, [user]);

  return (
    <>
      <h1>History</h1>
      {reimbursements.map((reimbursement) => (
        <ReimbursementCard
          key={reimbursement.docId}
          reimbursement={reimbursement}
          isTreasurer={false}
        />
      ))}
    </>
  );
}
