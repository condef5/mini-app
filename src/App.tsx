import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import twaLogo from "./assets/tapps.png";
import viteLogo from "/vite.svg";
import "./App.css";

import WebApp from "@twa-dev/sdk";

function App() {
  const [count, setCount] = useState(0);
  const [link, setLink] = useState("");

  useEffect(() => {
    // Initialize Telegram WebApp
    const data = JSON.stringify({
      eventType: "web_app_setup_back_button",
      eventData: {
        is_visible: true,
      },
    });

    window.parent.postMessage(data, "https://web.telegram.org");
  }, []);

  function buyStars() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    WebApp.openInvoice(link, (status: any) => {
      switch (status) {
        case "paid":
          console.log("Payment successful");
          // Handle successful payment (e.g., update UI, send confirmation to server)
          break;
        case "failed":
          console.log("Payment failed");
          // Handle failed payment (e.g., show error message)
          break;
        case "cancelled":
          console.log("Payment cancelled");
          // Handle cancelled payment (e.g., ask user if they want to try again)
          break;
        default:
          console.error("Unknown payment status:", status);
      }
    });
  }

  return (
    <>
      <div>
        <a href="https://ton.org/dev" target="_blank">
          <img src={twaLogo} className="logo" alt="TWA logo" />
        </a>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>TWA + Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      {/*  */}
      <div className="card">
        <button
          onClick={() =>
            WebApp.showAlert(`Hello World! Current count is ${count}`)
          }
        >
          Show Alert
        </button>

        <br />

        <input
          placeholder="Set link"
          type="text"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            console.log("input changed");

            // set the link with input value
            setLink(event.target.value);
          }}
        />
        <button onClick={() => buyStars()}>Pay with start</button>
      </div>
    </>
  );
}

export default App;
