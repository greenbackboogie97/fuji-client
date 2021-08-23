import React, { useState } from 'react';
import { Button, makeStyles, Modal, Tooltip, CircularProgress } from '@material-ui/core';
import FormInput from '../inputs/FormInput.jsx';
import FujiAPI from '../../services/API/FujiAPI';

export default function ChangePassword(props) {
  const classes = useStyles();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCurPassChange = (e) => setCurrentPassword(e.target.value);
  const handleNewPassChange = (e) => setNewPassword(e.target.value);
  const handlePassConfirmChange = (e) => setPasswordConfirm(e.target.value);

  const handleModalClose = () => {
    setError(null);
    setLoading(false);
    setCurrentPassword('');
    setNewPassword('');
    setPasswordConfirm('');
    return props.onClose();
  };

  const handleFormSubmit = async () => {
    setLoading(true);
    await FujiAPI.changePassword({
      currentPassword,
      newPassword,
      newPasswordConfirm: passwordConfirm,
    })
      .then(() => {
        setLoading(false);
        setError(null);
        setCurrentPassword('');
        setNewPassword('');
        setPasswordConfirm('');
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });
  };

  return (
    <Modal open={props.open} onClose={handleModalClose}>
      <div className={classes.root}>
        <div className={classes.formContainer}>
          <FormInput
            type="password"
            label="Enter current password"
            value={currentPassword}
            onChange={handleCurPassChange}
          />
          <FormInput
            type="password"
            label="Enter new password"
            value={newPassword}
            onChange={handleNewPassChange}
          />
          <FormInput
            type="password"
            label="Confirm new password"
            value={passwordConfirm}
            onChange={handlePassConfirmChange}
          />
        </div>
        <div className={classes.buttonContainer}>
          <Tooltip open={Boolean(error)} title={error || ''} placement="top-start" arrow>
            <Button className={classes.submitButton} onClick={handleFormSubmit}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
            </Button>
          </Tooltip>
        </div>
      </div>
    </Modal>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.primary.semi}`,
    borderRadius: '4px',
    background: theme.palette.primary.background.paper,
    margin: '30vh auto',
    padding: theme.spacing(2),
    width: '70vw',
    maxWidth: '600px',
    '&:focus': {
      outline: 'none',
    },
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '70%',
  },
  buttonContainer: {
    height: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    color: theme.palette.primary,
    marginBottom: theme.spacing(1),
    width: '85px',
  },
}));
