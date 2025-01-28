import React from "react";
import { EXTERNAL_GITHUB, EXTERNAL_WEB } from "../constants";

export function App() {
  function openExternal(val: string) {
    //@ts-ignore
    window.electron.openExternal(val);
  }

  return (
    <div className="info_container">
      <p>Tool for practice gesture drawing with time constraints.</p>
      <div>
        <a href="" onClick={() => openExternal(EXTERNAL_GITHUB)}>
          Github
        </a>
      </div>
      <div>
        <a href="" onClick={() => openExternal(EXTERNAL_WEB)}>
          Web version
        </a>
      </div>
      <div className="close_btn">
        <button onClick={() => window.close()}>Close</button>
      </div>
    </div>
  );
}
