import React, { Component } from 'react';
import './App.css';
import { search } from './DataService';
import AutoComplete from './AutoComplete';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      battles: [],
    }
  }

  onSearchChange = (value) => {
    const uniqueLocations = [...new Set(search({ location: value }).map(battle => battle.location))]
    this.setState({ suggestions: uniqueLocations });
  }

  onEnter = (value) => {
    const battles = search({ location: value });
    this.setState({ battles });
  }

  render() {
    const { suggestions, battles } = this.state;
    return (
      <div className="App container">
        <h1 className='titleHeader'>Battle.DB</h1>
        <AutoComplete className='searchBar' suggestions={suggestions} onChange={this.onSearchChange} onEnter={this.onEnter} />
        <div className='result'>
          {battles.map((battle) =>
              <div className='result-unit'>{battle.name}</div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
