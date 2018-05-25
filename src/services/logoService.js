

const findLogo = (company) => {
    return fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${company}`)
    .then(data => {
        return data.json();
    })
    .then(data => {
        if(data.length) {
            return data[0].logo;
        } 
        // else {
        //     throw new Error('no logo');
        // }
    })
}

export default findLogo;