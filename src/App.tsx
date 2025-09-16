import React from "react";
import css from "./scss/app.module.scss";
import style from "./scss/main.module.scss";

export interface AppProps {
  headerComponent: React.ReactNode; 
	mainComponent: React.ReactNode; // headerComponent принимает любой React-компонент
}

function App(props: AppProps) {
  return (
    <div className = {css.container}>
			<div className = {css.header}>{props.headerComponent}</div>
      <main className = {style.main}>{props.mainComponent}</main>
    </div>
  );
}
export default App;
