import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { gql } from '@apollo/client';
import { initializeApollo, addApolloState} from '../lib/apolloClient';
import { GET_REPOSITORIES_OF_USER } from '../components/Repositories';
import React, { useState, useEffect } from "react";
import getPickrrTrackingLink from '../services/pickkr';
import getShipRocketTrackingLink from '../services/shipRocket';

const pickrrAppendQueryParam = 'PICK-271069';
function getOrderIdWithoutHash (orderId) {
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

function PendingOrder(props) {
    const isPending = props.isPending;
    if (isPending) {
        return (
        <div>
            <h4>
                Your Order {document.getElementById('tracking-input').value} is processing. We`&apos;`ll let you know once it`&apos;`s shipped !
            </h4>
        </div> 
        );
    } else {
        return (
            <div></div>
        );
    };
}

 
export default function Track() {    
    const [isPendingOrder, setPendingOrder] = useState(false);
    
    async function handleClick () {
        let orderId = String(document.getElementById('tracking-input').value);
        if (orderId.includes("#")) {
            orderId = getOrderIdWithoutHash(orderId);
        }
        var trackingLink = await getShipRocketTrackingLink(orderId);
        if (!trackingLink) {
            trackingLink = await getPickrrTrackingLink(String(orderId.concat('-', pickrrAppendQueryParam)));
            if (!trackingLink) {
                console.log('No tracking link found !! ');
                setPendingOrder(true);
                console.log(isPendingOrder);
            } else {
                // window.location.href = trackingLink;
                setPendingOrder(false);
                window.open(trackingLink, "_blank");
            }
        } else {
            setPendingOrder(false);
            window.open(trackingLink, "_blank");
        };
    }
    
    return (
        <div className={styles.container}>
            <main className={styles.main}>  
                <a
                    href="https://shopping.grow91.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span className={styles.logo}>
                    <Image src="/Grow_91_LOGO.png" alt="Logo" width={128} height={64} />
                    </span>
                </a>
  
                <div className={styles.card}>
                    <h2>
                        Track your Order here !
                    </h2>
                    <input className={styles.input} id="tracking-input" styles="width:100%" type="text" data-id="271069" placeholder='Enter Order ID' />
                    <button className={styles.submitButton} id="pickrr-tracking-btn" onClick={handleClick} role="button">Track</button>
                </div> 
                <PendingOrder isPending={isPendingOrder}></PendingOrder>
                {/* <script src="https://widget.pickrr.com/script.js"></script> */}
            </main>
            <footer className={styles.footer}>
                <a
                    href="https://shopping.grow91.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span className={styles.logo}>
                    <Image src="/poweredByGrow91.png" alt="Grow91" width={144} height={64} />
                    </span>
                </a>
            </footer>
        </div>  

    )
}