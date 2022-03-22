const axios = require('axios');
import { useState, useEffect } from 'react';
const pickrrAppendQueryParam = 'PICK-271069';

class pickrrTracking {
    static async getOrderDetails(orderId) {
        let url = `https://cfapi.pickrr.com/plugins/tracking/?client_order_id=%23${orderId}`;
        try {
            const response = await axios({
                method: "get",
                url,
                headers: {
                    "Content-Type": 'application/json'
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
}

async function getPickrrTrackingLink(orderId) {
    let response = await pickrrTracking.getOrderDetails(orderId);
    var trackingId = response.tracking_id;
    if (trackingId) {
        return `https://grow91.pickrr.com/#/?tracking_id=${trackingId}`;
    } else {
        return null;
    }

}

// const getPickrrTrackingPage = (orderId) => {
//     const [order, setOrder] = useState(null);
//     const [error, setError] = useState(null);

//     const headers = {
//         "Content-Type": 'application/json'
//     }
//     useEffect(() => {
//         axios.get(`https://cfapi.pickrr.com/plugins/tracking/?client_order_id=${orderId}`, headers).then(res => {
//             setOrder(res.data);
//             console.log(order);
//         }).catch(error => {
//             setError(error);
//         });
//     }, []);

//     if (error) return `Error :: ${error.message}`;
//     if (!order) return null;

//     const trackingId = order.tracking_id;

//     useEffect(() => {
//         window.location.href = `https://grow91.pickrr.com/#/?tracking_id=${order}`;
//     }, []);

//     // return the link to be redirected to
//     return (
//     <div>
//         <h1>This page is not available</h1>
//         <p>You are redirecting to google.com/about</p>
//     </div>
//     )

// }

export default getPickrrTrackingLink