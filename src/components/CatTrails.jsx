import React from "react";
import { bgStyles } from "../styles/theme";

export default function CatTrail() {
  return (
    <div style={bgStyles.cats} aria-hidden="true">
      <div className="cat" style={{ left: "-8%", animationDelay: "0s" }}>
        <img src="/Cats/orange1.gif" alt="cat running" />
      </div>
      <div className="cat" style={{ left: "-12%", animationDelay: "10s" }}>
        <img src="/Cats/orange2.gif" alt="cat running" />
      </div>
      <div className="cat" style={{ left: "-10%", animationDelay: "20s" }}>
        <img src="/Cats/orange3.gif" alt="cat running" />
      </div>
      <div className="cat" style={{ left: "-10%", animationDelay: "30s" }}>
        <img src="/Cats/orange4.gif" alt="cat running" />
      </div>

      <style>{`
        .cat{ position:absolute; bottom:64px; animation: roam 40s linear infinite; }
        .cat img{ height:100px; opacity:.75; display:block; pointer-events:none; }
        @keyframes roam { 0%{ transform: translateX(0) } 100%{ transform: translateX(140vw) } }
      `}</style>
    </div>
  );
}
