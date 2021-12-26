import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function RedirectAfterTimer({ timer, url }) {
  const router = useRouter();
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    if (remainingTime > 0) {
      setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
    }
  });

  useEffect(() => {
    if (remainingTime === 0) {
      router.push(url);
    }
  }, [remainingTime]);

  return (
    <h1>
      Redirecting to {url} in {remainingTime} senconds ...
    </h1>
  );
}

export default RedirectAfterTimer;
