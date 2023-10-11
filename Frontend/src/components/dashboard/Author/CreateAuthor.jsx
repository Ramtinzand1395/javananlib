import { useState } from "react";
import AuthorDetails from "./AuthorDetails";
import Sidebar from "../Sidebar";
import CreateAuthorImg from "./CreateAuthorImg";

const CreateAuthor = () => {
  const [AuthorImg, setAuthorImg] = useState("");
  return (
    <div className="flex">
      <Sidebar />
      <div className="mx-10 mt-5">
        <CreateAuthorImg setAuthorImg={setAuthorImg} />
        <AuthorDetails AuthorImg={AuthorImg} />
      </div>
    </div>
  );
};

export default CreateAuthor;
