import Flight from "../entities/flight";
import fetchJsonp from 'fetch-jsonp';



const getFlights = (url) => {

    return fetchJsonp(url)
        .then(data => {
            return data.json();
        })
        .then(data => {
            return data.acList.map(el => {
                return new Flight(el);
            })
        })
}

export default getFlights;