import React from "react";


type UniversalButtonType = {
    name: string
    callBack: ()=>void
    disabled: boolean
}
const UniversalButton = (props: UniversalButtonType) => {
    const callBackHandler = () => props.callBack()
    return (
        <button onClick={callBackHandler} disabled={props.disabled}>{props.name}</button>
    )
}

export default UniversalButton