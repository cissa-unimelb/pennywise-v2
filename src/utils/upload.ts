import { GOOGLE_DRIVE_UPLOAD_URL } from "../constants/API";
import axios from "axios";
export const uploadFile = async (
  file: any,
  parent: string,
  token: string,
  onUpdateProgress: (progress: number) => void
): Promise<string> => {
  // var fileContent = "sample text"; // As a sample, upload a text file.
  // var uploadfile = new Blob([fileContent], { type: file.type });
  var metadata = {
    name: file.name, // Filename at Google Drive
    mimeType: file.type, // mimeType at Google Drive
    parents: [parent], // Folder ID at Google Drive
  };

  // var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
  var form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  form.append("file", file);
  try {
    const returnData = await axios.post(GOOGLE_DRIVE_UPLOAD_URL, form, {
      headers: { Authorization: "Bearer " + token },
      onUploadProgress: function (progressEvent: any) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onUpdateProgress(percentCompleted);
      },
    });
    const jsonData = returnData.data;
    console.log(jsonData);
    return JSON.stringify(jsonData);
  } catch (e) {
    console.log(e);
    return "";
  }
};
