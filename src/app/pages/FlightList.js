import React from 'react';
import getFlights from '../../services/flightService';
import travel from '../../travel.svg';


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
        },
            () => {
                this.setState({
                    geolocationError: true
                })
            })

    }

    componentWillUnmount() {
        clearTimeout(this.state.refreshId);
    }

    collectFlightData = (url) => {

        getFlights(url)
            .then(data => {
                this.setState({
                    flights: data.sort(function (a, b) { return b.altitude - a.altitude }),
                    refreshId: setTimeout(() => this.collectFlightData(url), 60000),
                    loading: false,
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

    render() {

        return (
            <div>
                {!this.state.geolocationError
                    ? !this.state.connectionError
                        ? !this.state.loading
                            ? this.state.flights.length
                                ? <table>
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
                                                    <td><img width="50px" src={travel} alt="" /></td>
                                                    <td>{el.altitude}</td>
                                                    <td>{el.flightNumber}</td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                : <h2>There's no fligts at your location at the moment!</h2>
                            : <p>Loading...</p>
                        : <h2>Server error!</h2>
                    : <div>
                        <h2>Geolocation is not allowed! Please enable geolocation to continue!</h2>
                        <a href="http://waziggle.com/BrowserAllow.aspx" target="_blank" rel="noopener noreferrer">How to enable geolocation?</a>
                      </div>}
            </div>
        )
    }
}

export default FlightList;