import React from 'react';
import getFlights from '../../services/flightService';
import travel from '../../img/travel.svg';
import travel_west from '../../img/travel_west.svg';
import Loader from '../partials/Loader';
import GeoError from '../partials/GeoError';


class FlightList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: [],
            refreshId: '',
            geolocationError: false,
            connectionError: false,
            loading: true
        }
    }


    componentDidMount() {

        navigator.geolocation.getCurrentPosition(position => {

            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            const url = `http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${latitude}&lng=${longitude}&fDstL=0&fDstU=150`;
            this.collectFlightData(url);
        }, (error) => {
            // checks if it's connection error or 
            // user denied geolocation
            if(error.message.includes('User denied')) {
                this.setState({
                    geolocationError: true
                })
            } else {
                this.setState({
                    connectionError: true
                })
            }
        })

    }

    collectFlightData = (url) => {

        getFlights(url)
            .then(data => {
                this.setState({
                    flights: data.sort(function (a, b) { return b.altitude - a.altitude }),
                    refreshId: setTimeout(() => this.collectFlightData(url), 60000),
                    loading: false
                })
            })
            .catch(() => {
                this.setState({
                    connectionError: true
                })
            })

    }


    handleClick = (event) => {
        let flightData = event.currentTarget.getAttribute('data');
        sessionStorage.setItem('flight', flightData);
        this.props.history.push("/details");
    }

    componentWillUnmount() {
        clearTimeout(this.state.refreshId);
    }

    render() {

        return (
            <React.Fragment>
                {!this.state.connectionError
                    ? !this.state.geolocationError
                        ? !this.state.loading
                            ? this.state.flights.length
                                ? <table className="container centered">
                                        <thead>
                                            <tr>
                                                <th>Heading</th>
                                                <th>Altitude(ft)</th>
                                                <th>Flight number</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.flights.map((el, index) => {
                                                return <tr key={index} data={JSON.stringify(el)} onClick={this.handleClick}>
                                                    <td className={el.heading}><img width="50px" src={el.heading === 'east' ? travel : travel_west} alt="" /></td>
                                                    <td>{el.altitude}</td>
                                                    <td>{el.flightNumber}</td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                : <h2 className="error">There's no fligts at your location at the moment!</h2>
                            : <Loader />
                        : <GeoError />
                    : <h2 className="error">Connection error!</h2>}
            </React.Fragment>
        )
    } 
}

export default FlightList;