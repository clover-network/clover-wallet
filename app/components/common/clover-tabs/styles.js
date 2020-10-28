export const styles = () => ({
  tabsRoot: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  tabsIndicator: {
    backgroundColor: '#FB822A',
    height: '2px',
  },
  tabRoot: {
    color: 'black',
    width: '180px',
    height: '48px',
    opacity: '1',
    textTransform: 'capitalise',
    fontSize: '16px',
    fontFamily: 'Inter-Bold',
    '&:hover': {
      color: '#FB822A',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#FB822A',
      opacity: '1',
      fontSize: '16px',
    },
    '&:focus': {
      color: '#FB822A',
    },
  },
  tabSelected: {},
});
