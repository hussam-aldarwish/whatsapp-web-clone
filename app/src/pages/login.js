import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/authSlice";

function Login() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = handleSubmit(({ username, gender }) => {
    setLoading(true);
    const encodedUsername = encodeURI(username);
    const imageUrl = `https://avatars.dicebear.com/api/${gender}/${encodedUsername}.svg`;
    dispatch(login({ username: username, imageUrl: imageUrl }));
  });

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        router.push("/");
      }, 500);
    }
  }, [user, router]);

  return (
    <form onSubmit={onSubmit}>
      <label>Username: </label>
      <input
        type="text"
        {...register("username", {
          required: {
            value: true,
            message: "Field username is required to enter chat",
          },
        })}
        placeholder="Please type username"
      />
      {errors.username && <span>{errors.username.message}</span>}
      <br />
      <label>Gender: </label>
      <div>
        <input
          type="radio"
          {...register("gender")}
          value="male"
          defaultChecked
        />
        <span>Male</span>
      </div>
      <div>
        <input type="radio" {...register("gender")} value="female" />
        <span>female</span>
      </div>
      <input type="submit" value="Login to chat" />
    </form>
  );
}

export default Login;
