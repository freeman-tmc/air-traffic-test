import React from 'react';
import getFlights from '../../services/flightService';


class FlightList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: [],
            refreshId: '',
            geolocationError: false
        }
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                const url = `http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${latitude}&lng=${longitude}&fDstL=0&fDstU=150`;
                this.collectFlightData(url);
            })
        } else {
            this.setState({
                geolocationError: true
            })
        }

    }

    componentWillUnmount() {
        console.log('skidanje');
        clearTimeout(this.state.refreshId);
    }

    collectFlightData = (url) => {
        console.log('counter');
        getFlights(url)
            .then(data => {
                this.setState({
                    flights: data.sort(function (a, b) { return b.altitude - a.altitude }),
                    refreshId: setTimeout(() => this.collectFlightData(url), 60000)
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
                ?
                <table>
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
                                <td id="jeste">{el.heading}</td>
                                <td id="jeste">{el.altitude}</td>
                                <td id="jeste">{el.flightNumber}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
                : <h1>Geolocation is not allowed!</h1>}
            </div>
        )
    }
}

export default FlightList;