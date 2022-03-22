import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useEffect } from "react";
import styles from '../styles/Home.module.css'
import { Card, Button } from 'react-bootstrap';
import {set, useForm} from 'react-hook-form';
import getTrackingLink from '../services/tracking';

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

function cleanOrderId (orderId) {
  if (orderId.startsWith("#")) {
    if (orderId[1] != 'G') {
      orderId = 'G' + getOrderIdWithoutHash(orderId);
    } else {
      orderId = getOrderIdWithoutHash(orderId);
    }
  } else if (!orderId.startsWith('G') && !orderId.startsWith('#')){
    orderId = 'G' + orderId;
  }
  return orderId;

}

function PendingOrder(props) {
    const isPending = props.isPending;
    if (isPending) {
        return (
        <div>
            <h4>
                Your Order {document.getElementById('tracking-input').value} is processing. We will let you know once it is shipped !
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
        orderId = cleanOrderId(orderId);      
        let response = await getTrackingLink(orderId);
        var trackingLink = response.trackingLink;
            if (trackingLink) {
                setPendingOrder(false);
                window.open(trackingLink, "_blank");
            } else {
                console.log('No tracking link found !! ');
                setPendingOrder(true);
            }
        }
    
    return (
        <div className={styles.container}>
          <Head>
            <title>Tracking - Grow91</title>
            <link rel="icon" href="/Grow_91_LOGO.png" />
          </Head>
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