import {
  GOOGLE_DRIVE_UPLOAD_URL,
  GOOGLE_DRIVE_FOLDER_ID,
  GOOGLE_DRIVE_FILE_URL,
} from "../constants/API";

export async function uploadFile(file: any, token: string) {
  let metadata = {
    name: file.name, // Filename at Google Drive
    mimeType: file.type, // mimeType at Google Drive
    parents: [GOOGLE_DRIVE_FOLDER_ID], // Folder ID at Google Drive
  };

  const form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" }),
  );
  form.append("file", file);

  const response = await fetch(GOOGLE_DRIVE_UPLOAD_URL, {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    }),
    body: form,
  });
  const result = await response.json();
  if (!response.ok || !result.id) {
    throw new Error(result.error?.message ?? "Google Drive upload failed");
  }
  return GOOGLE_DRIVE_FILE_URL + result.id;
}
