import { useState, useEffect } from 'react';

const axios = require('axios');

// const errorCodes = {"403", "401"}


const shipRocketToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI0NzAxOTcsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjUwMjc4MzA5LCJleHAiOjE2NTExNDIzMDksIm5iZiI6MTY1MDI3ODMwOSwianRpIjoidUd1ZFJyN1BYNnNwUVBzTyJ9.EK6wpKfUXNgS-YZPPYpT4P2N3Y3DKk8Y3ETdU3wofdM";

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
            return null;
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
    let res = await shipRocketOrder.getOrder(orderId);
    if (!res) {
        return null;
    }
    let awb = res.data[0]?.shipments[0]?.awb;
    if (res.data.length == 0 || awb === "") {
        return null;
    } else {
        return `https://grow91.shiprocket.co/tracking/order/${orderId}`;
    };
}

export default getShipRocketTrackingLink