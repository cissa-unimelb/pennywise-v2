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
    // var fileContent = "sample text"; // As a sample, upload a text file.
    // var uploadfile = new Blob([fileContent], { type: file.type });
    var metadata = {
      name: file.name, // Filename at Google Drive
      mimeType: file.type, // mimeType at Google Drive
      parents: ["10HGvWmY5D7zbM_BHiosFjQ-TWHQfQaox"], // Folder ID at Google Drive
    };

    // var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
    var form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    form.append("file", file);

    fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id&supportsAllDrives=true",
      {
        method: "POST",
        headers: new Headers({ Authorization: "Bearer " + value.token }),
        body: form,
      }
    )
      .then((res) => {
        alert("success");
        console.log(res);
        return res.json();
      })
      .then(function (val) {
        console.log(val);
      });
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
