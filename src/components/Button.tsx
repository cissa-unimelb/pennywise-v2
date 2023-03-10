interface Props{
    text: string
    onClick: Function
}

export function Button(props: Props){
    return <button onClick={() => {props.onClick()}}>{props.text}</button>
}