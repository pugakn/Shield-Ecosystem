import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// COMPONENTS
import HomePage from './components/HomePage';

const drizzle = new Drizzle(drizzleOptions);


// !Hack
// Drizzle is not prepared to handle the speed of the telos EVM, so we need to hack it. :=)
DrizzleContext.Provider.prototype.componentDidMount = function(){
  const { drizzle } = this.props;
  // subscribe to changes in the store, keep state up-to-date
  this.unsubscribe = drizzle.store.subscribe(() => {
    const drizzleState = drizzle.store.getState();
    if (drizzleState.drizzleStatus.initialized) {
      const different = (JSON.stringify(drizzleState?.contracts)?.replaceAll('"synced":true','"synced":false')) !== 
                        (JSON.stringify(this.state.drizzleState?.contracts)?.replaceAll('"synced":true','"synced":false'))
      if (different) {
        this.setState({
          drizzleState,
          initialized: true
        });
      }
    }
  });
}

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
