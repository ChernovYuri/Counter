import React, {ChangeEvent} from 'react';

type PropsType = {
    title: string
    placeholder?: string
    onChangeCallBack: (e: ChangeEvent<HTMLInputElement>) => void
    classNameCallBack: string
    valueCallBack: number
}

export const ValuesInput = (props: PropsType) => {

    return (
        <div>
            <span>{props.title + ' '}</span>
            <input
                type={'number'}
                className={props.classNameCallBack}
                placeholder={props.placeholder}
                onChange={props.onChangeCallBack}
                value={props.valueCallBack}
            />
        </div>
    );
};

