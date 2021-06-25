import Button from '@material-ui/core/Button';

function MaterialButton(props){
  const button = {
    width: 100,
    height: 40,
    fontSize: 15
  };

  return(
    props.disabled ?
    <Button
      disabled
      style={ button }
      color={ props.color }
      variant="contained"
      disableElevation
      fontSize="large"
      endIcon={ props.endIcon && props.endIcon }
      onClick={ props.pushSubmit }
    >
      { props.text }
    </Button> :
    <Button
      style={ button }
      color={ props.color }
      variant="contained"
      disableElevation
      fontSize="large"
      endIcon={ props.endIcon && props.endIcon }
      onClick={ props.pushSubmit }
    >
      { props.text }
    </Button>
  );
};

export default MaterialButton;