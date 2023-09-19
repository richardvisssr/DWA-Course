import NewsBlog from "./NewsBlog";
import { useState } from "react";

function App() {
  
  const [visibility, setVisibility] = useState(true);

  return (
        <NewsBlog setVisibility={setVisibility} visibility={visibility}/>  
  );
}

export default App;
