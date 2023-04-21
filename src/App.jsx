import { useEffect, useRef, useState } from 'react';
import { MpSdk, setupSdk } from '@matterport/sdk';
import './App.css';

const App = () => {
  const [sdk, setSdk] = useState();
  const [horizontal, setHorizontal] = useState(45);
  const [vertical, setVertical] = useState(15);
  const container = useRef(null);
  let started = false;

  useEffect(() => {
    if (!started && container.current) {
      started = true;
      setupSdk(import.meta.env.VITE_MP_SDK, {
        container: container.current,
        space: "j4RZx7ZGM6T",
        iframeQueryParams: { qs: 1 },
      }).then(setSdk);
    }
  }, []);

  const rotate = () => {
    sdk?.Camera.rotate(horizontal, vertical);
  };

  return (
    <main className="app">
      <div className="container" ref={container}></div>

      <div className="button-wrap">
        <label>
          <span>Horizontal rotation</span>
          <input
            type="number"
            onInput={(e) => setHorizontal(parseFloat(e.target.value))}
            value={horizontal}
          />
        </label>
        <label>
          <span>Vertical rotation</span>
          <input
            type="number"
            onInput={(e) => setVertical(parseFloat(e.target.value))}
            value={vertical}
          />
        </label>
        <button onClick={rotate}>Rotate</button>
      </div>
    </main>
  );
};

export default App;