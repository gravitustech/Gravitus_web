import React from 'react';

import {
  Grid, Box, useTheme,
  Typography, Stack
} from '@mui/material';

import Accordioncomponents from './Accordioncomponents';

const Faq = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container pl={0} pr={2} spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant='h1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            Frequently Asked Questions
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} pt={3}>
          <Stack pt={3}  >
            <Accordioncomponents
              title='What is Gravitus?'
              description='We are a bunch of crypto currency enthusiasts, traders and blockchain developers. The internet era is beginning to saturate, and the next big technology is blockchain, which is poised to revolutionise the world. A need for a global crypto platform is inevitable.'
              description2='Our team wants to seize this opportunity by building a simple, easy and secured crypto trading platform. This provides the key to the future of the crypto currency world for everyone.'
            />
          </Stack>

          <Stack pt={5}>
            <Accordioncomponents
              title='What is Gravitus Spot Exchange?'
              description='Gravitus Spot Exchange is a platform where users can Buy and Sell Cryptocurrencies for immediate delivery and settlement. 
              It is called a "Gravitus Spot Exchange" because transactions occur "on the spot," meaning that when you execute a trade, 
              you are exchanging one cryptocurrency for another at the current market price, and the ownership of the assets is transferred immediately.'
            />
          </Stack>

          <Stack pt={5}  >
            <Accordioncomponents
              title='What is two-factor authentication (2FA)?'
              description='Two-Factor Authentication (2FA) or 2-Step Verification enhances your account`s security by requiring an extra step during login. With 2FA, you need to provide your email, password, and a one-time code generated from a second device, typically your mobile phone.'
              description2='This security method combines "something you have" (your phone) and "something you know" (your password) for authentication.'
              description3='The 2FA codes are unique to your account and have a short lifespan of about 30 seconds. It is highly unlikely that you will ever reuse the same code to access your account more than once.'
            />
          </Stack>

          <Stack pt={5}  >
            <Accordioncomponents
              title='Delayed or missing withdrawals'
              description='The most common solution to a missing withdrawal is time. Our systems usually take up to four hours to process withdrawals, 
              but in other circumstances, it can take longer. We recommend waiting 12 hours before contacting our support team regarding your withdrawal, 
              as withdrawal times vary from coin to coin depending on the network speed and the number of confirmations required.'
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={6} pt={3}>
          <Stack pt={3}  >
            <Accordioncomponents
              title='Why should I choose Gravitus CryptoExchange?'
              description='Gravitus provides a user-friendly interface that caters to both novice and seasoned traders. The platform is intuitive and easy to navigate, making it accessible for users with varying levels of technical expertise.'
            />
          </Stack>

          <Stack pt={5}>
            <Accordioncomponents
              title=' What is Gravitus P2P?'
              description=' Gravitus P2P is a platform that facilitates peer-to-peer cryptocurrency transactions. It acts as an intermediary to ensure the safety and security of transactions between buyers and sellers.'
            />
          </Stack>

          <Stack pt={5}  >
            <Accordioncomponents
              title='Why do I want to complete KYC?'
              description='KYC helps exchanges maintain a secure and trusted environment for all users. It reduces the risk of fraudulent activities and helps create a more transparent and accountable financial ecosystem.'
            />
          </Stack>

          <Stack pt={5}  >
            <Accordioncomponents
              title='Delayed or missing deposits'
              description='The most common solution to a missing deposit is time. Our systems usually take up to four hours to process deposits, 
              but in other circumstances, it can take longer. We recommend waiting 12 hours before contacting our support team regarding your deposit, 
              as deposit times vary from coin to coin depending on the network speed and the number of confirmations required.'
            />
          </Stack>

        </Grid>
      </Grid>
    </Box >
  )
}

export default Faq;
