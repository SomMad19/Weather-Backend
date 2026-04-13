import 'dotenv/config';
let city = process.argv[2];
 
const token = process.env.MAPBOX_TOKEN;
async function getCoordinates(city) {
  const response = await fetch(
    `https://api.mapbox.com/search/geocode/v6/forward?q=${city}&access_token=${token}`);
  const data = await response.json();
  if (!data.features || data.features.length === 0) {
    console.log("City not found");
    return null;
  }
  const latitude = data.features[0].geometry.coordinates[1];
  const longitude = data.features[0].geometry.coordinates[0];
  return { latitude, longitude };
}
async function getWeather(city) {
  const coords = await getCoordinates(city);
  if (!coords) {
    return;
  }
  const { latitude, longitude } = coords;
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`,
  );
  const data = await response.json();
  const temperature = data.current.temperature_2m;
  console.log(`Temperature at ${city} is ${temperature} degCelsius`);
}
getWeather(city);
