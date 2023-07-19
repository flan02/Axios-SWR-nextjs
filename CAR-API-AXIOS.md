# Ahora vamos a trabajar con una API de automoviles pero con Typescript
# Si todo avanza bien usaremos primeReact y sass

### El fragmento de codigo para consumir la API es:
** https://rapidapi.com/carapi/api/car-api2/

###### Ejemplo
*
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://car-api2.p.rapidapi.com/api/vin/KNDJ23AU4N7154467',
  headers: {
    'X-RapidAPI-Key': '40501d802amsh9124ec0ae896da6p133112jsncddda017cfcb',
    'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
*