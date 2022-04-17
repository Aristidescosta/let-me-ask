import { Home } from "./pages/Home";
import { NewRom } from "./pages/NewRom";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Room } from "./pages/Room";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms/new" element={<NewRom />} />
        <Route path="/rooms/:id" element={<Room />}/>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
