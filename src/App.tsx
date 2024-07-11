import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import twaLogo from "./assets/tapps.png";
import viteLogo from "/vite.svg";
import "./App.css";
import WebApp from "@twa-dev/sdk";
import { setupTelegramWebAppClosingConfirmation } from "./lib";
import { sounds } from "./sounds";

function App() {
  const [count, setCount] = useState(0);
  const [link, setLink] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [result, setResult] = useState({});

  function click() {
    if (clicked) return;

    setClicked(true);
    sounds.bgMusic.play();
  }

  WebApp.onEvent("viewportChanged", function (data) {
    setResult(data);
    // stopBgMusic();
  });

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        sounds.bgMusic.pause();
      } else {
        sounds.bgMusic.play();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
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
      <div onClick={() => click()}>
        <a href="https://ton.org/dev" target="_blank">
          <img src={twaLogo} className="logo" alt="TWA logo" />
        </a>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <button
          onClick={() => {
            window.close();
            opener.open("tg://", "_blank");
          }}
        >
          With close
        </button>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Events 19:57</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        {JSON.stringify(result || "")}
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
        <button
          onClick={async () => {
            await setupTelegramWebAppClosingConfirmation(!enabled);
            setEnabled(!enabled);
          }}
        >
          Enable --- {enabled}
        </button>
      </div>
    </>
  );
}

export default App;
