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
        button.innerText = 'Can you click me?'
        
        button.id = 'mainButton'
        const input = document.createElement("input");
        input.setAttribute("id", "username");
        input.setAttribute("type", "text");
        document.body.appendChild(input);
        const input2 = document.createElement("input");
        input2.setAttribute("id", "username2");
        input2.setAttribute("type", "text");
        document.body.appendChild(input2);
        const input3 = document.createElement("input");
        input3.setAttribute("id", "username3");
        input3.setAttribute("type", "text");
        document.body.appendChild(input3);
        /*
        const label = document.createElement("label");
        label.innerHTML = "Username: ";
        var usernameText = document.getElementById("test");
        label.setAttribute("for", "username");
        label.setAttribute("id","test");

        document.body.insertBefore(label, usernameText);*/
        var x = "";
        var y = "";
        var z = "";
        button.addEventListener('click', () => {
            x  = document.getElementById("username").value;
            y = document.getElementById("username2").value;
            z = document.getElementById("username3").value;
            alert(x + y + z);
          })
        document.body.appendChild(button)
    }
      }
      
    />
    <h1>First Post</h1>
    <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
    );
  }