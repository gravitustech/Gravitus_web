import React from 'react';
import { Stack, Grid } from '@mui/material';
import Noteicon from '../../../../../../assets/images/gravitusimage/notesicon.svg';
import Importantnotescomponents from './Importantnotescomponents';
const Importantnotes = () => {
  return (
    <Grid>
      <Stack direction="column" spacing={2}>
        <Importantnotescomponents
          img={Noteicon}
          description={'Lorem ipsum dolor sit amet consectetur. Volutpat ullamcorper amet tincidunt.'}
        />

        <Importantnotescomponents img={Noteicon} description={'Lorem ipsum dolor sit amet consectetur.'} />

        <Importantnotescomponents
          img={Noteicon}
          description={'Lorem ipsum dolor sit amet consectetur. Volutpat ullamcorper amet tincidunt.'}
        />
      </Stack>
    </Grid>
  );
};

export default Importantnotes;
