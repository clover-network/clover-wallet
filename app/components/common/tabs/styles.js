export const styles = () => ({
  tabsRoot: {
    padding: '10px 18px'
  },
  group:{
    boxShadow: '0 0 0',
  },
  tabsIndicator: {
    backgroundColor: 'transparent',
    height: '2px',
  },
  tabRoot: {
    height: '32px',
    opacity: '1',
    textTransform: 'capitalize',
    fontSize: '16px',
    fontFamily: 'Inter-Bold',
    backgroundColor: 'rgba(245,245,245, 1)',
    color: '#8A8C9B',
    boxShadow: '0 0 0',
    border: '0 !important',
    '&:hover': {
      background: 'rgba(242,62,95, 0.75)',
      color: '#FFFFFF',
      opacity: 1,
    },
    '&:focus': {
      background: 'rgba(242,62,95, 1)',
      color: '#FFFFFF',
    },
  },
  buttonRoot:{
    border: '0 !important',
  },
  tabSelected: {
    background: '#F23E5F',
    color: '#FFFFFF',
    opacity: 1,
  },
});
