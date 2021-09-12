import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default function ConversationLoadPlaceholder() {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Skeleton animation="pulse" variant="rect" height={52} />
      <div style={{ height: 'calc(100% - 104px)', padding: 4, paddingTop: 132 }}>
        <Skeleton
          animation="pulse"
          variant="text"
          height={120}
          width={190}
          style={{ position: 'absolute', right: 4, top: 32 }}
        />
        <Skeleton
          animation="pulse"
          variant="text"
          height={120}
          width={190}
          style={{ marginLeft: 4 }}
        />
      </div>
      <Skeleton animation="pulse" variant="rect" height={52} />
    </div>
  );
}
