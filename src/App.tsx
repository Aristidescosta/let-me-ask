import { Home } from "./pages/Home";
import { NewRom } from "./pages/NewRom";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms/new" element={<NewRom />} />
        <Route path="/rooms/:id" element={<Room />}/>
        <Route path="/admin/rooms/:id" element={<AdminRoom/>}/>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
