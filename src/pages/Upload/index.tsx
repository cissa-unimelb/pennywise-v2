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
  const uploadFile = async (file: any) => {
    const metadata = {
      name: file.name,
      mimeType: file.type,
    };
    const form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    form.append("file", file);

    try {
      console.log(value.token);
      const response = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=media",
        {
          method: "POST",
          headers: new Headers({ Authorization: "Bearer " + value.token }),
          body: form,
        }
      );

      if (response.ok) {
        alert("File uploaded successfully");
      } else {
        alert("Error uploading file");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading file");
    }
  };
  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  return (
    <>
      <div className="App-master-container">
        <Header user={value} onClickLogout={() => handleLogout()} />
        <Box className="App-dashboard-container">
          <UploadBox
            onCompleteUploadFile={setDownloadURL}
            onUploadFile={uploadFile}
          />
          <a>{downloadURL}</a>
        </Box>
      </div>
    </>
  );
}
