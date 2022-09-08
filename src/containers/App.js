import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary';

class App extends Component {
    constructor(){
        super()
        this.state = {
            searchfield: '',
            robots: []
        }
    }

    render() {
            const { robots, searchfield } = this.state;
            const filteredRobots = robots.filter( robot => {
                return (robot.name.toLowerCase().includes(searchfield.toLowerCase()));
            })
            if (!robots.length){
                return (
                    <div className='tc'>
                        <h1 className='f2'>RoboFriends</h1>
                        <h1 className='f2'>Loading...</h1>
                    </div>
                );
            } else {
                return(
                    <div className='tc'>
                        <h1 className='f2'>RoboFriends</h1>
                        <SearchBox onSearchChange={this.onSearchChange}/>
                        <Scroll>
                            <ErrorBoundary>
                                <CardList robots={filteredRobots}/>
                            </ErrorBoundary>
                        </Scroll>
                        <h1 className='f4'>Robots delivered by Robohash.org</h1>
                    </div>
                );
            }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }))
    }     

    onSearchChange = (event) =>{
        this.setState({searchfield:event.target.value})
    }
}

export default App;
