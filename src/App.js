import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Switch, Route} from 'react-router-dom';

import Wrapper from "./hoc/Wrapper";
import Navbar from "./Component/Navbar/Navbar";
import Stopwatch from "./Component/stopwatch/stopwatch";
import Timer from "./Component/Timer/Timer";
import Clock from "./Component/Clock/Clock";

class App extends React.Component {
    state = {}

    render() {
        return (
            <Router>
                <Wrapper>
                    <Navbar/>
                    <Switch>
                        <Route exact path={"/"}>
                            <Stopwatch/>
                        </Route>
                        <Route exact path={"/Timer"}>
                            <Timer/>
                        </Route>
                        <Route exact path={"/WorldClock"}>
                            <Clock/>
                        </Route>
                    </Switch>
                </Wrapper>
            </Router>
        );
    }
}

export default App;