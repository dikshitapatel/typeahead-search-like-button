import React from 'react';
import logo from './logo.svg';
import './App.css';
import AutoComplete from './components/AutoComplete';
import LikeComponent from './components/LikeComponent';

const fetchSuggestions = async (query: string) : Promise<any[]> =>{
  console.log("api called" + query);
  let res = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
  let json = await res.json();
  return json.recipes;

}

function App() {
  return (
    <div className="App">
      <div>
      <h2>TypeAhead/ Autocomplete search</h2>
     <AutoComplete
      placeholder={"Enter recipe"}
      fetchSuggestions={fetchSuggestions}
      // dataKey={"name"}
      customLoading = {<>Loading....</>}
      onSelect={(res)=>{console.log(res)}}
      // onChange={(input)=> {console.log(input)}}
     />
      </div>
      <div style={{paddingTop:'500px'}}>
        <LikeComponent/>
      </div>
      <div>
        
      </div>
     
    </div>
  );
}

export default App;
