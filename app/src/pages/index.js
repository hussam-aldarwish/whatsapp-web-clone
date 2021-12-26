import { useSelector } from "react-redux";
import RedirectAfterTimer from "../components/RedirectAfterTimer";
import { selectUser } from "../features/authSlice";

function Home() {
  const user = useSelector(selectUser);
  return (
    <>
      {user ? (
        <h1>You are welcome: {user.username}</h1>
      ) : (
        <h1>You are not logged in!</h1>
      )}
      <RedirectAfterTimer timer={3} url={user ? "/chat" : "/login"} />
    </>
  );
}

export default Home;
