import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/authSlice";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import WhatsApp from "@mui/icons-material/WhatsApp";
import {
  Alert,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const theme = createTheme();

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
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, p: 3, bgcolor: "green" }}>
                <WhatsApp />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={onSubmit}
                sx={{ mt: 1 }}
              >
                {errors.username && (
                  <Alert severity="error">{errors.username.message}</Alert>
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="user name"
                  label="User Name"
                  color="success"
                  name="user name"
                  autoComplete="user name"
                  autoFocus
                  {...register("username", {
                    required: {
                      value: true,
                      message: "Field username is required to enter chat",
                    },
                  })}
                />
                <FormControl component="fieldset" sx={{ mt: 2 }}>
                  <FormLabel component="legend" color="">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="controlled-radio-buttons-group"
                    defaultValue={"female"}
                  >
                    <FormControlLabel
                      value="female"
                      {...register("gender")}
                      control={<Radio color="error" />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      {...register("gender")}
                      control={<Radio color="primary" />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
                <Button
                  type="submit"
                  value="Login to chat"
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      {/* <div className="login_body">
        <form className="box" onSubmit={onSubmit}>
          <div>
            <WhatsAppIcon fontSize="large" />
          </div>
          <br />
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
      </div> */}
    </>
  );
}

export default Login;
