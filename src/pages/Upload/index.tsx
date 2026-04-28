import {UserContext} from "../../stores/user";
import Box from "@mui/material/Box";
import UploadBox from "../../components/UploadBox/";
import { uploadFile } from "../../services/upload";
import {useContext, useState} from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [uploadProgress] = useState(0);
  const onUploadFile = (file: any) => {
    uploadFile(file, user.token as string)
      .then(onCompleteUploadFile);
  };
  const onCompleteUploadFile = (url: string) => {
    alert("successfully uploaded the doc. URL:" + url);
  };
  return (
    <>
      <div className="App-master-container">
        <Box className="App-dashboard-container">
          <Card
            variant="outlined"
            className="app-shell-card"
            sx={{p: {xs: 3, md: 4}, borderRadius: "28px", width: "100%"}}
          >
            <Typography level="body2" sx={{textTransform: "uppercase", letterSpacing: "0.18em", color: "primary.300", mb: 1}}>
              File upload
            </Typography>
            <Typography level="h2" sx={{fontSize: {xs: "1.5rem", md: "2rem"}, mb: 0.75}}>
              Upload supporting documents.
            </Typography>
            <Typography level="body1" sx={{color: "neutral.300", mb: 3}}>
              The upload behavior stays the same. This update only changes the presentation.
            </Typography>
            <UploadBox
              progress={uploadProgress}
              onUploadFile={onUploadFile}
              token={user.token as string}
            />
          </Card>
        </Box>
      </div>
    </>
  );
}
