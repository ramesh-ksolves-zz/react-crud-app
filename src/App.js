import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListEmployee from './pages/ListEmployee'
import Employee from './pages/Employee'
import Sidebar from './components/Sidebar';
import './App.css';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div>
      <Router>
        <Sidebar />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route exact path="/home" component={Dashboard} />
          <Route exact path="/employees" component={ListEmployee} />
          <Route exact path="/employee/add" component={Employee} />
          <Route exact path="/employee/:empId" component={Employee} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
