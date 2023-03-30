import { useEffect, useState } from 'react';

import CardList      from '../components/CardList.js';
import ErrorBoundary from '../components/ErrorBoundary.js';
import Scroll        from '../components/Scroll.js';
import SearchBox     from '../components/SearchBox.js';

import './App.css';

export default function App() {
    const [robots, setRobots] = useState([]);
    const [searchField, setSearchField] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => setRobots(users))
            .catch(err => console.log('Error:', err));
    }, []);

    function onSearchChange(event) {
        setSearchField(event.target.value);
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name
                .toLowerCase()
                .includes(searchField.toLowerCase());
    });

    return !robots.length ?
        <h1>Loading...</h1> :
        (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox onSearchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
}

/*** end of file ***/