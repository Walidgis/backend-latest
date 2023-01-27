import React, { useState } from 'react';

function AppleComponent() {

    const [numberOfApples, setNumberOfApples] = useState(2+3);

    function AppleDisplay(numberOfApples) {
        if (numberOfApples===0 || numberOfApples===1) {
          return `Walid has ${numberOfApples} apple`;
        }
        else if (numberOfApples>1){
          return `Walid has ${numberOfApples} apples`;
        }
        else {
          return `Walid owes us ${Math.abs(numberOfApples)} apples`
        }
      }

      function IncreaseApple(){
        setNumberOfApples((currentValue) => currentValue + 1 )
      }

      function DecreaseApple(){
        setNumberOfApples((currentValue) => currentValue - 1 )
      }

      function tooManyDisplay (){
        if (numberOfApples > 10) {
    return  <h1>walid has too many apples</h1>;
        } else {
            return "";
        }
      }

    return (
        <>
        <div>
        <h1>{AppleDisplay(numberOfApples)}</h1>
      </div>
      <button
       onClick = {IncreaseApple} 
       className='add-btn'>
        Increase
        </button>
      <button
       style={{display: numberOfApples<= 0 ? "None" : "" }} 
      onClick = {DecreaseApple}
      className='decrease-btn'>
        Decrease
        </button>
      {/* {tooManyDisplay()} */}
      {numberOfApples > 10 ? <h1>walid has too many apples</h1> : ""}
      </>
    );
}

export default AppleComponent;