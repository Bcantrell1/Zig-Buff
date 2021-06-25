import axios from 'axios';
const accountConvertion = 76561197960265728;

const dotaCalls = (steamId) => {
    const accoutId = steamId - accountConvertion;
    axios.get(`http://localhost:5460/api/v1/${accoutId}`)
        .then((response) => {
            const data = response.data;
            return data;
        })
        .catch(error => console.error(error));
}

export default dotaCalls