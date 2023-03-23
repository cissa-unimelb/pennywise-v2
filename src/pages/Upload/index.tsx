import { useUserStore } from "../../stores/user";
import { Header } from "../../components/Header";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import UploadBox from "../../components/UploadBox/";
import { useState } from "react";
export default function Dashboard() {
  const { value } = useUserStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("logout");
    navigate("/login");
  };
  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  return (
    <>
      <div className="App-master-container">
        <Header user={value} onClickLogout={() => handleLogout()} />
        <Box className="App-dashboard-container">
          <UploadBox onCompleteUploadFile={setDownloadURL} />
          <a>{downloadURL}</a>
        </Box>
      </div>
    </>
  );
}
