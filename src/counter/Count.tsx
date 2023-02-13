import React from "react";

type CountType = {
    count: number
    error: boolean
}

const Count = (props: CountType) => {
    return <span>{props.count}{props.error}</span>
}

export default Count