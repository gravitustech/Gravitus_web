import React from 'react'
import { Stack,Grid } from '@mui/material';
import Noteicon from '../../../../../../assets/images/gravitusimage/notesicon.svg';
import ImportantNotesExt from './_Del_ImportantNotesExt';

const Importantnotes = () => {
    return (
        <Grid>
            <Stack direction='column' spacing={3} pl={5}>
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

    )
}

export default Importantnotes;
