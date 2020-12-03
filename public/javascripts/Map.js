const getMaps = (data) => {
    const parseLatitude = JSON.parse(data);
    console.log(parseLatitude);


    var map = L.map('mapid').setView([15, 101], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
 
        
    for (const key in parseLatitude) {

        var circle = L.circle([parseLatitude[key].lat, parseLatitude[key].long],
             {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 100000
            
        }).addTo(map);
        circle.bindPopup(`${parseLatitude[key].country}  Confirmed:${parseLatitude[key].confirmed}`);
         
      
    
    }

}
