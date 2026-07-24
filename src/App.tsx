import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import css from "./scss/app.module.scss";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import ScrollToHash from "./components/ScrollToHash";

export function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated 
    ? <Outlet /> 
    : <Navigate to="/auth" replace />;
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
    <Router>
      <AuthProvider>
				<ScrollToHash />
        <div className={css.container}>
          <header>{props.headerComponent}</header>
          <main>
            <Routes>
              <Route 
                path="/" 
                element={props.mainComponent} 
              />
              <Route element={<PrivateRoute />}>
                <Route 
                  path="/search" 
                  element={props.pageSearchingComponent} 
                />
                <Route 
                  path="/articles" 
                  element={props.articlesPageComponent} 
                />
              </Route>
              <Route 
                path="/auth" 
                element={props.authorisationComponent} 
              />
              <Route 
                path="/login" 
                element={props.authorisationComponent} 
              />
            </Routes>
          </main>
          <footer>{props.footerComponent}</footer>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;