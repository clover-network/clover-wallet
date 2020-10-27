export const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '320px',
  },
  underline: {
    borderBottom: 'none !important',
    '&:after': {
      borderBottom: 'none !important',
    },
    '&:before': {
      borderBottom: 'none !important',
    },
  },
  inputRoot: {
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    borderRadius: '4px',
    paddingTop: '18px',
    paddingLeft: '18px',
    paddingRight: '18px',
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: 'Inter',
    fontSize: '16px',
  },
  input: {
    '&::placeholder': {
      color: '#000000',
      opacity: '0.6',
      fontSize: '14px',
      fontFamily: 'Inter',
    },
  },
  inputError: {},
  helperText: {
    paddingLeft: '16px',
    '&$helperTextError': {
      color: '#FA5050',
      fontFamily: 'Roboto-Regular',
      fontSize: '11px',
    },
  },
  helperTextError: {},
});
