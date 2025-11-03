import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import css from "./scss/app.module.scss";
import { isAuthenticated } from "./utils/auth";
import { AuthProvider } from "./context/AuthContext";

export function PrivateRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/auth" />;
}

export interface AppProps {
  headerComponent: React.ReactNode; 
  authorisationComponent: React.ReactNode; 
  pageSearchingComponent: React.ReactNode; 
  mainComponent: React.ReactNode;
  footerComponent: React.ReactNode;
  articlesPageComponent: React.ReactNode;
}

function App(props: AppProps) {
  return (
		<AuthProvider>
			<Router>
				<div className={css.container}>
					<header>{props.headerComponent}</header>
					<main>
						<Routes>
							<Route path="/" element={props.mainComponent} />
							<Route element={<PrivateRoute />}>
								<Route path="/search" element={props.pageSearchingComponent} />
								<Route path="/articles" element={props.articlesPageComponent} />
							</Route>
							<Route path="/auth" element={props.authorisationComponent} />
							<Route path="/login" element={props.authorisationComponent} />
						</Routes>
					</main>
					<footer>{props.footerComponent}</footer>
				</div>
			</Router>
		</AuthProvider>
  );
}

export default App;