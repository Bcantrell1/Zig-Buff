const axios = require('axios');

module.exports = {
    info: (req, res) => {
        try {
            const accountId = req.params.id;
            return axios.get(`https://api.opendota.com/api/players/${accountId}`)
                .then(data => {
                    return res.json(data.data);
                }
                ).catch(error => res.json(error))
        } catch (error) {
            res.send(error);
        }
    },
}