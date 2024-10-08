import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/joy/Button";
import LinearProgress from "@mui/joy/LinearProgress";
type Props = {
  onUploadFile: (file: any, token: string) => void;
  progress: number;
  token: string;
};
function UploadBox({ onUploadFile, progress, token }: Props) {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const files = e.target.files;
    if (!files || files.length === 0) return;
    onUploadFile(files[0], token);
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
      <p>{progress} %</p>
      <LinearProgress
        className="Component-upload-progress"
        determinate
        value={progress}
      />
    </>
  );
}
export default UploadBox;
