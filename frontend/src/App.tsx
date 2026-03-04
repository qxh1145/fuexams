import { BrowserRouter, Route, Routes } from "react-router"; // Lưu ý: check lại thư viện là react-router-dom hay react-router
import { Toaster } from "sonner";

// Pages
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import Home from "./pages/Home";
// import TestPage from "./pages/TestPage"; // Unused
import TestLobby from "./pages/TestLobby";
import { TakingTest } from "./pages/TakingTest";
import CreateExams from "./pages/CreateExams";
import MyExams from "./pages/MyExams";
import UpGradePage from "./pages/UpGradePage";
import FueAi from "./pages/FueAi";
import AdminDashBoard from "./pages/AdminDashBoard";
import UserList from "./pages/admin/UserList";

// Components & Errors
import SeSubject from "./components/se-subject";
import McSubject from "./components/mc-subject";
import PrivateRoles from "./components/PrivateRoutes";
import { NotFound } from "./pages/error/NotFound";
import { Comingsoon } from "./pages/error/Comingsoon";
import { ROLES } from "./constants/roles";
import ModifyUserPage from "./pages/admin/ModifyUserPage";
import TransactionTable from "./pages/admin/TransactionTable";
import { IncomeChart } from "./pages/admin/IncomeChart";

function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Trang lỗi chung cho public */}
          <Route path="/coming" element={<Comingsoon />} />

          {/* --- PROTECTED ROUTES (LOGGED IN) --- */}
          {/* Level 1: Basic User trở lên */}
          <Route element={<PrivateRoles allowedRoles={[ROLES.ADMIN, ROLES.PREMIUM, ROLES.BASIC]} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/test/:folderid" element={<TestLobby />} />
            <Route path="/test/do-test/:slug" element={<TakingTest />} />
            
            <Route path="/mc" element={<McSubject />} />
            <Route path="/se" element={<SeSubject />} />
            
            <Route path="/my-exams" element={<MyExams />} />
            <Route path="/upgrade" element={<UpGradePage />} />
          </Route>

          {/* Level 2: Premium & Admin */}
          <Route element={<PrivateRoles allowedRoles={[ROLES.ADMIN, ROLES.PREMIUM]} />}>
            <Route path="/subjects-src" element={<Comingsoon />} />
            <Route path="/create-exams" element={<CreateExams />} />
            <Route path="/fue-ai" element={<FueAi />} />
          </Route>

          {/* Level 3: Admin Only */}
          <Route element={<PrivateRoles allowedRoles={[ROLES.ADMIN]} />}>
            {/* Dashboard chính */}
            <Route path="/admin-dashboard" element={<AdminDashBoard />} />
            
            {/* 👇 SỬA TẠI ĐÂY: Tách UserList và ModifyUser ra làm 2 route riêng biệt ngang hàng */}
            <Route path="/admin-dashboard/user-list" element={<UserList />} />
            <Route path="/admin-dashboard/modify-user" element={<ModifyUserPage />} />
            <Route path="/admin-dashboard/transaction/income-chart" element={<IncomeChart />} />
            <Route path="/admin-dashboard/transaction/orders-list" element={<TransactionTable />}/>
            
            {/* Nếu modify user cần ID (ví dụ: /modify-user/123), hãy dùng dòng dưới: */}
            {/* <Route path="/admin-dashboard/modify-user/:id" element={<ModifyUserPage />} /> */}
          </Route>

          {/* --- 404 NOT FOUND (Catch all) --- */}
          {/* Đặt ở cuối cùng để bắt tất cả các link sai */}
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;