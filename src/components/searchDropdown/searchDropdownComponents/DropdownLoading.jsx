import React from 'react';
import { Skeleton } from '@material-ui/lab';

export default function DropdownLoading() {
  return (
    <div style={{ padding: 8 }}>
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="100%" />
    </div>
  );
}
