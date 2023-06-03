import React, {useEffect, useState} from "react";
import "./Clock.css";
import axios from "axios";

const Clock = () => {
    const [time, setTime] = useState({
        paris: "",
        moscow: "",
        losAngeles: ""
    });
    const [localTime, setLocalTime] = useState({
        minute: 0,
        hour: 0
    })

    useEffect(() => {
        setLocalTime({minute: new Date().getMinutes(), hour: new Date().getHours()})
        axios.get("http://worldtimeapi.org/api/timezone/Europe/Paris")
            .then((response) => {
                const {datetime} = response.data;
                const time = datetime.substring(11, 16);
                setTime((prevTime) => ({...prevTime, paris: time}));
            })
            .catch((error) => {
                console.error("Error fetching Paris time:", error);
            });
        axios.get("http://worldtimeapi.org/api/timezone/Europe/Moscow")
            .then((response) => {
                const {datetime} = response.data;
                const time = datetime.substring(11, 16);
                setTime((prevTime) => ({...prevTime, moscow: time}))
            })
            .catch((error) => {
                console.error("Error fetching Moscow time:", error);
            });
        axios.get("http://worldtimeapi.org/api/timezone/America/Los_Angeles")
            .then((response) => {
                const {datetime} = response.data;
                const time = datetime.substring(11, 16);
                setTime((prevTime) => ({...prevTime, losAngeles: time}))
            })
            .catch((error) => {
                console.error("Error fetching Los Angeles time:", error);
            });

    }, []);
    let parisMin = (localTime.minute - (time.paris.substring(3, 5)));
    let ParisHour = localTime.hour - (time.paris.substring(0, 2));
    if (parisMin < 0) {
        parisMin = parisMin * -1
    }
    if (ParisHour < 0) {
        ParisHour = ParisHour * -1
    }


    let mosMin = (localTime.minute - (time.moscow.substring(3, 5)));
    let mosHour = localTime.hour - (time.moscow.substring(0, 2));
    if (mosMin < 0) {
        mosMin = mosMin * -1
    }
    if (mosHour < 0) {
        mosHour = mosHour * -1
    }

    let losMin = (localTime.minute - (time.losAngeles.substring(3, 5)));
    let losHour = localTime.hour - (time.losAngeles.substring(0, 2));
    if (losMin < 0) {
        losMin = losMin * -1
    }
    if (losHour < 0) {
        losHour = losHour * -1
    }
    return (
        <div className={"container"}>
            <div className="clock">
                <div className={"city"}>
                    <div>Paris</div>
                    <div>{ParisHour} hour and {parisMin} minute behind</div>
                </div>
                <div className={"time"}>
                    {time.paris}
                </div>
            </div>
            <div className="clock">
                <div className={"city"}>
                    <div>Moscow</div>
                    <div>{mosHour} hour and {mosMin} minute behind</div>
                </div>
                <div className={"time"}>
                    {time.moscow}
                </div>
            </div>
            <div className="clock">
                <div className={"city"}>
                    <div>Los Angeles</div>
                    <div>{losHour} hour and {losMin} minute behind</div>
                </div>
                <div className={"time"}>
                    {time.losAngeles}
                </div>
            </div>
        </div>
    );
};

export default Clock;
