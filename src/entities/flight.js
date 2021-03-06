
const getHeading = (angle) => {
    return angle > 180 ? 'west' : 'east';
}

class Flight {
    constructor(flightData) {
        this.altitude = flightData.Alt;
        this.flightNumber = flightData.Icao;
        this.manufacturer = flightData.Man;
        this.model = flightData.Type;
        this.destination = flightData.To || 'no data';
        this.origin = flightData.From || 'no data';
        this.heading = getHeading(flightData.Trak);
        this.company = flightData.Op;
    }
}

export default Flight;