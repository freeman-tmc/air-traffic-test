import React from 'react';

const GeoError = () => {

    return (
        <div className="error">
            <h2>Geolocation is not allowed! Please enable geolocation to continue!</h2>
            <a href="http://waziggle.com/BrowserAllow.aspx" target="_blank" rel="noopener noreferrer">How to enable geolocation?</a>
        </div>
    )
}

export default GeoError;