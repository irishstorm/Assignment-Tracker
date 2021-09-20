import React, { useState } from "react";
import Navbar from "./components/layout/navbar/navbar";
import Footer from "./components/layout/footer/footer";
import Assignments from "./components/assignments/Assignments";
import { Status } from "./hooks/assignment-hook";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filter, setFilter] = useState<Status>();

  return (
    <div className="App">
      <Navbar />
      <Assignments statusFilter={filter} />
      <Footer />
    </div>
  );
}

export default App;
