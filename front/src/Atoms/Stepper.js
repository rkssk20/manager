import MobileStepper from '@material-ui/core/MobileStepper';

const stepper = {
  height: 34,
  fontSize: 13,
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'center'
};

function Stepper(props){
  return(
    <MobileStepper
      style={ stepper }
      steps={ props.length }
      position="static"
      variant="dots"
      activeStep={ props.activeStep - 1 }
    />
  );
};

export default Stepper;