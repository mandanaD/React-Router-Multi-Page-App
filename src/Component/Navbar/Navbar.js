import React from "react";
import "./Navbar.css"
import {Link} from "react-router-dom"

class Navbar extends React.Component{
    render() {
        return(
            <div className={"Navbar"}>
                <div>
                    <Link to={"/"}>StopWatch</Link>
                </div>
                <div>
                    <Link to={"/Timer"}>Timer</Link>
                </div>
                <div>
                    <Link to={"/WorldClock"}>World Clock</Link>
                </div>
            </div>
        )
    }

}
export default Navbar