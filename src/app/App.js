import React, { Component } from 'react';
// import './App.css';
import { Switch, Route } from "react-router-dom";
import Header from './partials/Header';
import Footer from './partials/Footer';
import FlightList from './pages/FlightList';
import Details from './pages/Details';


class App extends Component {
    

    render() {
    
        return (
            <React.Fragment>
                <div id="wrapper">
                    <Header />
                    <Switch>
                        <Route exact path="/" component={FlightList} />
                        <Route exact path="/details" component={Details} />
                    </Switch>
                    <div id="push"></div>
                </div>
                <Footer />
            </React.Fragment>
        )
    }

}

export default App;
