import * as React from "react";

import {
  Accordion, AccordionDetails, Stack,
  AccordionSummary, Typography, useTheme
} from "@mui/material";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Accordioncomponents = ({ title, description, description2, description3 }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Accordion
      sx={{ boxShadow: 'none', backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground' }}
      expanded={expanded === "panel4"}
      onChange={handleChange("panel4")}
    >
      <AccordionSummary
        sx={{ height: '64px', alignItems: 'center', boxShadow: 'none' }}
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel4bh-content"
        id="panel4bh-header"
      >
        <Typography variant="title3" sx={{ flexShrink: 0, color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={1}>
          <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
            {description}
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
            {description2}
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
            {description3}
          </Typography>
        </Stack>

      </AccordionDetails>
    </Accordion>
  )
}

export default Accordioncomponents;
