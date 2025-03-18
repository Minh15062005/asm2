import { useState } from "react";

function DoUseState(){

  const [counter,setCounter] = useState<number>(0);

  const handleTang = ()=>{
    setCounter((prev: number)=>{
      return prev+1
    })
    // setCounter((prev: number)=> prev +1)
    // setCounter((prev: number)=> prev +1)
  }

  return (
    <>
      <h1>useState</h1>

      <h2>{counter}</h2>
      <button onClick={handleTang}>Tăng</button>
      <button onClick={()=>{
        setCounter(counter-1)
      }}>Giảm</button>
      <button onClick={()=>{
        setCounter(0)
      }}>Reset</button>
    </>
  )
}

export default DoUseState;
