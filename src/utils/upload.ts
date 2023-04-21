import { GOOGLE_DRIVE_UPLOAD_URL } from "../../constants/API";
export const uploadFile = async (file: any) => {
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

  fetch(GOOGLE_DRIVE_UPLOAD_URL, {
    method: "POST",
    headers: new Headers({ Authorization: "Bearer " + value.token }),
    body: form,
  })
    .then((res) => {
      return res.json();
    })
    .then(function (val) {
      console.log(val);
    });
};
