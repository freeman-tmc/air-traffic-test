import React from 'react';
import findLogo from '../../services/logoService';

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flightDetails: {},
            companyLogoUrl: ''
        }
    }

    componentDidMount() {
        let flightData = sessionStorage.getItem('flight');
        let flightDataObject = JSON.parse(flightData);
        let company = flightDataObject.company;

        findLogo(company)
        .then(data => {
            this.setState({
                flightDetails: flightDataObject,
                companyLogoUrl: data
            })

        })
        // .catch(error => {
        //     this.setState({
        //         flightDetails: flightDataObject,
        //         companyLogoUrl: error.message
        //     })
        // })
    }

    render() {
        return(
            <div>
                <p>Manufacturer: {this.state.flightDetails.manufacturer}</p>
                <p>Model: {this.state.flightDetails.model}</p>
                <p>Destination: {this.state.flightDetails.destination}</p>
                <p>Origin: {this.state.flightDetails.origin}</p>
                <p>Company: {this.state.flightDetails.company}</p>
                <img src={this.state.companyLogoUrl} alt=""/>
            </div>
        )
    }
}

export default Details;