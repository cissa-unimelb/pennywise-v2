import { default as MButton } from "@mui/joy/Button";
interface Props {
  text: string;
  onClick: Function;
}

export function Button(props: Props) {
  return (
    <MButton
      onClick={() => {
        props.onClick();
      }}
    >
      {props.text}
    </MButton>
  );
}
