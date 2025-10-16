import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import css from "./scss/app.module.scss";

export interface AppProps {
  headerComponent: React.ReactNode; 
	authorisationComponent: React.ReactNode; 
	pageSearchingComponent: React.ReactNode; 
	mainComponent: React.ReactNode;
	footerComponent: React.ReactNode; 
}

function App(props: AppProps) {
  return (
		<Router >
			<div className = {css.container}>
				<div >
					{props.headerComponent}
				</div>
				<main >
					<Routes>
						<Route path="/" element={props.mainComponent} />
						<Route path="/auth" element={props.authorisationComponent} />
						<Route path="/search" element={props.pageSearchingComponent} />
					</Routes>
				</main>
				<footer>{props.footerComponent}</footer> 
			</div>
		</Router>
  );
}
export default App;
