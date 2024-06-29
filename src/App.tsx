import { useState } from "react";
import reactLogo from "./assets/react.svg";
import twaLogo from "./assets/tapps.png";
import viteLogo from "/vite.svg";
import "./App.css";

import WebApp from "@twa-dev/sdk";

function App() {
  const [count, setCount] = useState(0);

  // Define the possible statuses for better type safety

  function buyStars() {
    const botUsername = "@m3700_bot"; // Replace with your bot's username
    if (!botUsername) {
      console.error("Bot username is not defined.");
      return;
    }

    const invoiceLink = `https://t.me/${botUsername}?start=invoice_${37}`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    WebApp.openInvoice(invoiceLink, (status: any) => {
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
        <button onClick={() => buyStars()}>Show Payments</button>
      </div>
    </>
  );
}

export default App;
