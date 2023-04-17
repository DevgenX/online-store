import Directory from "../../components/categories/directory";
import { Outlet } from "react-router-dom";

const Home = () => {
  // destructured title into title.title or any value
  return (
    <div>
      <Outlet />

      <Directory />
    </div>
  );
};
export default Home;
