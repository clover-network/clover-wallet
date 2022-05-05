export const styles = () => ({
  root: {},
  paper: {
    margin: '20px',
    borderRadius: '8px',
    flex: '1',
    textAlign: 'center',
    boxShadow: 'none',
  },
  contentRoot: {
    padding: '40px 15px 20px 15px !important',

  },
  title: {
    color: '#282828',
    fontSize: '20px',
    margin: '20px 0 10px 0',
  },
  desc: {
    // fontFamily: 'Inter-Regular',
    fontSize: '12px',
    color: '#282828',
  },
  confirm: {
    fontSize: '16px',
    // fontFamily: 'Inter-Bold',
    height: '48px',
    textAlign: 'center',
    width: '100%',
    verticalAlign: 'middle',
    lineHeight: '48px',
    cursor: 'pointer',
    color: '#ffffff',
    background: '#F23E5F',
    borderRadius: '6px',
    "&:hover":{
      opacity:"0.8"
    }
  },
  confirmbox:{
    padding:"12px 16px"
  }
});
