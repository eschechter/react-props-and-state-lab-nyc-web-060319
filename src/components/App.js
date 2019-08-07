import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'
import { throws } from 'assert';

class App extends React.Component {

  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  componentDidMount() {
    fetch("/api/pets")
      .then(resp => resp.json())
      .then(pets => this.setState({ pets }))
  }

  onChangeType = (type) => {
    this.state.filters.type = type
  }

  onFindPetsClick = () => {
    if (this.state.filters.type === 'all') {
      fetch("/api/pets")
        .then(resp => resp.json())
        .then(pets => this.setState({ pets }))
    }
    else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
        .then(resp => resp.json())
        .then(pets => this.setState({ pets }))
    }
  }

  onAdoptPet = (id) => {
    const newPets = [...this.state.pets]
    const indexToChange = newPets.findIndex(
      pet => pet.id === id
    )
    newPets[indexToChange].isAdopted = true;
    this.setState({ pets: newPets })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
