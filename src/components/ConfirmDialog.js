import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from './Button'

const ConfirmDialog = (props) => {
  const { title, children, open, setOpen, onConfirm } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          type="primary"
          label="Yes"
          handleClick={() => {
            setOpen(false);
            onConfirm();
          }}
        />
        <Button
          type="secondary"
          label="No"
          handleClick={() => setOpen(false)}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;