export const styles = () => ({
  tabsRoot: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  tabsIndicator: {
    backgroundColor: '#FB822A',
    height: '2px',
  },
  tabRoot: {
    color: 'rgba(0, 0, 0, 0.6)',
    width: '180px',
    height: '48px',
    textTransform: 'capitalise',
    fontSize: '14px',
    fontFamily: 'Roboto',
    '&:hover': {
      color: '#FB822A',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#FB822A',
      fontSize: '14px',
    },
    '&:focus': {
      color: '#FB822A',
    },
  },
  tabSelected: {},
});
