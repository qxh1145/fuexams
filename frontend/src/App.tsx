import { BrowserRouter, Route, Routes } from "react-router";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import Home from "./pages/Home";
import TestPage from "./pages/TestPage";
import { NotFound } from "./pages/error/NotFound";
import { Comingsoon } from "./pages/error/Comingsoon";
import { Toaster } from "sonner";
import SeSubject from "./components/se-subject";
import McSubject from "./components/mc-subject";
import TestLobby from "./pages/TestLobby";
import { TakingTest } from "./pages/TakingTest";
import PrivateRoles from "./components/PrivateRoutes";
import { ROLES } from "./constants/roles";
import CreateExams from "./pages/CreateExams";
import MyExams from "./pages/MyExams";
import UpGradePage from "./pages/UpGradePage";
import FueAi from "./pages/FueAi";
function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          {/*đn dk */}
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/" element={<HomePage />} />

          {/*Page main*/}
          <Route element={<PrivateRoles allowedRoles={[ROLES.ADMIN, ROLES.PREMIUM, ROLES.BASIC]} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/test/:folderid" element={<TestLobby />} />
            {/* <Route path="/exams" element={<ExamsDisplay/>}/> */}


            <Route path="/mc" element={<McSubject />} />
            <Route path="/se" element={<SeSubject />} />
            <Route path="/test/do-test/:slug" element={<TakingTest />} />
            <Route path="/my-exams" element={<MyExams />} />
            <Route path="/upgrade" element={<UpGradePage />} />

            {/*Premium only*/}
            <Route element={<PrivateRoles allowedRoles={[ROLES.ADMIN, ROLES.PREMIUM]} />}>
              <Route path="/subjects-src" element={<Comingsoon />} />
              <Route path="/create-exams" element={<CreateExams />} />
              <Route path="/fue-ai" element={<FueAi />} />

            </Route>
          </Route>



          {/*Error handling */}
          <Route path="*" element={<NotFound />} />
          <Route path="/coming" element={<Comingsoon />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
