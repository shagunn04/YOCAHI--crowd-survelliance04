import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import AdminDashboard from "./AdminDashboard";
import Statistics from "./statistics";
import EnterFace from "./EnterFace";
import LoggedFaces from "./LoggedFaces";
 

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<LoginPage />} />
        <Route path="admin" element={<AdminDashboard/>}>
          <Route path="statistics" element={<Statistics />} />
          <Route path="loggedfaces" element={<LoggedFaces />} />
          <Route path="enterface" index element={<EnterFace/>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;