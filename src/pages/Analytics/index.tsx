import {useEffect, useState} from "react";
import {activeReimbursementDepartmentStatistics, DepartmentStatistics} from "../../database/analytics";

import styles from './analytics.module.css';
import {useNavigate} from "react-router-dom";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={styles.page}>
    <div className={styles.header}>
      <h1>Analytics</h1>
      <button onClick={handleBack}>BACK</button>
    </div>

    <div className={styles.stats}>
      <h2>Active Reimbursements</h2>
      <table>
        <thead>
        <tr>
          <th>Industry</th>
          <th>Quantity</th>
          <th>Total Price</th>
          <th>Highest Price</th>
        </tr>
        </thead>
        <tbody>
        {Object.entries(stats).map(([name, stat]) => (
          <tr key={name}>
            <td>{name}</td>
            <td>{stat.quantity}</td>
            <td>${stat.totalPrice}</td>
            <td>${stat.highestPrice}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  </div>
}