import React, { useEffect, useState } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";

const App = () => {
  const [searchfield, setSearchfield] = useState("");
  const [robots, setRobots] = useState([]);

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setRobots(users));
  }, []);

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  });

  if (!robots.length) {
    return (
      <div className="tc">
        <h1 className="f2">RoboFriends</h1>
        <h1 className="f2">Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="tc">
        <h1 className="f2">RoboFriends</h1>
        <SearchBox onSearchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
        <h1 className="f4">Robots delivered by Robohash.org</h1>
      </div>
    );
  }
};

export default App;
