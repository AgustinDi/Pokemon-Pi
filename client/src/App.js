import './App.css';
import { Route } from 'react-router-dom';
import React from "react";
import HomePage from './Components/HomePage';
import PaginaInicial from './Components/PaginaInicial';
import CreatePokemon from './Components/CreatePokemon';
import DetailedPokemon from './Components/DetailedPokemon';
import Footer from './Components/Footer';
import TopNav from "./Components/TopNav";


function App() {

  return (
    <div>
        <Route exact path='/'>
          <PaginaInicial/>
        </Route>
        <Route path='/home'>
          <TopNav/><HomePage/><Footer/>
        </Route>
        <Route path='/create'>
          <TopNav/><CreatePokemon/><Footer/>
        </Route>
        <Route path='/detailed/:id'>
          <TopNav/><DetailedPokemon/><Footer/>
        </Route>
    </div>
  );
}

export default App;
