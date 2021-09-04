import React from 'react';
import { Button } from '@material-ui/core';
import { IoIosSend } from 'react-icons/io';

export default function MessageButton() {
  return (
    <Button variant="outlined" color="default" endIcon={<IoIosSend />}>
      Message
    </Button>
  );
}
