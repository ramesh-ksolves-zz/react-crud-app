import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ListEmployee from "./components/ListEmployee";
import Employee from "./components/Employee";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route exact path="/employee" component={ListEmployee} />
                <Route exact path="/employee/add" component={Employee} />
                <Route exact path="/employee/:empId" component={Employee} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;