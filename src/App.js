import React, {useEffect, useState} from 'react';
import './App.css';
import {FormControl, MenuItem, Select} from "@material-ui/core";

const App = () => {
    const [countries, setCountries] = useState([]);
    console.log(countries)

    useEffect(() => {
        // async -> Send a request, wait for it, do something with info
        const getCountriesData = async () => {
            await fetch('https://disease.sh/v3/covid-19/countries')
                .then(res => res.json())
                .then(data => {
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2
                    }));

                    setCountries(countries);
                });
        }
        getCountriesData();
    }, [])

    return (
        <div className="app">
            <div className="app__header">
                <h1>COVID-19 Tracker</h1>
                <FormControl className="app__dropdown">
                    <Select defaultValue="WorldWide">
                        {countries.map(country => (
                                <MenuItem value={country.value}>{country.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}

export default App;