import { SxObject } from 'src/types/sx-object';

export const Styles = SxObject({
  root: {
    padding: '24px'
  },
  field: {
    margin: '24px 0',
    '& > .MuiTextField-root': {
      width: '360px',
      maxWidth: '100%',
    }
  }
});