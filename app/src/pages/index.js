import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";

function Home() {
  const user = useSelector(selectUser);
  const router = useRouter();
  useEffect(() => {
    router.push(user ? "/chat" : "/login");
  }, [router]);
  return null;
}

export default Home;
