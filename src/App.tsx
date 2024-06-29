import { useState } from "react";
import reactLogo from "./assets/react.svg";
import twaLogo from "./assets/tapps.png";
import viteLogo from "/vite.svg";
import "./App.css";

import WebApp from "@twa-dev/sdk";

function App() {
  const [count, setCount] = useState(0);

  function buyStars(amount: number) {
    WebApp.showConfirm(
      `Do you want to purchase ${amount} stars?`,
      (confirmed) => {
        if (confirmed) {
          // User confirmed the purchase
          WebApp.sendData(
            JSON.stringify({
              action: "buy_stars",
              amount: amount,
            })
          );
        } else {
          // User canceled the purchase
          console.log("Purchase canceled");
        }
      }
    );
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
        <button onClick={() => buyStars(3)}>Show Payments</button>
      </div>
    </>
  );
}

export default App;
