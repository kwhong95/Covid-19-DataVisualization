import React from 'react';
import {Cards, Chart, CountryPicker} from './components'

import styles from './App.module.css'

const App = () => {

    return (
        <div className={styles.container}>
            <Cards />
            <Chart />
            <CountryPicker />
        </div>
    )
}

export default App;