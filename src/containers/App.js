import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSearchField, requestRobots } from '../actions.js';

import CardList      from '../components/CardList.js';
import ErrorBoundary from '../components/ErrorBoundary.js';
import Scroll        from '../components/Scroll.js';
import SearchBox     from '../components/SearchBox.js';

import './App.css';


function App({ store }) {
    const searchField = useSelector((state) => state.searchRobots.searchField);
    const robots      = useSelector((state) => state.requestRobots.robots);
    const isPending   = useSelector((state) => state.requestRobots.isPending);
    const error       = useSelector((state) => state.requestRobots.error);
    const dispatch    = useDispatch();
    
    const onSearchChange = (event) => {
        dispatch(setSearchField(event.target.value));
    }
    
    useEffect(() => {
        dispatch(requestRobots());
    }, [dispatch]);
    
    const filteredRobots = robots.filter(robot => {
        return robot.name
                .toLowerCase()
                .includes(searchField.toLowerCase());
    });

    return isPending ?
        <h1>Loading...</h1> :
        (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox onSearchChange={onSearchChange } />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
}

export default App;

/*** end of file ***/