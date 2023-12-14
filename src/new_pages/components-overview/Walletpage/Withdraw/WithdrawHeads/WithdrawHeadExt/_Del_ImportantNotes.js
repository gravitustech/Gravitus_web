import Noteicon from '../../../../../../assets/images/gravitusimage/notesicon.svg';
import ImportantNotesExt from './_Del_ImportantNotesExt';

import { Stack, Grid } from '@mui/material';
import React from 'react';

const ImportantNotes = () => {
  return (
    <Grid>
      <Stack direction="column" spacing={2}>
        <ImportantNotesExt
          img={Noteicon}
          description={'Lorem ipsum dolor sit amet consectetur. Volutpat ullamcorper amet tincidunt.'}
        />

        <ImportantNotesExt 
          img={Noteicon} 
          description={'Lorem ipsum dolor sit amet consectetur.'} 
        />

        <ImportantNotesExt
          img={Noteicon}
          description={'Lorem ipsum dolor sit amet consectetur. Volutpat ullamcorper amet tincidunt.'}
        />
      </Stack>
    </Grid>
  );
};

export default ImportantNotes;