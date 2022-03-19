import { useState, useEffect } from 'react';

const axios = require('axios');

// const errorCodes = {"403", "401"}


const shipRocketToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI0NzAxOTcsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjQ3MzQzNjc1LCJleHAiOjE2NDgyMDc2NzUsIm5iZiI6MTY0NzM0MzY3NSwianRpIjoiNUJYU1A1UlliRG5CQjZwdSJ9.Ey-SSdi3u_-g4D3PlMBAT0eY2usblzbJh4V5pcYNAYk";
console.log(shipRocketToken);


class shipRocketTracking {
    static async getTrackingDataFromAWB(idType, param) {
        try {
            const response = await axios({
                method: "get",
                url: `https://apiv2.shiprocket.in/v1/external/courier/track/${idType}/${param}`,
                headers: {
                    "Authorization" : `Bearer ${shipRocketToken}`,
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

    static async getTrackingDataFromOrderId(orderId) {
        try {
            const response = await axios({
                method  : "get",
                url     : `https://apiv2.shiprocket.in/v1/external/courier/track?order_id=${orderId}&channel_id=`,
                headers: {
                    "Content-Type" : 'application/json',
                    "Authorization": `Bearer ${shipRocketToken}` 
                },
            })
            return response;
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.headers);
            } else {
                console.log('Error', error.message);
            }
        }
    }
}


class shipRocketOrder {

    static getOrderIdWithoutHash (orderId) {
        if (orderId) {
            if (orderId.split('#').length > 1) {
                return orderId.split('#')[1];
            } else {
                return null;
            }
        } else {
            return null;
        };
        
    }
    
    static async getOrder(param) {
        try {
            const response = await axios({
                method : "get",
                url    : `https://apiv2.shiprocket.in/v1/external/orders?search=${param}`,
                headers: {
                    "Authorization" : `Bearer ${shipRocketToken}`,
                    "Content-Type": 'application/json'
                },
            })
            return response.data
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

    static async getShipRocketOrderDetails(orderId) {
        try {
            const response = await axios({
                method  : "get",
                url     : `https://apiv2.shiprocket.in/v1/external/orders/show/${orderId}`,
                headers: {
                    "Content-Type" : 'application/json',
                    "Authorization": `Bearer ${shipRocketToken}` 
                }
            })
            return response.data;
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.headers);
            } else {
                console.log('Error', error.message);
            }
        }
    }
    
}

async function getShipRocketTrackingLink (orderId) {
    // const cleanOrderId = shipRocketOrder.getOrderIdWithoutHash(orderId);
    // if (!cleanOrderId) {
    //     return null;
    // }
    let res = await shipRocketOrder.getOrder(orderId);
    let awb = res.data[0]?.shipments[0]?.awb;
    if (!(awb === "")) {
        return `https://grow91.shiprocket.co/tracking/order/${orderId}`;
    } else {
        return null;
    }

}

// const getTrackingDeets = (orderId) => {
//     const cleanOrderId      = shipRocketOrder.getOrderIdWithoutHash(orderId);
//     const [trackingOrderId, setTrackingOrderId] = useState(null);
//     const [trackingLink, setTrackingLink]       = useState(null);

//     useEffect(() => {
//         shipRocketOrder.getOrder(cleanOrderId).then(res => {
//             setTrackingOrderId(res.data[0]?.id);
//         });
//     }, []);

//     if (!trackingOrderId) return null;

//     useEffect(() => {
//         window.location.href = `https://grow91.shiprocket.co/tracking/order/${cleanOrderId}`;
//     })

//     // useEffect(() => {
//     //     shipRocketTracking.getTrackingDataFromOrderId(trackingOrderId).then(response => {
//     //         const data = response.data;
//     //         setTrackingLink(data);
//     //     });
//     // });
    
//     // if (!trackingLink) return null;
//     return (
//     <div>
//         <h1>This page is not available</h1>
//         <p>You are redirecting to google.com/about</p>
//     </div>
//     )
// }

// getTrackingDetails("G23823");

export default  getShipRocketTrackingLink