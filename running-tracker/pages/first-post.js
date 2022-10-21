import Script from 'next/script';
import Link from 'next/link';
export default function FirstPost() {
    return(
    <>
    <Script
      src="https://connect.facebook.net/en_US/sdk.js"
      strategy="lazyOnload"
      onLoad={() =>
        {const button = document.createElement('button')

        // Set the button text to 'Can you click me?'
        button.innerText = 'Can you click me?'
  
        button.id = 'mainButton'
  
        // Attach the "click" event to your button
        button.addEventListener('click', () => {
          // When there is a "click"
          // it shows an alert in the browser
          alert('Oh, you clicked me!')
        })
  
        document.body.appendChild(button)}
      }
      
    />
    <h1>First Post</h1>
    <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
    );
  }