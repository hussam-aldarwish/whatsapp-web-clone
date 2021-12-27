import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { clearMessages, clearRooms } from "../features/chatSlice";

function Logout() {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
    dispatch(clearMessages());
    dispatch(clearRooms());
    router.push("/login");
  }, [router, dispatch]);
  return null;
}

export default Logout;
