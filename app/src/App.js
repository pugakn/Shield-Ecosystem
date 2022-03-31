import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// COMPONENTS
import HomePage from './components/HomePage';

const drizzle = new Drizzle(drizzleOptions);

function AppRoot() {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
       <DrizzleContext.Consumer>
         {drizzleContext => {
           const { drizzle, drizzleState, initialized } = drizzleContext;
           if (!initialized) {
             return "Please connect using metamask."
           }
           return (
            <Router>
              <Routes>
                {/* Your other routes... */}
                <Route path="/" element={<HomePage/>} />
              </Routes>
            </Router>
           )
         }}
       </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default AppRoot;
