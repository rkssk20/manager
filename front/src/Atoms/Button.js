const Style = {
  width: 150,
  height: 40,
  margin: 'auto',
  fontSize: 16,
  fontWeight: 600,
  color: '#eeeeee',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer'
}

const Thema = {
  ...Style,
  backgroundColor: 'var(--themacolor)'
}

const Normal = {
  ...Style,
  backgroundColor: 'rgb(75, 75, 75)'
}

function Button(props){
  return(
    <button onClick={ props.pushSubmit } style={ props.color === 'Thema' ? Thema : Normal }>{ props.text }</button>
  )
}

export default Button;