import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/authSlice";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function Login() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = handleSubmit(({ username, gender }) => {
    const encodedUsername = encodeURI(username);
    const imageUrl = `https://avatars.dicebear.com/api/${gender}/${encodedUsername}.svg`;
    dispatch(login({ username, imageUrl, gender }));
  });

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        router.push("/");
      }, 500);
    }
  }, [user, router]);

  return (
    <div className="login_body">
      <form className="box" onSubmit={onSubmit}>
        <div><WhatsAppIcon fontSize="large"/></div>
        <br/>
        <label>Username </label>
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
        <label fontSize="large">Gender</label>
        <div className="radio">
          <input
            type="radio"
            {...register("gender")}
            value="male"
            defaultChecked
          />
          <span>Male</span>
        </div>
        <div className="radio">
          <input type="radio" {...register("gender")} value="female" />
          <span>Female</span>
        </div>
        <input type="submit" value="Login to chat" />
      </form>
    </div>
  );
}

export default Login;
