import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Header from './components/Header'
import ListEmployee from './components/ListEmployee'
import Employee from './components/Employee'
import Sidebar from './components/Sidebar';
import './App.css';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div>
      {/* <Header/> */}
      
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
