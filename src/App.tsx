import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmailList from "./pages/email_list/EmailListPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmailList />} />
      </Routes>
    </Router>
  );
};

export default App;
