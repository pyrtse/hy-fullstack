import React, { useState, useEffect } from 'react';
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY


const Country = ({ country }) => {
  const [weather, setWeather] = useState({})
  const [icons, setIcons] = useState([])
  const query = "http://api.weatherstack.com/current?access_key=" + api_key + "&query=" + country.capital
  useEffect(() => {
    axios
      .get(query)
      .then(response => {
        setWeather(response.data.current)
        setIcons(response.data.current.weather_icons)
      })
  }, [])

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language, i) => <li key={i}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="flag" width="100" />
      <h2>weather in {country.capital}</h2>
      <p><b>temperature:</b> {weather.temperature}</p>
      {icons.map((icon, i) => <img key={i}src={icon} alt="weather icon"/>)}
      <p><b>wind:</b> {weather.wind_speed} MPH direction {weather.wind_dir}</p>
    </div>
  )
}

const Countries = ({ countries, changeFilter }) => {

  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countries.length > 1) {
    return (
      countries.map((country, i) => <div key={i}>{country.name}<button id={country.name} onClick={changeFilter}>show</button></div>)
    )
  } else if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  }
  return (
    <div>vähemmän</div>
  )
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const changeFilter = (event) => {
    console.log(event.target.id)
    setFilter(event.target.id)
  }

  const countriesToShow = countries.filter(country => country.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      find countries <input
        value={filter}
        onChange={handleFilterChange}
      />
      <Countries countries={countriesToShow} changeFilter={changeFilter} />
    </div>
  )
}

export default App 