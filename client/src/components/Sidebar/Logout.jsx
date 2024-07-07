import { CgLogOut } from "react-icons/cg";
import useLogout from "../../hooks/useLogout.js";
const LogoutButton = () => {
  const { loading, logout } = useLogout();
  return (
    <button
      className="logout mt-auto btn btn-circle hover:bg-red-950"
      onClick={logout}
    >
      {
        loading 
        ? <span className="loading loading-spinner"></span> 
        : <CgLogOut />
      }
    </button>
  );
};

export default LogoutButton;
