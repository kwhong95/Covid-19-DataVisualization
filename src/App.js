import React, {useEffect, useState} from 'react';
import './App.css';
import {Card, FormControl, MenuItem, Select} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from './Map';

const App = () => {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/all')
            .then(res => res.json())
            .then(data => {
                setCountryInfo(data);
            });
    }, []);

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
    }, []);

    const onCountryChange = async (e)  => {
        const countryCode = e.target.value;

        setCountry(countryCode);
    }

    return (
        <div className="app">
            <div className="app__leftSide">
                <div className="app__header">
                    <h1>COVID-19 Tracker</h1>
                    <FormControl className="app__dropdown">
                        <Select
                            variant="outlined"
                            value={country}
                            onChange={onCountryChange}
                        >
                            <MenuItem value="worldwide">WorldWide</MenuItem>
                            {countries.map((country, idx) => (
                                <MenuItem
                                    key={idx}
                                    value={country.value}
                                >
                                    {country.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="app__stats">
                    <InfoBox
                        className="app__infoBox"
                        title="확진자 현황"
                        cases={countryInfo.todayCases}
                        total={countryInfo.cases}
                    />
                    <InfoBox
                        className="app__infoBox"
                        title="격리해제 현황"
                        cases={countryInfo.todayRecovered}
                        total={countryInfo.recovered}
                    />
                    <InfoBox
                        className="app__infoBox"
                        title="사망자 현황"
                        cases={countryInfo.todayDeaths}
                        total={countryInfo.deaths}
                    />
                </div>
                <Map />
            </div>
            <Card className="app__rightSide">
                <div className="app__table">
                    국가별 현황
                </div>
                <div className="app__chart">
                    전세계 확진 현황
                </div>
            </Card>
        </div>
    )
}

export default App;