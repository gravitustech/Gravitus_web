import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

// material-ui
import {
  Box,
  Button,
  Divider,
  FormControl,
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

// project import
import AnimateButton from '../../../components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from '../../../utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import CustomSnackBar from '../../../components/snackbar/index';
import { signupUser, validateReferral } from '../../../api/auth';
import { useTheme } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import warninggif from '../../../assets/images/gravitusimage/warninggif.svg';

// ============================|| FIREBASE - REGISTER ||============================ //

const GravitusAuthRegister = () => {

  const theme = useTheme();
  let { emailId } = useParams();
  const navigate = useNavigate();
  const inputs = { accountType: 'GRAVITUS' };

  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formikValues, setFormikValues] = useState(false);

  const [referralisLoading, setIsReferrralLoading] = useState(false);

  const handleConfirm = async () => {
    // console.log({ formikValues });
    setIsReferrralLoading(true);
    const { data } = await validateReferral({ ...inputs, postData: { emailId: formikValues.email, referralId: formikValues.referralid } });
    if (data.error === 'ok') {
      const { data: resp } = await signupUser({
        ...inputs,
        postData: { emailId: formikValues.email, password: formikValues.password, referralId: formikValues.referralid }
      });
      if (resp.error === 'ok') {
        navigate('/registerstatus', { state: { email: formikValues.email } })
        setIsSuccessDialogOpen(true);
        setIsReferrralLoading(false);
      } else {
        setIsLoading(false);
        setSnackbarMessage({ msg: resp.error, success: false });
        setSnackbarOpen(true);
        setIsSuccessDialogOpen(false);
        setIsReferrralLoading(false);
      }
    } else {
      setSnackbarMessage({ msg: data.error, success: false });
      setSnackbarOpen(true);
      setIsSuccessDialogOpen(false);
      setIsReferrralLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  const handleCloseSuccessDialog = () => {
    setIsSuccessDialogOpen(false);
  };



  return (
    <>
      <Formik
        initialValues={{
          email: '',
          referralid: emailId ? emailId : '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          // firstname: Yup.string().max(255).required('First Name is required'),
          // lastname: Yup.string().max(255).required('Last Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required*'),
          password: Yup.string().max(255).required('Password is required*')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          // console.log('am in')
          try {
            // console.log({ values });
            if (values.referralid.length) {
              setFormikValues({ ...formikValues, email: values.email, password: values.password, referralid: values.referralid });
              setIsSuccessDialogOpen(true);
            } else {
              setIsLoading(true);
              const { data } = await signupUser({ ...inputs, postData: { emailId: values.email, password: values.password } });
              if (data.error === 'ok') {
                navigate('/registerstatus', { state: { email: values.email } });
              } else {
                setIsLoading(false);
                setSnackbarMessage({ msg: data.error, success: false });
                setSnackbarOpen(true);
              }
            }
          } catch (err) {
            // console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
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
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                      id="email-login"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Email*"
                      inputProps={{}}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id="helper-text-email-signup">
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
                      id="password-signup"
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        changePassword(e.target.value);
                      }}
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
                      inputProps={{}}
                    />
                    {touched.password && errors.password && (
                      <FormHelperText error id="helper-text-password-signup">
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Stack>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" fontSize="0.75rem" color="#959595">
                          {level?.label}
                        </Typography>
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.referralid && errors.referralid)}
                      id="referralid-signup"
                      value={values.referralid}
                      name="referralid"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Referral Id (optional)"
                      inputProps={{}}
                    />
                    {touched.referralid && errors.referralid && (
                      <FormHelperText error id="helper-text-referralid-signup">
                        {errors.referralid}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    By Signing up, you agree to our &nbsp;
                    <Link variant="subtitle2" component={RouterLink} to="#" color="text.buy">
                      Terms of Service
                    </Link>
                    &nbsp; and &nbsp;
                    <Link variant="subtitle2" component={RouterLink} to="#" color="text.buy">
                      Privacy Policy
                    </Link>
                  </Typography>
                </Grid>
                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <AnimateButton>
                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                      {isLoading ? <CircularProgress color="inherit" size={30} /> : 'SIGN UP'}
                    </Button>
                  </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                  <Divider>
                    <Typography variant="body1">Already an user</Typography>
                  </Divider>
                </Grid>
              </Grid>
            </form>
            <br />
            <Dialog open={isSuccessDialogOpen} onClose={handleCloseSuccessDialog}>
              <Stack p={3} spacing={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground' }} >
                <img src={warninggif} alt="warninggif" />
                <Typography variant="h1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                  Confirm ?
                </Typography>
                <Typography
                  textAlign="center"
                  variant="body1"
                  sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
                >
                  Please confirm that,
                  <br />
                  <span style={{ color: theme.palette.mode === 'dark' ? '#f7f7f7' : '#000', fontWeight: 600 }}>
                    {values.referralid}
                  </span>
                  &nbsp; is your referral id
                </Typography>
                <Stack pt={1} direction="row" spacing={2} justifyContent="space-between">
                  <Button variant="contained5" onClick={handleCloseSuccessDialog}>
                    Cancel
                  </Button>
                  <Button variant="contained4" onClick={handleConfirm}>
                    {referralisLoading ? <CircularProgress color="inherit" size={30} /> : 'Confirm'}
                  </Button>
                </Stack>
              </Stack>
            </Dialog>
            <Grid item xs={12}>
              <AnimateButton>
                <Link component={RouterLink} to="/login">
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" variant="contained1">
                    SIGN IN
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

export default GravitusAuthRegister;
