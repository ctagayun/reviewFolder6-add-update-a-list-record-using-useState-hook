import * as React from "react";

//Declaration of RenderListUsingJSFunction component
function RenderListUsingJSFunction(props) {
  return (
    <div>
        <h2>Printed by JS Function</h2>
        <ul>
          {props.list.map (function (item){ //using JS function
             return (
              <li key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
            </li>
             );
            })}
         </ul>
     

    </div>

  );

};

export default RenderListUsingJSFunction;