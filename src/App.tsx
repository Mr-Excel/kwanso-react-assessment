import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserListing } from "@components/organisms";
import { UserProfile } from "@components/pages/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserListing />} />
        <Route path="/user/:uuid" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
