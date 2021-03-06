import { createContext,useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { auth, firebase } from './services/firebase';


import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import { AuthContextProvider } from './contexts/AuthContext';
import { Room } from './pages/Room';


// O switch faz com que retorne apenas uma rota satisfeita
function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch> 
          <Route path="/" exact component={Home} /> 
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
        </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
