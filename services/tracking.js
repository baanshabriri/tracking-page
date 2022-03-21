const axios = require('axios');

async function  getTrackingLink(orderId) {
    try {
        const response = await axios({
            method: "get",
            url: `/api/trackinglink?orderId=${orderId}`,
            headers: {
                "Content-Type"  : 'application/json'
            },
        })
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else {
            console.log('Error', error.message);
        }
    }
}

export default getTrackingLink