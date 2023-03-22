import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Rooters from "./pages/rooters/Rooters";

function App() {
  return (
    <div className="App">
      <div className="App--container">
        <BrowserRouter>
          <Rooters />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
