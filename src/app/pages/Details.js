import React from 'react';
import findLogo from '../../services/logoService';
import defaultLogo from '../../default_logo.png';

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flightDetails: {},
            companyLogoUrl: '',
            loading: true
        }
    }

    componentDidMount() {
       
        let flightData = sessionStorage.getItem('flight');
        if (flightData) {
            let flightDataObject = JSON.parse(flightData);
            let company = flightDataObject.company;

            findLogo(company)
                .then(data => {
                    // if logo doesnt exist use default logo
                    let logoImg = data || defaultLogo;
                    this.setState({
                        flightDetails: flightDataObject,
                        companyLogoUrl: logoImg,
                        loading: false
                    })

                })
                .catch(() => {
                    this.setState({
                        flightDetails: flightDataObject,
                        companyLogoUrl: defaultLogo,
                        loading: false
                    })
                })
        } else {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div>
                {!this.state.loading
                    ? <div>
                        <p>Manufacturer: {this.state.flightDetails.manufacturer}</p>
                        <p>Model: {this.state.flightDetails.model}</p>
                        <p>Origin: {this.state.flightDetails.origin}</p>
                        <p>Destination: {this.state.flightDetails.destination}</p>
                        <p>Company: {this.state.flightDetails.company}</p>
                        <img src={this.state.companyLogoUrl} alt="" />
                    </div>
                    : <h2>Loading...</h2>
                }
            </div>
        )
    }
}

export default Details;