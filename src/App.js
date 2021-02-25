import React, {useEffect} from 'react';
import {Cards, Chart, CountryPicker} from './components'
import { fetchData } from './api'

import styles from './App.module.css'

const App = () => {

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className={styles.container}>
            <Cards />
            <Chart />
            <CountryPicker />
        </div>
    )
}

export default App;