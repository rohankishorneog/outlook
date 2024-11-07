import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmailListPage from "./pages/email_list/EmailListPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmailListPage />} />
      </Routes>
    </Router>
  );
};

export default App;
