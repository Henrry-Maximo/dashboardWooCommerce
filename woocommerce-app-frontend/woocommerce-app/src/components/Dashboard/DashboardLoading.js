import React from "react";

const AnimatedCircles = () => {
  return (
    <div style={styles.container}>
      <svg style={styles.svg}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <circle
          fill="#DAAA00"
          stroke="#DAAA00"
          stroke-width="15"
          r="15"
          cx="40"
          cy="100"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.4"
          ></animate>
        </circle>
        <circle
          fill="#DAAA00"
          stroke="#DAAA00"
          stroke-width="15"
          r="15"
          cx="100"
          cy="100"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.2"
          ></animate>
        </circle>
        <circle
          fill="#DAAA00"
          stroke="#DAAA00"
          stroke-width="15"
          r="15"
          cx="160"
          cy="100"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="0"
          ></animate>
        </circle>
      </svg>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#282c34", // Adicionando um fundo escuro para destacar as animações
  },
  svg: {
    width: "100px", 
    height: "100px", 
  }
};

export default AnimatedCircles;
