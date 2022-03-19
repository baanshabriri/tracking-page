import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { gql } from '@apollo/client'
import { initializeApollo, addApolloState} from '../lib/apolloClient'
import { GET_REPOSITORIES_OF_USER } from '../components/Repositories'

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  const {data} = await apolloClient.query({
    query: GET_REPOSITORIES_OF_USER
  });
  return {
    props : {
      repositories: data.viewer.repositories.nodes.slice(0, 4),
    },
  };
}


export default function Home({repositories}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

      <div>
        <div className={styles.container} id="pickrr-tracking-container">      
	        <div className={styles.container} id="pickrr-tracking-radio-group"> 
            <input type="radio" id="tracking_id" name="pickrr-query-type" value="tracking_id" checked/> 
            <label for="tracking_id">Track ID</label> 
            <input type="radio" id="client_order_id" name="pickrr-query-type" value="client_order_id"/> 
            <label for="client_order_id">Order ID</label> 
          </div>
            <input id="pickrr-tracking-input" data-id="271069" /> 
            <button id="pickrr-tracking-btn">Track</button>
          </div>
        <script src="https://widget.pickrr.com/script.js"></script>
      </div>

        <div className={styles.grid}>
          {repositories.map((repository) => (
            <div key={repository.id} className={styles.card}>
              <h3><a href={repository.url} aria-hidden="true" class="aal_anchor" id="country-name"><svg aria-hidden="true" class="aal_svg" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>{repository.name}</h3>
              <p>
                {repository.name} - {repository.url.slice(0, 500)}
              </p>
            </div>
          ))}
        </div>

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
      {/* <div id="pickrr-tracking-container"> <div id="pickrr-tracking-radio-group"> <input type="radio" id="tracking_id" name="pickrr-query-type" value="tracking_id" checked/> <label for="tracking_id">Track ID</label> <input type="radio" id="client_order_id" name="pickrr-query-type" value="client_order_id"/> <label for="client_order_id">Order ID</label> </div><input id="pickrr-tracking-input" data-id="271069" /> <button id="pickrr-tracking-btn" style="height: 32px; width: 110px; font-size: 15px; padding: 4px 36px; border-radius: 5px; color: #272727; border: 1px solid #fdaf23; background: #fdaf23;">Track</button> </div><script src="https://widget.pickrr.com/script.js"></script> */}
    </div>
  )
}
