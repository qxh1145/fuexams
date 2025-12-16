import { BrowserRouter, Route, Routes } from "react-router";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import Home from "./pages/Home";
import TestPage from "./pages/TestPage";
import { NotFound } from "./pages/error/NotFound";
import { Comingsoon } from "./pages/error/Comingsoon";
import { Toaster } from "sonner";
function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          {/*đn dk */}
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/*Page main*/}
          <Route path="/home" element={<Home />} />

          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />

          {/*Error handling */}
          <Route path="*" element={<NotFound />} />
          <Route path="/coming" element={<Comingsoon/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
