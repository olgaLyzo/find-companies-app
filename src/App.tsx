import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import css from "./scss/app.module.scss";

function PrivateRoute({ isAuthenticated }: { isAuthenticated: boolean }) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
}

export interface AppProps {
  headerComponent: React.ReactNode; 
  authorisationComponent: React.ReactNode; 
  pageSearchingComponent: React.ReactNode; 
  mainComponent: React.ReactNode;
  footerComponent: React.ReactNode;
  articlesPageComponent: React.ReactNode;
  isAuthenticated: boolean; 
	loginComponent: React.ReactNode;
}

function App(props: AppProps) {
  return (
    <Router>
      <div className={css.container}>
        <div>{props.headerComponent}</div>
        <main>
          <Routes>
            <Route path="/" element={props.mainComponent} />
            <Route element={<PrivateRoute isAuthenticated={props.isAuthenticated} />}>
              <Route path="/search" element={props.pageSearchingComponent} />
              <Route path="/articles" element={props.articlesPageComponent} />
            </Route>
            <Route path="/auth" element={props.authorisationComponent} />
            <Route path="/login" element={props.authorisationComponent} />
						<Route path="/" element={props.loginComponent} />
          </Routes>
        </main>
        <footer>{props.footerComponent}</footer>
      </div>
    </Router>
  );
}

export default App;