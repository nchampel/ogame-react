class PlanetsApi {

    async getPlanetsData() {
        const data = {};
        
        const url = `${process.env.REACT_APP_BACK}/planets/get/`
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                // 'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
            // body: formData,
        });
        //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(response);
        const json = await response.json();
        return json;
    }
    
    async saveResourcesPlanets(planets) {
        const data = { planets };
        
        const url = `${process.env.REACT_APP_BACK}/planets/resources/save/`
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
            // body: formData,
        });
        //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(response);
        const json = await response.json();
        return json;
    }

    async getPlanetsMultiverseData() {
        const data = {};
        
        const url = `${process.env.REACT_APP_BACK}/planets/multiverse/get/`
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                // 'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
            // body: formData,
        });
        //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(response);
        const json = await response.json();
        return json;
    }
    
    async saveResourcesPlanetsMultiverse(planets) {
        const data = { planets };
        
        const url = `${process.env.REACT_APP_BACK}/planets/multiverse/resources/save/`
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
            // body: formData,
        });
        //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(response);
        const json = await response.json();
        return json;
    }
    async getResultsAttack(planet, starshipLevels, resources) {
        const data = { planet, starshipLevels, resources };
        
        const url = `${process.env.REACT_APP_BACK}/planets/multiverse/attack/results/get/`
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
            // body: formData,
        });
        //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(response);
        const json = await response.json();
        return json;
    }

    async SaveDiscoveredPlanet(planet_id) {
        const data = { planet_id };
        
        const url = `${process.env.REACT_APP_BACK}/planets/multiverse/discovered/save/`
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
            // body: formData,
        });
        //   return response.json(); // parses JSON response into native JavaScript objects
        // console.log(response);
        const json = await response.json();
        return json;
    }

    // async getResourcesAttack(planet, resources) {
    //     const data = { planet, resources };
        
    //     const url = `${process.env.REACT_APP_BACK}/planets/multiverse/attack/resources/get/`
    //     const response = await fetch(url, {
    //         method: "POST", // *GET, POST, PUT, DELETE, etc.
    //         mode: "cors", // no-cors, *cors, same-origin
    //         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //         credentials: "same-origin", // include, *same-origin, omit
    //         headers: {
    //             'Content-Type': 'application/json'
    //             // 'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         redirect: "follow", // manual, *follow, error
    //         referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //         body: JSON.stringify(data) // body data type must match "Content-Type" header
    //         // body: formData,
    //     });
    //     //   return response.json(); // parses JSON response into native JavaScript objects
    //     // console.log(response);
    //     const json = await response.json();
    //     return json;
    // }
}

export const planetsApi = new PlanetsApi();