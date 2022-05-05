export const styles = () => ({
  helperText: {
    '&$helperTextError': {
      color: 'rgba(176, 0, 32, 1)',
      fontFamily: 'Roboto-Regular',
      fontSize: '11px',
    },
  },
  helperTextError: {},
  inputRoot: {
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
  },
  inputUnderline: {
    '&::before': { border: 'none' },
    '&::after': { borderBottom: '2px solid rgba(215, 95, 160, 1)' },
    '&::hover': { border: 'none' },
  },
  inputErrorUnderline: {
    '&$inputError': {
      '&::before': { border: 'none' },
      '&::after': { borderBottom: '2px solid rgba(0, 0, 0, 0.3)' },
      '&::hover': { border: 'none' },
    },
  },
  inputError: {},
  rootLabel: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '15px',
    fontFamily: 'Roboto-Regular',
    '&$focusedLabel': {
      color: 'rgba(215, 95, 160, 1)',
      fontFamily: 'Roboto-Regular',
      transform: 'translate(10px,12px) scale(0.73)',
    },
  },
  rootErrorLabel: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '15px',
    fontFamily: 'Roboto-Regular',
    '&$errorLabel': {
      color: 'rgba(176, 0, 32, 1)',
      fontFamily: 'Roboto-Regular',
      transform: 'translate(10px,12px) scale(0.73)',
    },
  },
  focusedLabel: {},
  errorLabel: {},
  textField: {
    width: '321px',
    height: '54.82px',
  },
});
