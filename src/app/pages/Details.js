import React from 'react';
import findLogo from '../../services/logoService';
import defaultLogo from '../../img/default_logo.png';
import Loader from '../partials/Loader';
import {Link} from 'react-router-dom';
import arrow from '../../img/left_arrow.svg';


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
            // redirectio to "/" if user manually entered url
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.loading
                    ? <div className="row" id="details-card">
                        <div className="col m6 offset-m3">
                            <div className="card horizontal">
                                <div className="card-image">
                                    <img src={this.state.companyLogoUrl} alt="" />
                                </div>
                                <div className="card-content">
                                    <p>Manufacturer: <span>{this.state.flightDetails.manufacturer}</span></p>
                                    <p>Model: <span>{this.state.flightDetails.model}</span></p>
                                    <p>Origin: <span>{this.state.flightDetails.origin}</span></p>
                                    <p>Destination: <span>{this.state.flightDetails.destination}</span></p>
                                    <p>Company: <span>{this.state.flightDetails.company}</span></p>
                                </div>
                            </div>
                        </div>
                        <Link id="arrow" to="/"><img src={arrow} alt=""/></Link>
                    </div>
                    : <Loader />
                }
            </React.Fragment>
        )
    }
}

export default Details;