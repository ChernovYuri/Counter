import React, {ChangeEvent, ChangeEventHandler, useEffect, useState} from 'react';
import './App.css';
import UniversalButton from "./universalButton/universalButton";
import Count from "./counter/Count";
import {ValuesInput} from "./ValuesInput/ValuesInput";
import {logDOM} from "@testing-library/react";

// import Counter from "./counter/Counter";

export function App1Box() {

    const setButton = () => {
        setMinNumber(minNumberHandler)
        setCount(minNumberHandler)
        setMaxNumber(maxNumberHandler)
        setInputMessage(false)
        localStorage.setItem('Max value', JSON.stringify(maxNumberHandler))
        localStorage.setItem('Start value', JSON.stringify(minNumberHandler))
        setBoxMode(true)
    }

    useEffect(() => {
        // setButton()
        console.log('minNumberHandler = ' + minNumberHandler)
        console.log('maxNumberHandler = ' + maxNumberHandler)
        console.log('minNumber = ' + minNumber)
        console.log('maxNumber = ' + maxNumber)
    }, [])

    const getMaxNumberFromLocalStorageHandler = () => {
        let maxValueAsString = localStorage.getItem('Max value')
        if (maxValueAsString) {
            let newMaxValue = JSON.parse(maxValueAsString)
            // setMaxNumberHandler(newMaxValue)
            // setMaxNumber(newMaxValue)
            return newMaxValue
        } else return 0
    }
    const getMinNumberFromLocalStorageHandler = () => {
        let minValueAsString = localStorage.getItem('Start value')
        if (minValueAsString) {
            let newMinValue = JSON.parse(minValueAsString)
            // setMaxNumberHandler(newMaxValue)
            // setMaxNumber(newMaxValue)
            return newMinValue
        } else return 0
    }

    const [maxNumber, setMaxNumber] = useState<number>(getMaxNumberFromLocalStorageHandler)
    const [maxNumberHandler, setMaxNumberHandler] = useState<number>(getMaxNumberFromLocalStorageHandler)
    const onChangeLocalMaxNumberHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxNumberHandler(e.currentTarget.valueAsNumber)
    }
    const [minNumber, setMinNumber] = useState<number>(getMinNumberFromLocalStorageHandler)
    const [minNumberHandler, setMinNumberHandler] = useState<number>(getMinNumberFromLocalStorageHandler)
    const onChangeLocalMinNumberHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMinNumberHandler(e.currentTarget.valueAsNumber)
    }

    /*useEffect(()=>{
        let maxValueAsString = localStorage.getItem('Max value')
        if (maxValueAsString) {
            let newMaxValue = JSON.parse(maxValueAsString)
            setMaxNumberHandler(newMaxValue)
            setMaxNumber(newMaxValue)
        }

        let minValueAsString = localStorage.getItem('Start value')
        if (minValueAsString) {
            let newMinValue = JSON.parse(minValueAsString)
            setMinNumberHandler(newMinValue)
            setMinNumber(newMinValue)
        }
    }, [])*/

    useEffect(() => {
        errorHandler()//делается это

    }, [maxNumberHandler])  //когда это меняется
    useEffect(() => {
        errorHandler()//делается это

    }, [minNumberHandler])  //когда это меняется
    const buttonSetClass = () => (minNumberHandler >= maxNumberHandler) || (minNumberHandler < 0)
    const disabledSetButtonHandler = () => buttonSetClass() || (minNumberHandler === minNumber && maxNumberHandler === maxNumber)

    const [count, setCount] = useState<number>(minNumber)
    const [error, setError] = useState<boolean>(false)
    const [inputMessage, setInputMessage] = useState<boolean>(false)
    const errorMessage = error && <div><b>Incorrect value!</b></div>
    const inputMessageText = inputMessage && <div>Choose values and press 'set'</div>

    const errorHandler = () => {
        if (buttonSetClass()) {
            setInputMessage(false)
            setError(true)
        } else if (!disabledSetButtonHandler()) {
            setInputMessage(true)
            setError(false)
        }
    }

    const countIncrementHandler = () => {
        if (count < maxNumber) {
            setCount(count + 1)
        }
    }
    const minInputClass = buttonSetClass() ? 'errorInput' : 'inputValue'
    const maxInputClass = (minNumberHandler >= maxNumberHandler) ? 'errorInput' : 'inputValue'
    const countReset = () => setCount(minNumber)
    const counterClass = count === maxNumber ? 'counterMax' : 'counter'
    const buttonCountClass = (n: number) => inputMessage || error || (count === n)

    const [boxMode, setBoxMode] = useState<boolean>(false) // false = setBox

    const setModeHandler = () => {
        setBoxMode(false)
    }

    return (
        <div className={"App"} id={'inputBox'}>
            {boxMode
                ? <div className={'Box'} id={'countBox'}>
                    <div className={'title'}>
                        Counter
                    </div>
                    <div>
                        {errorMessage}{inputMessageText}
                    </div>
                    <div className={counterClass}>
                        <Count count={count} error={error}/>
                    </div>
                    <div className={'buttons'}>
                        <UniversalButton name={"Increment"}
                                         disabled={buttonCountClass(maxNumber)}
                                         callBack={countIncrementHandler}/>
                        <UniversalButton name={"Reset"}
                                         disabled={buttonCountClass(minNumber)}
                                         callBack={countReset}/>
                        <UniversalButton name={'Set'}
                                         callBack={setModeHandler}
                            // disabled={disabledSetButtonHandler()}
                                         disabled={false}/>
                    </div>
                </div>
                : <div className={'Box'} id={'setBox'}>
                    <div className={'wrapper'}>
                        <ValuesInput title={'Max value:'}
                            // placeholder={'Choose max value'}
                                     onChangeCallBack={onChangeLocalMaxNumberHandler}
                                     classNameCallBack={maxInputClass}
                                     valueCallBack={maxNumberHandler}
                        />
                        <ValuesInput title={'Start value:'}
                            // placeholder={'Choose start value'}
                                     onChangeCallBack={onChangeLocalMinNumberHandler}
                                     classNameCallBack={minInputClass}
                                     valueCallBack={minNumberHandler}
                        />
                        <UniversalButton name={'Set'}
                                         callBack={setButton}
                                         disabled={buttonSetClass()}/>
                    </div>
                </div>
            }
        </div>
    );
}
