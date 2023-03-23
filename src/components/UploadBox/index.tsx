import { useState } from "react";
import { storage } from "../../storage";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/joy/Button";
import LinearProgress from "@mui/joy/LinearProgress";
type Props = {
  onCompleteUploadFile: (url: string) => void;
};
function UploadBox({ onCompleteUploadFile }: Props) {
  const [progressPercent, setProgressPercent] = useState(0);
  const onUploadFile = (file: any) => {
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    const onChangeProgress = (snapshot: any) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgressPercent(progress);
    };
    const handleError = (error: any) => {
      alert(error);
    };
    const onCompleteUpload = () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
        onCompleteUploadFile(downloadURL);
      });
    };
    uploadTask.on(
      "state_changed",
      onChangeProgress,
      handleError,
      onCompleteUpload
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const files = e.target.files;
    if (!files || files.length === 0) return;
    onUploadFile(files[0]);
  };

  return (
    <>
      <Button
        component="label"
        startDecorator={<UploadFileIcon />}
        className="Component-upload-button"
      >
        Upload Files
        <input
          type="file"
          className="filepond"
          onChange={handleSubmit}
          hidden
          multiple
        />
      </Button>
      <p>{progressPercent} %</p>
      <LinearProgress
        className="Component-upload-progress"
        determinate
        value={progressPercent}
      />
    </>
  );
}
export default UploadBox;
