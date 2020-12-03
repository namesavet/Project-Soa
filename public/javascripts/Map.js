const getMaps = (data) => {
    const parseLatitude = JSON.parse(data);
    console.log(parseLatitude);



    var map = L.map('mapid').setView([15, 101], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([15, 101]).addTo(map)
   


    for (const key in parseLatitude) {

        if (`${parseLatitude[key].confirmed}` <= 100) {

            var circle = L.circle([parseLatitude[key].lat, parseLatitude[key].long],
                {

                    color: 'green',
                    fillColor: '#61b15a',
                    fillOpacity: 0.5,
                    radius: 100000

                }).addTo(map);
            circle.bindPopup(`${parseLatitude[key].country}  Confirmed:${parseLatitude[key].confirmed}`);
        } else if (`${parseLatitude[key].confirmed}` <= 500) {

            var circle = L.circle([parseLatitude[key].lat, parseLatitude[key].long],
                {

                    color: 'orange',
                    fillColor: '#fc8621',
                    fillOpacity: 0.5,
                    radius: 200000

                }).addTo(map);
            circle.bindPopup(`${parseLatitude[key].country}  Confirmed:${parseLatitude[key].confirmed}`);
        }
        else {
            var circle = L.circle([parseLatitude[key].lat, parseLatitude[key].long],
                {

                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 300000

                }).addTo(map);
            circle.bindPopup(`${parseLatitude[key].country}  Confirmed:${parseLatitude[key].confirmed}`);


        }





    }

}

const getMapscountry = (data) => {
    const parseLatitude = JSON.parse(data);
    console.log(parseLatitude);

    var map = L.map('mapcountry').setView([parseLatitude.lat, parseLatitude.long], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([parseLatitude.lat, parseLatitude.long]).addTo(map)
        .bindPopup(`${parseLatitude.country}`)
        .openPopup();

    if (`${parseLatitude.confirmed}` <= 100) {

        var circle = L.circle([parseLatitude.lat, parseLatitude.long],
            {

                color: 'green',
                fillColor: '#61b15a',
                fillOpacity: 0.5,
                radius: 100000

            }).addTo(map);
        circle.bindPopup(`${parseLatitude.country}`);
    } else if (`${parseLatitude.confirmed}` <= 500) {

        var circle = L.circle([parseLatitude.lat, parseLatitude.long],
            {

                color: 'orange',
                fillColor: '#fc8621',
                fillOpacity: 0.5,
                radius: 100000

            }).addTo(map);
        circle.bindPopup(`${parseLatitude.country}`);
    }
    else {
        var circle = L.circle([parseLatitude.lat, parseLatitude.long],
            {

                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 100000

            }).addTo(map);
        circle.bindPopup(`${parseLatitude.country}`);


    }



}