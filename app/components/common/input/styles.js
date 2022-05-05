export const styles = () => ({
  fusoInput: {
    fontSize: '14px',
    '&:focus': {
      border: 'none',
      color: 'black',
    },
  },
  helperText: {
    '&$helperTextError': {
      color: '#FA5050',
      fontFamily: 'Inter-Regular',
      fontSize: '11px',
    },
  },
  helperTextError: {},
  inputRoot: {
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
    height: '54.82px',
  },
  inputUnderline: {
    '&:before': { border: 'none' },
    '&:after': { borderBottom: '2px solid rgba(215, 95, 160, 1)' },
    '&:hover': { border: 'none' },
  },
  inputErrorUnderline: {
    '&$inputError': {
      '&:before': { border: 'none' },
      '&:after': { borderBottom: '2px solid rgba(0, 0, 0, 0.3)' },
      '&:hover': { border: 'none' },
    },
  },
  inputError: {},
  rootLabel: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '13px',
    fontFamily: 'Inter-Regular',
    '&$focusedLabel': {
      color: '#E11B7B',
      fontFamily: 'Inter-Regular',
      transform: 'translate(10px,12px) scale(0.73)',
    },
  },
  rootErrorLabel: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '13px',
    fontFamily: 'Inter-Regular',
    '&$errorLabel': {
      color: '#FA5050',
      fontFamily: 'Inter-Regular',
      transform: 'translate(10px,12px) scale(0.73)',
    },
  },
  input: {
    '&::placeholder': {
      color: '#000000',
      opacity: '0.6',
      fontSize: '16px',
      fontFamily: 'Inter-Regular',
    },
  },
  inputWithWhiteColor: {
    color: '#FFFFFF',
    '&::placeholder': {
      color: '#000000',
      opacity: '0.6',
      fontSize: '16px',
      fontFamily: 'Inter-Regular',
    },
  },
  focusedLabel: {},
  errorLabel: {},
});
