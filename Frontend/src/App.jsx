import { Route, Routes } from "react-router-dom";
import { CreateAuthor, Dashboard, Homepage, Register } from "./components";
import { CreateBook, Request, Response, Users } from "./components/home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard/:userId" element={<Dashboard />} />
      <Route path="/dashboard/:userId/create-auther" element={<CreateAuthor />} />
      <Route path="/dashboard/:userId/users" element={<Users />} />
      <Route path="/dashboard/:userId/create-book" element={<CreateBook />} />
      <Route path="/dashboard/:userId/requests" element={<Request />} />
      <Route path="/dashboard/:userId/response" element={<Response />} />

    </Routes>
  );
};

export default App;
