import Head from 'next/head';
import Image from 'next/image'
import React, { useState, useEffect, useRef } from "react";
import styles from '../styles/Home.module.css'
import { Card, Button } from 'react-bootstrap';
import {set, useForm} from 'react-hook-form';
import getTrackingLink from '../services/tracking';
import { useRouter } from 'next/router';

const pickrrAppendQueryParam = 'PICK-271069';

function getOrderIdWithoutHash (orderId) {
    if (orderId) {
        if (orderId.includes("#")) {
            return orderId.split('#')[1];
        } else {
            return orderId;
        }
    } else {
        return null;
    };
}


function cleanOrderId (orderId) {
    if (orderId.startsWith("#")) {
        return  getOrderIdWithoutHash(orderId);
    }
    return orderId;
}

function IncorrectOrder(props) {
    const isIncorrect = props.isIncorrect;
    if (isIncorrect) {
        return (
            <div>
                <h4>
                    The Order ID : {document.getElementById('tracking-input').value} provided is incorrect ! Please try again.
                </h4>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}


function ChooseLogo(props) {
    const logo     = props.logo;
    var hostname   = props.domain;
    let regExp     = /\.([^)]+)\./;
    // hostname = "https://tracking.bohoarmy.store";

    if (regExp.exec(hostname) && regExp.exec(hostname)[1] === "techmerch") {
        return (
        <div className={styles.parentDiv}>
            <div>
                <a
                    href="https://techmerch.store/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                <span className={styles.logo}>
                    <Image src="/techmerch.png" alt="Logo" width={130} height={110} />
                </span>
                </a>
            </div>
        </div>
        )
    } else if  (regExp.exec(hostname) && regExp.exec(hostname)[1] === "ramshasultan") {
        return (
            <div className={styles.parentDiv}>
                <div>
                    <a
                        href="https://ramshasultanstore.myshopify.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    <span className={styles.logo}>
                        <Image src="/logo.webp" alt="Logo" width={300} height={100} />
                    </span>
                    </a>
                </div>
            </div>
        )
    } else if (regExp.exec(hostname) && regExp.exec(hostname)[1] === "kattardesi") {
        return (
            <div className={styles.parentDiv}>
                <div>
                    <a
                        href="https://kattar-desi.myshopify.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    <span className={styles.logo}>
                        <Image src="/kattarDesi.png" alt="Logo" width={150} height={150} />
                    </span>
                    </a>
                </div>
            </div>
        )
    } else if (regExp.exec(hostname) && regExp.exec(hostname)[1] === "soviraj") {
        return (
            <div className={styles.parentDiv}>
                <div>
                    <a
                        href="https://soviraj.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    <span className={styles.logo}>
                        <Image src="/soviraj.jpg" alt="Logo" width={150} height={150} />
                    </span>
                    </a>
                </div>
            </div>
        )

    } else if (regExp.exec(hostname) && regExp.exec(hostname)[1] === "thenextdoorbrand") {
        return (
            <div className={styles.parentDiv}>
                <div>
                    <a
                        href="https://thenextdoorbrand.myshopify.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    <span className={styles.logo}>
                        <Image src="/next_door_logo.png" alt="Logo" width={180} height={150} />
                    </span>
                    </a>
                </div>
            </div>
        )
    } else if (regExp.exec(hostname) && regExp.exec(hostname)[1] === "hungrybirds") {
        return (
            <div className={styles.parentDiv}>
                <div>
                    <a
                        href="https://hungrybirds.shop/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    <span className={styles.logo}>
                        <Image src="/hungry_birds_logo.png" alt="Logo" width={300} height={300} />
                    </span>
                    </a>
                </div>
            </div>
        )
    } else if (regExp.exec(hostname) && regExp.exec(hostname)[1] === "bohoarmy") {
        return (
            <div className={styles.parentDiv}>
                <div>
                    <a
                        href="https://bohoarmy.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    <span className={styles.logo}>
                        <Image src="/boho_army.png" alt="Logo" width={200} height={200} />
                    </span>
                    </a>
                </div>
            </div>
        )
    } else if (logo === "cryptobhai") {
        return (
            <div className={styles.parentDiv}>
                <div>
                    <a
                        href="https://shopping.grow91.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    <span className={styles.logo}>
                        <Image src="/grow91.png" alt="Logo" width={128} height={64} />
                    </span>
                    </a>
                </div>
                <div className={styles.vertical_line}></div>
                <div>
                    <a
                        href="https://cryptobhai.store/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    <span className={styles.logo}>
                        <Image src="/CryptoBhai.png" alt="Logo" width={120} height={64} />
                    </span>
                    </a>
                </div>
            </div>
        )
    } else if (logo == "ramsha_sultan") {
        return (
            <div className={styles.parentDiv}>
                <div>
                    <a
                        href="https://ramshasultanstore.myshopify.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    <span className={styles.logo}>
                        <Image src="/logo.webp" alt="Logo" width={300} height={100} />
                    </span>
                    </a>
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.parentDiv}>
                <div>
                    <a
                        href="https://shopping.grow91.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    <span className={styles.logo}>
                        <Image src={`/grow91.png`} alt="Logo" width={128} height={64} />
                    </span>
                    </a>
                </div>
                <div className={styles.vertical_line}></div>
                <div>
                    <a
                        href="https://phootikismat.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    <span className={styles.logo}>
                        <Image src="/phootiKismat.png" alt="Logo" width={128} height={64} />
                    </span>
                    </a>
                </div>
            </div>
        )

    }
}

function ChooseFooter(props) {
    let regExp   = /\.([^)]+)\./;
    let hostname = props.domain;
    // hostname = "https://tracking.bohoarmy.store";
    if (regExp.exec(hostname) && (regExp.exec(hostname)[1] === "kattardesi" || regExp.exec(hostname)[1] === "thenextdoorbrand" || regExp.exec(hostname)[1] === "hungrybirds" || regExp.exec(hostname)[1] === "soviraj" || regExp.exec(hostname)[1] === "bohoarmy")) {
        return (
            <></>
        )
    } else {
        return (
            <>
                 <a
                    href="https://shopping.grow91.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                <span className={styles.logo}>
                    <Image src="/poweredByGrow91.png" alt="Grow91" width={144} height={64} />
                </span>
                </a>
            </>
        )
    }
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
    const router    = useRouter();
    let referer     = null;
    let placeholder = 'Enter Order ID ( G____ | PK_____ )';

    const [isPendingOrder, setPendingOrder]     = useState(false);
    const [isIncorrectOrder, setIncorrectOrder] = useState(false);
    var   [domain, setDomain]                   = useState(null);  
    var   [orderId, setOrderId]                 = useState('');

    if ('orderId' in router.query) {
        orderId = router.query.orderId;
        handleClick();
    }
    if ('referer' in router.query) {
        referer = router.query.referer;
        if (referer === 'cryptobhai') {
            placeholder = 'Enter Order ID ( G_____ | CB_____ )';
        } else if (referer === 'ramsha_sultan') {
            placeholder = 'Enter Order ID ( RS_____ )';
        } else if (referer === 'kattar-desi') {
            placeholder = 'Enter Order ID ( KD_____  )';
        } else if (referer === 'thenextdoor') {
            placeholder = 'Enter Order ID ( ND_____  )';
        } else if (referer === 'hungrybirds') {
            placeholder = 'Enter Order ID ( HB_____  )';
        } else if (referer === 'soviraj') {
            placeholder = 'Enter Order ID ( SV_____  )';
        } else if (referer === 'bohoarmy') {
            placeholder = 'Enter Order ID ( BA_____  )';
        }     
    }     

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setDomain(window.location.href);
            let url = window.location.href;
            if (String(url).includes("techmerch")) {
                placeholder = 'Enter Order ID ( TM____ )';
            } else if (String(url).includes("ramshasultan")) {
                placeholder = 'Enter Order ID ( RS____ )';
            };    
        }
    }, []);

    function handleOnChange(event) {
        var order_id = String(event.target.value).toUpperCase();
        setOrderId(order_id);
        setPendingOrder(false);
        if (order_id.startsWith("PK") || (order_id.startsWith("G")) || (order_id.startsWith("CB")) || (orderId.startsWith("TM"))) {
            setIncorrectOrder(false);
            setOrderId(order_id);
        } else {
            setIncorrectOrder(true);
        }
    }
    
    async function handleClick () {
        // let orderId      = String(document.getElementById('tracking-input').value);
        orderId          = cleanOrderId(orderId);      
        let response     = await getTrackingLink(orderId);
        var trackingLink = response.trackingLink;
        
        if (trackingLink) {
            setPendingOrder(false);
            setIncorrectOrder(false);
            location.href = trackingLink;
        } else {
            console.log('No tracking link found !! ');
            setIncorrectOrder(false);
            setPendingOrder(true);
        }
    }
    
    return (
        <div className={styles.container}>
          <Head>
            <title>Tracking - Grow91</title>
            <link rel="icon" href="/grow91-favicon.png" />
          </Head>
            <main className={styles.main}>  
                <ChooseLogo logo={referer} domain={domain}></ChooseLogo>
                <div className={styles.card}>
                    <h2>
                        Track your Order here !

                    </h2>
                    <br></br>
                    <input className={styles.input} id="tracking-input" styles="width:100%" maxLength={8} value={orderId} onChange={(event) => handleOnChange(event)} type="text" data-id="271069" placeholder={placeholder} required/>
                    <button className={styles.submitButton} id="pickrr-tracking-btn" onClick={handleClick} role="button">Track</button>
                </div> 
                <PendingOrder isPending={isPendingOrder}></PendingOrder>
                <IncorrectOrder isIncorrect={isIncorrectOrder}></IncorrectOrder>
                {/* <script src="https://widget.pickrr.com/script.js"></script> */}
            </main>
            <footer className={styles.footer}>
                <ChooseFooter logo={referer} domain={domain}></ChooseFooter>
            </footer>
        </div>  
    )
}