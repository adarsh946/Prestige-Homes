import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Auth from "./pages/auth";
import Home from "./pages/home";
import Layout from "./components/layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
