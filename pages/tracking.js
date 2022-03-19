import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useEffect } from "react";
import styles from '../styles/Home.module.css'
import getPickrrTrackingLink from '../services/pickkr';
import getShipRocketTrackingLink from '../services/shipRocket';

const pickrrAppendQueryParam = 'PICK-271069';

async function handleClick () {
    const orderId = document.getElementById('pickrr-tracking-input').value;
    var trackingLink = await getShipRocketTrackingLink(orderId);
    console.log(trackingLink);
    if (!trackingLink) {
        trackingLink = await getPickrrTrackingLink(String(orderId.concat('-', pickrrAppendQueryParam)));
        console.log(trackingLink);
        if (!trackingLink) {
            return (
                <div>
                    <h1>This page is not available</h1>
                    <p>You are redirecting to google.com/about</p>
                </div>
            )
        } else {
            // window.location.href = trackingLink;
            window.open(trackingLink, "_blank");
        }
    } else {
        window.open(trackingLink, "_blank");
    };





    // getShipRocketTrackingLink(orderId).then(rocketResponse => {
    //     console.log(`RocketResponse  :: ${rocketResponse}`);
    //     if (!rocketResponse) {
    //         getPickrrTrackingLink(orderId.concat('-', pickrrAppendQueryParam)).then(pickrrResponse => {
    //             console.log(`PickrrResponse  :: ${pickrrResponse}`);
    //             if (!pickrrResponse) {
    //                 return (
    //                         <div>
    //                             <h1>This page is not available</h1>
    //                             <p>You are redirecting to google.com/about</p>
    //                         </div>
    //                     )
    //             } else {
    //                 window.location.href = pickrrResponse;
    //             }
    //         });
    //     } else {
    //         window.location.href = rocketResponse;
    //     }
    // });
}

// function onTrackingClick() {
//     const orderId = document.getElementById('pickrr-tracking-input').value;
//     const [trackingLink, setTrackingLink] = useState(null);
//     console.log(orderId);
//     useEffect(() => {
//         getTrackingDetails(orderId).then(response => {
//             setTrackingLink(response);
//         });
//     });

//     if (!trackingLink) {
//         useEffect(() => {
//             getPickrrTrackingPage(String(orderId).concat('-', pickrrAppendQueryParam)).then(response => {
//                 setTrackingLink(response);
//             });

//         if (!trackingLink) {
//             return (
//                 <div>
//                     <h1>This page is not available</h1>
//                     <p>You are redirecting to google.com/about</p>
//                 </div>
//             )       
//         } else {
//             useEffect(() => {
//                 window.location.href = trackingLink;
//             }, []);    
//         }
//         });
//     } else {
//         useEffect(() => {
//             window.location.href = trackingLink;
//         }, []);

//         return (
//             <div>
//                 <h1>This page is not available</h1>
//                 <p>You are redirecting to google.com/about</p>
//             </div>
//         )
//     }
// }


export default function Track() {    
    return (
        <div className={styles.container}>
            <Head>
                <h1 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>
                <p className={styles.description}>
                    Get started by editing{' '}
                <code className={styles.code}>pages/index.js</code>
                </p>

            </Head>
            <main className={styles.main}>
                {/* <br>
                </br> */}
                <div className={styles.container} id="pickrr-tracking-container">      
                    <div className={styles.container} id="pickrr-tracking-radio-group"> 
                        {/* <input type="radio" id="tracking_id" name="pickrr-query-type" value="tracking_id" checked/> 
                        <label for="tracking_id">Track ID</label>  */}
                        <input type="radio" id="client_order_id" name="pickrr-query-type" value="client_order_id"/> 
                        <label for="client_order_id">Order ID</label> 
                    </div>
                    <input id="pickrr-tracking-input" data-id="271069"/> 
                    <button id="pickrr-tracking-btn" onClick={handleClick}>Track</button>
                </div>
                {/* <script src="https://widget.pickrr.com/script.js"></script> */}
            </main>
            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                    <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a>
            </footer>
        </div>  

    )
}