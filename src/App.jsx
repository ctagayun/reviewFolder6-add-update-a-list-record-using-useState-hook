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
import { v4 as uuidv4 } from 'uuid';

import RenderListUsingArrowFunction from "./renderListUsingArrowFunction.jsx";


const initialList = [
  {
    title: 'React',
    objectID: 0,
  },
  {
    title: 'Redux',
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
     greeting: 'Demo',
     title: "Add Item To List Using Simple Object",
  };
  
  let searchKey= 'search';
  let defaultState = 'React'

  //now call our custom hook useLocalStorage to initialize our state 
  //called "searchTerm". The actual return value of our custom hook is:
  //return [theState, stateSetter]. But we can rename it. In this case
  //searchTerm, setSearchTerm respectively
  const [searchTerm, setSearchTerm] = useStorageState(searchKey, defaultState)

  //Next make the list stateful and add an input field button in the 
  //renderListUsingArrowFunction component
  const [updatedList, updateInitialList] = React.useState(initialList);

  //Before we can add an item, we need to track the "input field's" state, 
  //because without the value from the input field, we don't have any text 
  //to give the item which we want to add to our list. So let's add some 
  //state management to this first:
  const [title, setTitle] = React.useState('');

  //Function to delete a a record from the initialList list
  const handleDeleteRecord = (item) => {
    console.log(`Item being deleted =  ${item.objectID} ${item.author}`);
    const newList = updatedList.filter( //this creates a new array called story
      (story) => item.objectID !== story.objectID
    );
    updateInitialList(newList);
  };
  
  //Function to handle add a record
  //Next, whenever someone clicks the Add button in renderListUsingArrowFunction.jsx , 
  //we can add the title entered into the input field as a new item to the list:

  //We are using object property shorthand initialization here, because the variable 
  //name 'title' equals the object's property name. Then we are using the state updater 
  //function to pass in the new list.
  const handleAddRecord = () => {
    console.log(`Item being Added: ${title}`);
    const newList = updatedList.concat({ title, objectID: uuidv4() }); //updatedList is the useState for initialList
    updateInitialList(newList); //update the state value of the "initialList object" 
    setTitle('');  //reset the input box to null
  };

  //Track changes to the input text box
  const handleChange = (event) => {
     console.log(`Value of title input field: ${event.target.value} `)
     setTitle(event.target.value);
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
         <strong>Search:</strong>
      </Search>

       <hr/>
       <div>
         <input type="text" value={title} onChange={handleChange} />
           <button type="button" className="btn btn-primary" onClick={handleAddRecord}>
             Add
           </button>
        </div>

       {/*We have made the input field "title" a controlled element, because 
         it receives its internal value from React's state now. */}
       <RenderListUsingArrowFunction list={searchedList} 
                             onRemoveItem={handleDeleteRecord}
                             title={title} />

    
        
    </div>
  )
}

export default App
