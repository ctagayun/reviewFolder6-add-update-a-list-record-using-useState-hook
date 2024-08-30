/*
  Task:
    Incorporate bootstrap 

  Setup: 
    npm install bootstrap
    Once the installation is complete, we can include it in our app’s 
    entry file in main.jsx :
    --  Bootstrap CSS
    import "bootstrap/dist/css/bootstrap.min.css";
    -- Bootstrap Bundle JS
    import "bootstrap/dist/js/bootstrap.bundle.min";

    Now since we created the project with Vite, we can rely 
    on Vite's plugins to integrate ESLint properly. Run the 
    following command
       npm install vite-plugin-eslint --save-dev

    install uuid node package 
       npm install uuid
       
    */

import * as React from 'react';
import Search from './search.jsx';
import './App.css'

import RenderListUsingArrowFunction from "./renderListUsingArrowFunction.jsx";
import RenderListUsingJSFunction from "./renderListUsingJSFunction.jsx";


const initialList = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

 //Create a custom hook called "useStorageState". We will use two hooks 
  //to create it:
  //    1. useState
  //    2. useEffect 

  //The purpose of this custom hook is to save and fetch from the localtorage
  //the values that were inputted in the search box.
  //The actual return value of our custom hook will be displayed in the 
  //search box.

  const useStorageState = (searchKeyParam, deafaultStateParam) => {
    const [theState, stateSetter] = React.useState(
       localStorage.getItem(searchKeyParam) || deafaultStateParam //provides an initial value to the hook.
    );

    //https://react.dev/reference/react/useEffect#useeffect
    //Since the key comes from outside, the custom hook assumes that it could change,
    //so it needs to be included in the dependency array of the useEffect hook as well.
    React.useEffect(() => {
        localStorage.setItem(searchKeyParam, theState);
       },
       [theState, stateSetter] );

    //Custom hooks return values are returned as an array
    return [theState, stateSetter]; 

 } //EOF create custom hook

//Declaration of App component
function App() {

  const welcome = {
     greeting: 'Hey',
     title: "Chito",
  };
  
  let searchKey= 'search';
  let defaultState = 'React'

  //now call our custom hook useLocalStorage to initialize our state 
  //called "searchTerm". The actual return value of our custom hook is:
  //return [theState, stateSetter]. But we can rename it. In this case
  //searchTerm, setSearchTerm respectively
  const [searchTerm, setSearchTerm] = useStorageState(searchKey, defaultState)

  //Now create another state for the initialList list for the 
  //purpose of preserving the initialList list. We are just deleting 
  //the records from localStorage
  const [updatedList, setList] = React.useState(initialList);


  //Function to delete a a record from the initialList list
  const handleDeleteRecord = (item) => {
    console.log(`Item being deleted =  ${item.objectID} ${item.author}`);
    const newList = updatedList.filter(
      (story) => item.objectID !== story.objectID
    );
    setList(newList);
  };

  const searchedList = updatedList.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value); //update state hook variable in this case "searchTerm"
  }

  return (
    <div>
       <h1> 
          {welcome.greeting} {welcome.title}
      </h1>
       
       
       {/* searchTerm is the return value from useStorageState custom hook. */}
      <Search id="search" value={searchTerm}  isFocused  onInputChange={handleSearch} >
         <strong>Searchx:</strong>
      </Search>

       <hr/>

       <RenderListUsingArrowFunction list={searchedList} onRemoveItem={handleDeleteRecord} />
        
    </div>
  )
}

export default App
