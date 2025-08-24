import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

interface MuiProgressBarProps {
  steps: string[];
  activeStep: number;
}

const MuiProgressBar: React.FC<MuiProgressBarProps> = ({ steps, activeStep }) => (
  <Box sx={{ width: '100%' }}>
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      sx={{
        '& .MuiStepIcon-root': {
          color: '#ef4444',
          backgroundColor: 'transparent',
          border: '2px solid #ef4444',
          borderRadius: '50%',
        },
        '& .MuiStepIcon-root.Mui-active': {
          color: '#fff',
          backgroundColor: '#ef4444',
          border: '3px solid #ef4444',
          fontSize: '2rem',
        },
        '& .MuiStepLabel-label.Mui-active': {
          color: '#ef4444',
          fontWeight: 'bold',
        },
        '& .MuiStepIcon-root.Mui-completed': {
          color: '#ef4444',
          backgroundColor: 'transparent',
          border: '2px solid #ef4444',
        },
        '& .MuiStepConnector-line': {
          borderColor: '#ef4444',
        },
      }}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  </Box>
);

export default MuiProgressBar;
