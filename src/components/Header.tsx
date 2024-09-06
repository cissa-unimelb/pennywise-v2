import styles from './header.module.css';
import Casino from "@mui/icons-material/Casino";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {Link} from 'react-router-dom';
import {useContext, useMemo} from "react";
import {UserContext} from "../stores/user";
import {logoutSession} from "../auth/session";

export function Header() {

  const {user} = useContext(UserContext);
  const isAuthed = useMemo(() => {
    return user.id !== "";
  }, [user]);

  return (
    <div className={styles.header}>
      <div>
        <Casino sx={{color: "white"}} fontSize='large'/>
      </div>
      <div>
        <Typography color="white" variant="h4">
          Pennywise
        </Typography>
      </div>
      <div className={styles.spacer}></div>
      <div className={styles.links}>
        <Link to="/">
          <Typography color="white" style={{textDecoration: "underline"}}>
            Dashboard
          </Typography>
        </Link>
        <Link to="/analytics">
          <Typography color="white" style={{textDecoration: "underline"}}>
            Analytics
          </Typography>
        </Link>
        {
          isAuthed && (
            <a onClick={logoutSession} style={{cursor: "pointer"}}>
              <Typography
                color="white" style={{textDecoration: "underline"}}>
                Log Out
              </Typography>
            </a>
          )
        }

      </div>
    </div>
  );
}
