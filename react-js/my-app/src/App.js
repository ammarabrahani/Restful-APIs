import "./App.css";

import ChildComponent from "./components/child";
import { useState } from "react";
import GetAPI from "./hooks/apis";

function App() {
  const [counter, setCounter] = useState(0);
  const { data, loading } = GetAPI();

  console.log(data, loading);
  return (
    <div className="App">
      {loading > "asdasa"}
      counter value: {counter}
      <ChildComponent setCounter={setCounter} counter={counter} />
    </div>
  );
}

export default App;
