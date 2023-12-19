import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
  CircularProgress
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTheme } from '@mui/material/styles';

// project import
import AnimateButton from '../../../components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { loginUser } from '../../../api/auth';
import CustomSnackBar from '../../../components/snackbar/index';
import { setUserEssentials, setUserTokenInLocal } from '../../../utils/storage';
import { useDispatch } from 'react-redux';
import { setAdminUserStateAction } from '../../../appRedux/actions/adminUser';

// ============================|| FIREBASE - LOGIN ||============================ // 

const GravitusAuthLogin = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [checked, setChecked] = useState(localStorage.checkbox === 'true');
  const [inputs, setInputs] = useState({ accountType: 'GRAVITUS' });
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const rememberMe = (email, password) => {
    // console.log(inputs, isChecked)
    if (checked) {
      localStorage.username = email;
      localStorage.password = password;
      localStorage.checkbox = checked;
    } else {
      localStorage.username = '';
      localStorage.password = '';
      localStorage.checkbox = checked;
    }
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          email: localStorage.username || '',
          password: localStorage.password || '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required*'),
          password: Yup.string().max(255).required('Password is required*')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setInputs({ ...inputs, postData: { emailId: values.email, password: values.password } });
          rememberMe(values.email, values.password);
          setIsLoading(true);
          try {
            // console.log({ values });
            const { data } = await loginUser({ ...inputs, postData: { emailId: values.email, password: values.password } });
            if (Object.keys(data.result).length) {
              setIsLoading(false);
              // console.log(data.result);

              const userStateData = {
                id: data.result.userId,
                emailId: values.email,
                password: values.password
              };

              setUserEssentials(userStateData);
              setUserTokenInLocal(data.result.token);

              dispatch(
                setAdminUserStateAction({
                  user: userStateData,
                  token: localStorage.getItem('token')
                  // isAuthenticated: true
                })
              );

              navigate('/loginverify', { replace: true });
            } else {
              setIsLoading(false);
              setSnackbarMessage({ msg: data.error.message, success: false });
              setSnackbarOpen(true);
            }
          } catch (err) {
            // console.log(err);
            // Logout User
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <>
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <OutlinedInput
                      id="email-login"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Email*"
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      id="-password-login"
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            disableRipple
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {showPassword ? (
                              <EyeOutlined sx={{ color: theme.palette.mode === 'dark' ? 'text.tertiarydark' : 'text.tertiary' }} />
                            ) : (
                              <EyeInvisibleOutlined sx={{ color: theme.palette.mode === 'dark' ? 'text.tertiarydark' : 'text.tertiary' }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Password*"
                    />
                    {touched.password && errors.password && (
                      <FormHelperText error id="standard-weight-helper-text-password-login">
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} sx={{ mt: -1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(event) => setChecked(event.target.checked)}
                          name="checked"
                          color="primary"
                          size="small"
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                          Keep me sign in
                        </Typography>
                      }
                    />
                    <Link variant="body2" component={RouterLink} to="/forgetpassword " color="text.buy">
                      Forgot Password?
                    </Link>
                    {/* loginverify */}
                  </Stack>
                </Grid>
                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <AnimateButton>
                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                      {isLoading ? <CircularProgress color="inherit" size={30} /> : 'SIGN IN'}
                    </Button>
                  </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                  <Divider>
                    <Typography variant="body1">or</Typography>
                  </Divider>
                </Grid>
              </Grid>
            </form>
            <br />
            <Grid item xs={12}>
              <AnimateButton>
                <Link component={RouterLink} to="/register">
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" variant="contained1">
                    REGISTER
                  </Button>
                </Link>
              </AnimateButton>
            </Grid>
          </>
        )}
      </Formik>
      <CustomSnackBar
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        snackbarMessage={snackbarMessage && snackbarMessage.msg}
        success={snackbarMessage && snackbarMessage.success}
      />
    </>
  );
};

export default GravitusAuthLogin;
