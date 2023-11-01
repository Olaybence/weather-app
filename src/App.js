import React from "react";
import CityList from "./components/CityList/CityList";
import Clock from "./components/Clock/Clock";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

function App() {
  // TODO: seperate the pages and make the routing
  return (
    <div className="App-body">
      <h1>Stay Weather Informed!</h1>
      <div className="App-first-page">
        <h2>First Page!</h2>
        <CityList />
      </div>
      <div className="App-second-page">
        <h2>Second Page!</h2>
        <TextInput options={["apple", "apricot", "banana", "carrot"]}/>
      </div>
      <div className="App-third-page">
        <h2>Thrid Page!</h2>
        <Clock />
        <WeatherInfo />
      </div>
    </div>
  );
}

export default App;
