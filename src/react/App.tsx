import { Link } from "react-router-dom";
const App = () => {
  return (
    <div>
      <div>
        <Link to={"/long"}>long</Link>
      </div>
      <div>
        <Link to={"/optimization"}>optimization</Link>
      </div>
      <div>
        <Link to={"/context"}>context</Link>
      </div>
      <div>
        <Link to={"/lazy"}>lazy</Link>
      </div>
      <div>
        <Link to={"/memo"}>memo</Link>
      </div>
      <div>
        <Link to={"/useReducer"}>useReducer</Link>
      </div>
      <div>
        <Link to={"/redux"}>redux</Link>
      </div>
      <div>
        <Link to={"/effect"}>effect</Link>
      </div>
    </div>
  );
};
export default App;