import React, {useEffect, useState} from 'react';
import './App.css';
import {Card, CardContent, FormControl, MenuItem, Select} from "@material-ui/core";
import numeral from 'numeral'
import InfoBox from "./InfoBox";
import Map from './Map';
import Table from './Table';
import { sortData, prettyPrintStat } from "./util";
import 'leaflet/dist/leaflet.css';
import LineGraph from "./LineGraph";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [casesType, setCasesType] = useState('cases');
    const [mapCountries, setMapCountries] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 37.56667, lng: 126.97806 })
    const [mapZoom, setMapZoom] = useState(3);

    console.log(mapCenter);

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
                    let sortedData = sortData(data)
                    setCountries(countries);
                    setTableData(sortedData);
                    setMapCountries(data);
                });
        }
        getCountriesData();
    }, []);

    const onCountryChange = async (e)  => {
        const countryCode = e.target.value;
        setCountry(countryCode);

        const url =
            countryCode === 'worldwide'
                ? "https://disease.sh/v3/covid-19/all"
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        if (countryCode === 'worldwide') {
            setMapZoom(3);
            setMapCenter([37.56667, 126.97806]);
        } else {
            await fetch(url)
                .then(res => res.json())
                .then(data => {
                    setCountry(countryCode);
                    setCountryInfo(data);
                    setMapCenter([data.countryInfo.lat, data.countryInfo.long])
                    setMapZoom(4);
                });
        }
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
                        cases={prettyPrintStat(countryInfo.todayCases)}
                        total={numeral(countryInfo.cases).format("0,0a")}
                        onClick={e => setCasesType('cases')}
                        isRed
                        active={casesType === 'cases'}
                    />
                    <InfoBox
                        className="app__infoBox"
                        title="격리해제 현황"
                        cases={prettyPrintStat(countryInfo.todayRecovered)}
                        total={numeral(countryInfo.recovered).format("0,0a")}
                        active={casesType === 'recovered'}
                        onClick={e => setCasesType('recovered')}
                    />
                    <InfoBox
                        className="app__infoBox"
                        title="사망자 현황"
                        cases={prettyPrintStat(countryInfo.todayDeaths)}
                        total={numeral(countryInfo.deaths).format("0,0a")}
                        isRed
                        active={casesType === 'deaths'}
                        onClick={e => setCasesType('deaths')}
                    />
                </div>
                <Map
                    countries={mapCountries}
                    casesType={casesType}
                    center={mapCenter}
                    zoom={mapZoom}
                />
            </div>
            <Card className="app__rightSide">
                <CardContent>
                    <div className="app__information">
                        <h3>국가별 현황</h3>
                        <Table countries={tableData} />
                        <h3>전세계 {casesType}</h3>
                        <LineGraph className="app__graph" casesType={casesType} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default App;