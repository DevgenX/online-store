import Directory from "../../components/categories/directory";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Outlet />
      <Directory />
    </div>
  );
};
export default Home;
