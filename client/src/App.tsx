import "./App.css";
import { ResumeForm } from "./components/ResumeForm";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="flex justify-center mt-[150px]">
      <ResumeForm />
      <ToastContainer />
    </div>
  );
}

export default App;
