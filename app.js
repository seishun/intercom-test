const geolib = require('geolib');
const getStdin = require('get-stdin');

const office = {
  latitude: 53.339428,
  longitude: -6.257664
};

getStdin().then(str => {
  const customers = str.split('\n').map(JSON.parse).filter((c) => {
    // getDistance takes objects with "longitude" and "latitude" properties
    // the customer records have those properties, so we can pass them as-is
    const distance = geolib.getDistance(office, c);
    return distance <= 100000;
  });
  customers.sort((a, b) => a.user_id - b.user_id);
  customers.forEach((c) => console.log(c.name, c.user_id));
});
