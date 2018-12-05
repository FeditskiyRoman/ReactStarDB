export default class SwapiService {
  _apiBase = 'https://swapi.co/api';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
  
    if(!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status} `);
    }
  
    return await res.json();
  }

  async getAllPeople() {
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPerson);
  }

  async getPerson(id) {
    const res = await this.getResource(`/people/${id}/`)
    return this._transformPerson(res);
  }

  async getAllPlanets() {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet);
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  }

  async getAllStarships() {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._transformStarship);
  }

  async getStarship(id) {
    const res = await this.getResource(`/starships/${id}/`);
    return this._transformStarship(res);
  }

  _extractId(item) {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  }

  _transformPlanet(planet) {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    }
  }

  _transformPerson(person) {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    }
  }

  _transformStarship(starships) {
    return {
      id: this._extractId(starships),
      name: starships.name,
      model: starships.model,
      manufacturer: starships.manufacturer,
      costInCredits: starships.cost_in_credits,
      length: starships.length,
      crew: starships.crew,
      passengers: starships.passengers,
      cargoCapacity: starships.cargo_capacity
    }
  }
}
