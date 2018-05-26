import React, { Component } from 'react';
// import './App.css';
import { Switch, Route, Redirect } from "react-router-dom";
import Header from './partials/Header';
import Footer from './partials/Footer';
import FlightList from './pages/FlightList';
import Details from './pages/Details';


class App extends Component {
    

    render() {
    
        return (
            <React.Fragment>
                <div className="main-container">
                    <Header />
                    <Switch>
                        <Route exact path="/" component={FlightList} />
                        <Route exact path="/details" component={Details} />
                        <Redirect from="/" to="/" />
                    </Switch>
                    <div id="push"></div>
                </div>
                <Footer />
            </React.Fragment>
        )
    }

}

export default App;
