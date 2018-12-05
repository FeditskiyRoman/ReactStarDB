import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './app.css';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    selectedPerson: null
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    })
  }

  toggleRandomPlanet = () => {
    this.setState({
      showRandomPlanet: !this.state.showRandomPlanet
    });
  }

  render() {

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/>:
      null;

    return (
      <div className="starbdb-app col-md-12">
        <Header />
        { planet }

        <button className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
        </button>
  
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onPersonSelected={this.onPersonSelected}/>
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson}/>
          </div>
        </div>
      </div>
    );
  }
};