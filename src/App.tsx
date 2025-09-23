import React from "react";
import css from "./scss/app.module.scss";

export interface AppProps {
  headerComponent: React.ReactNode; 
	mainComponent: React.ReactNode;
	footerComponent: React.ReactNode; // headerComponent принимает любой React-компонент
}

function App(props: AppProps) {
  return (
    <div className = {css.container}>
			<div >{props.headerComponent}</div>
      <main >{props.mainComponent}</main>
			<footer>{props.footerComponent}</footer> 
    </div>
  );
}
export default App;
