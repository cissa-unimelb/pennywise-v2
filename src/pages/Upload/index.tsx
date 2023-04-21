import { useUserStore } from "../../stores/user";
import { Header } from "../../components/Header";
import Box from "@mui/material/Box";
import UploadBox from "../../components/UploadBox/";
import { uploadFile } from "../../utils";
export default function Dashboard() {
  const { value } = useUserStore();
  return (
    <>
      <div className="App-master-container">
        <Header user={value} onClickLogout={() => handleLogout()} />
        <Box className="App-dashboard-container">
          <UploadBox
            onCompleteUploadFile={setDownloadURL}
            onUploadFile={uploadFile}
          />
        </Box>
      </div>
    </>
  );
}
