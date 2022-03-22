import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
// import MyComponent from "./MyComponent";
// import "./App.css";
// const App = () => {
  //   return (
    //     <DrizzleContext.Provider drizzle={drizzle}>
    //       <DrizzleContext.Consumer>
    //         {drizzleContext => {
      //           const { drizzle, drizzleState, initialized } = drizzleContext;
      //           if (!initialized) {
        //             return "Loading..."
        //           }
        //           return (
          //             <MyComponent drizzle={drizzle} drizzleState={drizzleState} />
          //           )
          //         }}
          //       </DrizzleContext.Consumer>
//     </DrizzleContext.Provider>
//   );
// }
// export default App;

import {
  PlasmicRootProvider
} from '@plasmicapp/loader-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// COMPONENTS
import HomePage from './components/HomePage';

const drizzle = new Drizzle(drizzleOptions);

function AppRoot() {
  return (
    // <PlasmicRootProvider>
    <DrizzleContext.Provider drizzle={drizzle}>
       <DrizzleContext.Consumer>
         {drizzleContext => {
           const { drizzle, drizzleState, initialized } = drizzleContext;
           if (!initialized) {
             return "Loading..."
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
    // </PlasmicRootProvider>
  );
}

export default AppRoot;
