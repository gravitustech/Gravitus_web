import React, { useState } from 'react';
import { TabContext } from '@mui/lab';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import { useTheme, Stack, Grid, Button, FormHelperText, OutlinedInput, Typography, ButtonBase, Divider } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import NumberFormat from 'react-number-format';
import Dialog from '@mui/material/Dialog';
import { useNavigate } from 'react-router';

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: '#D9D9D9',
  '& .MuiSlider-thumb': {
    height: 12,
    width: 12,
    color: '#FF4E4E'
  },
  '& .MuiSlider-track': {
    backgroundColor: '#FF4E4E'
  }
}));

const SellLimitStoplimittab = ({ isAuthorised }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  //orderbook value
  const [value, setValue] = React.useState('0');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //slider
  const valuetext = (value) => `${value}`;

  //dialogbox
  const [open, setOpen] = React.useState(false);

  const handleCancelClick = () => {
    setOpen(false);
    props.onCollapseToggle(false);
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <TabContext value={value}>
      <TabList onChange={handleChange} indicatorColor="none" textColor='inherit'>
        <Tab
          disableRipple
          sx={{
            paddingLeft: '0px',
            minHeight: '0px',
            minWidth: '0px',
            fontSize: value === '0' ? '12px' : '12px',
            fontWeight: value === '0' ? '500' : '400',
            color:
            value === '0'
              ? theme.palette.mode === 'dark'
                ? 'text.secondarydark'
                : 'text.secondary'
              : theme.palette.mode === 'dark'
                ? 'text.primarydark'
                : 'text.primary',
                 '&:hover': {
                  color: value === '0' ? theme.palette.mode === 'dark' ? 'text.white' : 'text.black' : theme.palette.mode === 'dark' ? 'text.white' : 'text.black',
                },
          }}
          label={
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Limit
            </div>
          }
          value={'0'}
        />

        <Tab
          disableRipple
          key={'1'}
          sx={{
            paddingLeft: '12px',
            minHeight: '0px',
            minWidth: '0px',
            fontSize: value === '1' ? '12px' : '12px',
            fontWeight: value === '1' ? '500' : '400',
            color:
            value === '1'
              ? theme.palette.mode === 'dark'
                ? 'text.secondarydark'
                : 'text.secondary'
              : theme.palette.mode === 'dark'
                ? 'text.primarydark'
                : 'text.primary',
                 '&:hover': {
                  color: value === '1' ? theme.palette.mode === 'dark' ? 'text.white' : 'text.black' : theme.palette.mode === 'dark' ? 'text.white' : 'text.black',
                },
          }}
          label={
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Stop Limit
            </div>
          }
          value={'1'}
        />
      </TabList>

      <TabPanel value="0" sx={{ padding: '0px' }}>
        <Formik
          initialValues={{
            price: '',
            quantity: '',
            totalamount: '',

            submit: null
          }}
          validationSchema={Yup.object().shape({
            price: Yup.string().max(255).required("Don't leave empty"),
            quantity: Yup.string().max(255).required("Don't leave empty"),
            totalamount: Yup.string().max(255).required("Don't leave empty")
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              setStatus({ success: false });
              setSubmitting(false);
            } catch (err) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <OutlinedInput
                    id="price"
                    type="price"
                    value={values.price}
                    name="price"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="26,658.05"
                    fullWidth
                    error={Boolean(touched.price && errors.price)}
                    endAdornment={
                      <InputAdornment position="end">
                        <Stack spacing={1} direction="row">
                          <ButtonBase>
                            <AddIcon fontSize="34px" />
                          </ButtonBase>
                          <ButtonBase>
                            <RemoveIcon fontSize="34px" />
                          </ButtonBase>
                        </Stack>
                      </InputAdornment>
                    }
                  />
                  {touched.price && errors.price && (
                    <FormHelperText error id="standard-weight-helper-text-price">
                      {errors.price}
                    </FormHelperText>
                  )}

                  <Stack spacing={1} pt={1.2}>
                    <OutlinedInput
                      id="quantity"
                      type="quantity"
                      value={values.quantity}
                      name="quantity"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Quantity"
                      fullWidth
                      error={Boolean(touched.quantity && errors.quantity)}
                      endAdornment={
                        <InputAdornment position="end">
                          <Typography
                            variant="subtitle1"
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                          >
                            BTC
                          </Typography>
                        </InputAdornment>
                      }
                    />
                    {touched.quantity && errors.quantity && (
                      <FormHelperText error id="standard-weight-helper-text-quantity">
                        {errors.quantity}
                      </FormHelperText>
                    )}
                  </Stack>
                  <Stack pt={1.2} pl={1} pr={1}>
                    <CustomSlider
                      aria-label="Temperature"
                      defaultValue={0}
                      getAriaValueText={valuetext}
                      valueLabelDisplay="auto"
                      step={25}
                      marks
                      min={0}
                      max={100}
                    />
                  </Stack>
                  <Stack pt={0} direction="row" justifyContent='space-between' spacing={2}>
                    <Typography variant="subtitle1" pl={1}>0%</Typography>
                    <Typography variant="subtitle1" >
                      25%
                    </Typography>
                    <Typography variant="subtitle1"  >
                      50%
                    </Typography>
                    <Typography variant="subtitle1" >
                      75%
                    </Typography>
                    <Typography variant="subtitle1"  >
                      100%
                    </Typography>
                  </Stack>

                  <Grid pl={1}>
                    <Stack pt={1.2} direction="row" justifyContent="space-between">
                      <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Avbl
                      </Typography>
                      {isAuthorised ? (
                        <Typography
                          variant="subtitle1"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          0.000 BTC
                        </Typography>) : (
                        <Typography
                          variant="subtitle1"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          --- BTC
                        </Typography>)}
                    </Stack>
                  </Grid>
                  <Stack spacing={1} pt={1.2}>
                    <OutlinedInput
                      id="totalamount"
                      type="totalamount"
                      value={values.totalamount}
                      name="totalamount"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Total Amount"
                      fullWidth
                      error={Boolean(touched.totalamount && errors.totalamount)}
                      endAdornment={
                        <InputAdornment position="end">
                          <Typography
                            variant="subtitle1"
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                          >
                            USDT
                          </Typography>
                        </InputAdornment>
                      }
                    />
                    {touched.totalamount && errors.totalamount && (
                      <FormHelperText error id="standard-weight-helper-text-totalamount">
                        {errors.totalamount}
                      </FormHelperText>
                    )}
                  </Stack>

                </Grid>

                <Grid item xs={12}>
                  {isAuthorised ? (
                    <Button disableElevation disabled={isSubmitting} type="submit" variant="spotsellbutton" onClick={handleClickOpenDialog}>
                      SELL
                    </Button>
                  ) : (
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      type="submit"
                      variant="spotsellbutton"
                      onClick={() => navigate('/login')}
                    >
                      LOGIN
                    </Button>
                  )}

                  <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="dialog-title">
                    <Stack p={4} spacing={2.5}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <Typography variant="title1" sx={{ color: 'text.sell' }}>
                          Sell EPX
                        </Typography>
                        <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                          Limit Order
                        </Typography>
                      </Stack>
                      <Divider></Divider>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                          Price
                        </Typography>
                        <Typography
                          variant="title2"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          <NumberFormat value="82.5" displayType="text" thousandSeparator suffix=" USDT" />
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                          Quantity
                        </Typography>
                        <Typography
                          variant="title2"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          <NumberFormat value="10" displayType="text" thousandSeparator suffix="EPX" />
                        </Typography>
                      </Stack>

                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                          Total Amount
                        </Typography>
                        <Typography
                          variant="title2"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          <NumberFormat value="825.00 " displayType="text" thousandSeparator suffix=" USDT" />
                        </Typography>
                      </Stack>
                      <Divider></Divider>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                          After Fess and TDS
                        </Typography>
                        <Typography
                          variant="title2"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          <NumberFormat value="824.69 " displayType="text" thousandSeparator suffix=" USDT" />
                        </Typography>
                      </Stack>
                      <Divider></Divider>
                      <Stack pt={1} direction="row" spacing={2} justifyContent="space-between">
                        <Button variant="contained5" onClick={handleCloseDialog}>
                          Cancel
                        </Button>
                        <Button variant="confirmsell">Confirm</Button>
                      </Stack>
                      <Stack>
                        <Typography
                          variant="body1"
                          sx={{ textAlign: 'center', color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
                        >
                          Fees : Maker 0.2% | Taker 0.2% | TDS 1.0%
                          <br />
                          (Incl. Charges)
                        </Typography>
                      </Stack>
                    </Stack>
                  </Dialog>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </TabPanel>

      <TabPanel value="1" sx={{ padding: '0px' }}>
        <Formik
          initialValues={{
            stoplimitprice: '',
            price: '',
            quantity: '',
            totalamount: '',

            submit: null
          }}
          validationSchema={Yup.object().shape({
            stoplimitprice: Yup.string().max(255).required("Don't leave empty"),
            price: Yup.string().max(255).required("Don't leave empty"),
            quantity: Yup.string().max(255).required("Don't leave empty"),
            totalamount: Yup.string().max(255).required("Don't leave empty")
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              setStatus({ success: false });
              setSubmitting(false);
            } catch (err) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2.5}>
                <Grid item xs={12}>
                  <OutlinedInput
                    id="stoplimitprice"
                    type="stoplimitprice"
                    value={values.stoplimitprice}
                    name="stoplimitprice"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="stop limit"
                    fullWidth
                    error={Boolean(touched.stoplimitprice && errors.stoplimitprice)}
                    endAdornment={
                      <InputAdornment position="end">
                        <Stack spacing={1} direction="row">
                          <ButtonBase>
                            <AddIcon fontSize="34px" />
                          </ButtonBase>
                          <ButtonBase>
                            <RemoveIcon fontSize="34px" />
                          </ButtonBase>
                        </Stack>
                      </InputAdornment>
                    }
                  />
                  {touched.stoplimitprice && errors.stoplimitprice && (
                    <FormHelperText error id="standard-weight-helper-text-price">
                      {errors.stoplimitprice}
                    </FormHelperText>
                  )}

                  <Stack spacing={1} pt={1.2}>
                    <OutlinedInput
                      id="price"
                      type="price"
                      value={values.price}
                      name="price"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="26,658.05"
                      fullWidth
                      error={Boolean(touched.price && errors.price)}
                      endAdornment={
                        <InputAdornment position="end">
                          <Stack spacing={1} direction="row">
                            <ButtonBase>
                              <AddIcon fontSize="34px" />
                            </ButtonBase>
                            <ButtonBase>
                              <RemoveIcon fontSize="34px" />
                            </ButtonBase>
                          </Stack>
                        </InputAdornment>
                      }
                    />
                    {touched.price && errors.price && (
                      <FormHelperText error id="standard-weight-helper-text-price">
                        {errors.price}
                      </FormHelperText>
                    )}
                  </Stack>
                  <Stack spacing={1} pt={1.2}>
                    <OutlinedInput
                      id="quantity"
                      type="quantity"
                      value={values.quantity}
                      name="quantity"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Quantity"
                      fullWidth
                      error={Boolean(touched.quantity && errors.quantity)}
                      endAdornment={
                        <InputAdornment position="end">
                          <Typography
                            variant="subtitle1"
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                          >
                            BTC
                          </Typography>
                        </InputAdornment>
                      }
                    />
                    {touched.quantity && errors.quantity && (
                      <FormHelperText error id="standard-weight-helper-text-quantity">
                        {errors.quantity}
                      </FormHelperText>
                    )}
                  </Stack>
                  <Stack pt={1.2} pl={1} pr={1}>
                    <CustomSlider
                      aria-label="Temperature"
                      defaultValue={0}
                      getAriaValueText={valuetext}
                      valueLabelDisplay="auto"
                      step={25}
                      marks
                      min={0}
                      max={100}
                    />
                  </Stack>
                  <Stack pt={0} direction="row" justifyContent='space-between' spacing={2}>
                    <Typography variant="subtitle1" pl={1}>0%</Typography>
                    <Typography variant="subtitle1" >
                      25%
                    </Typography>
                    <Typography variant="subtitle1"  >
                      50%
                    </Typography>
                    <Typography variant="subtitle1" >
                      75%
                    </Typography>
                    <Typography variant="subtitle1"  >
                      100%
                    </Typography>
                  </Stack>
                  <Grid pl={1}>
                    <Stack pt={1.2} direction="row" justifyContent="space-between">
                      <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Avbl
                      </Typography>
                      {isAuthorised ? (
                        <Typography
                          variant="subtitle1"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          0.000 BTC
                        </Typography>) : (
                        <Typography
                          variant="subtitle1"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          --- BTC
                        </Typography>)}
                    </Stack>
                  </Grid>
                  <Stack spacing={1} pt={1.2}>
                    <OutlinedInput
                      id="totalamount"
                      type="totalamount"
                      value={values.totalamount}
                      name="totalamount"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Total Amount"
                      fullWidth
                      error={Boolean(touched.totalamount && errors.totalamount)}
                      endAdornment={
                        <InputAdornment position="end">
                          <Typography
                            variant="subtitle1"
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                          >
                            USDT
                          </Typography>
                        </InputAdornment>
                      }
                    />
                    {touched.totalamount && errors.totalamount && (
                      <FormHelperText error id="standard-weight-helper-text-totalamount">
                        {errors.totalamount}
                      </FormHelperText>
                    )}
                  </Stack>


                </Grid>

                <Grid item xs={12}>
                  <Button disableElevation disabled={isSubmitting} type="submit" variant="spotsellbutton" onClick={handleClickOpenDialog}>
                    SELL
                  </Button>
                  <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="dialog-title">
                    <Stack p={4} spacing={2.5}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <Typography variant="title1" sx={{ color: 'text.sell' }}>
                          Sell EPX
                        </Typography>
                        <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                          Stop Order
                        </Typography>
                      </Stack>
                      <Divider></Divider>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                          Price
                        </Typography>
                        <Typography
                          variant="title2"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          <NumberFormat value="82.5" displayType="text" thousandSeparator suffix=" USDT" />
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                          Quantity
                        </Typography>
                        <Typography
                          variant="title2"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          <NumberFormat value="10" displayType="text" thousandSeparator suffix="EPX" />
                        </Typography>
                      </Stack>

                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                          Total Amount
                        </Typography>
                        <Typography
                          variant="title2"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          <NumberFormat value="825.00 " displayType="text" thousandSeparator suffix=" USDT" />
                        </Typography>
                      </Stack>
                      <Divider></Divider>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                          After Fess and TDS
                        </Typography>
                        <Typography
                          variant="title2"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          <NumberFormat value="824.69 " displayType="text" thousandSeparator suffix=" USDT" />
                        </Typography>
                      </Stack>
                      <Divider></Divider>
                      <Stack pt={1} direction="row" spacing={2} justifyContent="space-between">
                        <Button variant="contained5" onClick={handleCloseDialog}>
                          Cancel
                        </Button>
                        <Button variant="confirmsell">Confirm</Button>
                      </Stack>
                      <Stack>
                        <Typography
                          variant="body1"
                          sx={{ textAlign: 'center', color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
                        >
                          Fees : Maker 0.2% | Taker 0.2% | TDS 1.0%
                          <br />
                          (Incl. Charges)
                        </Typography>
                      </Stack>
                    </Stack>
                  </Dialog>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </TabPanel>
    </TabContext>
  );
};

export default SellLimitStoplimittab;
