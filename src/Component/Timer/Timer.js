import React from "react";
import "./Timer.css"
import {useState, useEffect} from "react";

const Timer = () => {
    const [state, setState] = useState({
        isRunning: false,
        isPaused: false,
        start: true,
    })
    const [userTime, setUserTime] = useState({
        second: 0,
        minute: 0,
        hour: 0,
    })
    const [userInput, setUserInput] = useState(0)
    const [lastVal, setLastVal] = useState({
        second: "",
        minute: "",
        hour: "",
    })
    const startTimerHandler = () => {
        if(userInput !== 0){
        setState({...state, start: false, isRunning: true})
        }
    }
    useEffect(() => {
        let interval;
        if (state.isRunning && userInput !== 0) {
            interval = setInterval(() => {
                setUserInput((prevTime) => prevTime === 0 ? 0
                    & setState({...state, isRunning: false})
                    & setLastVal({
                        hour:"" ,
                        minute:"",
                        second:"" ,
                    })
                    : prevTime - 1) }, 1000);


        }

        return () => clearInterval(interval)
    }, [state.isRunning])
    useEffect(() => {
        let nTime = Number(userTime.second) + (Number(userTime.minute) * 60) + (Number(userTime.hour) * 3600)
        setUserInput(nTime)

    }, [userTime])
    useEffect(()=>{
        let newH=Math.floor((userInput % 216000) / 3600).toString()
        let newM=Math.floor((userInput % 3600) / 60).toString()
        let newS=Math.floor(userInput % 60).toString()
        if(userInput>0 && state.isRunning){
            setLastVal({
                hour:newH<10?"0"+newH:newH ,
                minute:newM<10?"0"+newM:newM,
                second:newS<10?"0"+newS:newS ,
            })
        }
    },[userInput])
    const pauseTimerHandler = () => {
        setState({...state, isRunning: false, isPaused: true})
    }
    const ResumeTimerHandler = () => {
        setState({...state, isRunning: true, isPaused: false})
    }
    const CancelTimerHandler = () => {
        setState({...state, start: true, isRunning: false})
        setUserInput(0)
        setUserTime({hour: 0,second: 0,minute: 0})
        setLastVal({
            second: "",
            minute: "",
            hour: ""
        })
    }
    const onChangeHandler = (event) => {
        if (event.target.id === "second") {
            setUserTime({...userTime, second: event.target.value})
            setLastVal({...lastVal,second: event.target.value })
        }
        if (event.target.id === "minute") {
            setUserTime({...userTime, minute: event.target.value})
            setLastVal({...lastVal,minute: event.target.value })
        }
        if (event.target.id === "hour") {
            setUserTime({...userTime, hour: event.target.value})
            setLastVal({...lastVal,hour: event.target.value })
        }
    }

    let btn = <button className={"start-btn btn"} onClick={startTimerHandler}>Start</button>
    if (state.isRunning) {
        btn =
            <div>
                <button className={"Pause-btn btn"} onClick={pauseTimerHandler}>Pause</button>
                <button className={"Cancel-btn btn"} onClick={CancelTimerHandler}>Cancel</button>
            </div>
    }
    if (state.isPaused) {
        btn =
            <div>
                <button className={"Resume-btn btn"} onClick={ResumeTimerHandler}>Resume</button>
                <button className={"Cancel-btn btn"} onClick={CancelTimerHandler}>Cancel</button>
            </div>
    }
    if (state.start) {
        btn = <button className={"start-btn btn"} onClick={startTimerHandler}>Start</button>
    }


    return (
        <div className={"container"}>
            <div className={"timer"}>
                <input id={"hour"} onChange={onChangeHandler} value={lastVal.hour} placeholder={"00"} type="text"/>
                <div>:</div>
                <input id={"minute"} onChange={onChangeHandler} value={lastVal.minute} placeholder={"00"} type="text"/>
                <div>:</div>
                <input id={"second"} onChange={onChangeHandler} value={lastVal.second} placeholder={"00"} type="text"/>
            </div>
            {btn}
        </div>
    )
}

export default Timer