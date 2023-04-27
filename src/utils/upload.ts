import {
  GOOGLE_DRIVE_UPLOAD_URL,
  GOOGLE_DRIVE_FOLDER_ID,
  GOOGLE_DRIVE_FILE_URL,
} from "../constants/API";
export const uploadFile = async (
  file: any,
  token: string,
  onUploadComplete: (url: string) => void
) => {
  var metadata = {
    name: file.name, // Filename at Google Drive
    mimeType: file.type, // mimeType at Google Drive
    parents: [GOOGLE_DRIVE_FOLDER_ID], // Folder ID at Google Drive
  };

  // var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
  var form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  form.append("file", file);
  const data = await fetch(GOOGLE_DRIVE_UPLOAD_URL, {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    }),
    body: form,
  });
  const obj = await data.json();
  onUploadComplete(GOOGLE_DRIVE_FILE_URL + obj.id);
};
