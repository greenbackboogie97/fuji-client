import React, { useRef, useState } from 'react';
import { Button, CircularProgress, makeStyles, Tooltip } from '@material-ui/core';
import { IoCloudUpload } from 'react-icons/io5';
import FujiAPI from '../../../services/API/FujiAPI';

export default function MediaUpload(props) {
  const classes = useStyles();
  const uploadRef = useRef();

  const [selectedFile, setSelectedFile] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChooseClick = () => uploadRef.current.click();

  const handleFilesChange = () => {
    const file = uploadRef.current.files[0];
    setSelectedFile(file);
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      setLoading(true);
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () =>
        FujiAPI.media.uploadMedia({ data: reader.result }).then((res) => {
          setSelectedFile('');
          setLoading(false);
          props.addedMedia(res.data.URL);
        });
    }
  };

  return (
    <div className={classes.root}>
      <Button onClick={handleChooseClick} className={classes.btn}>
        Choose File
      </Button>
      <Tooltip open={Boolean(selectedFile)} title={selectedFile.name || ''} placement="top" arrow>
        <Button
          onClick={handleUploadClick}
          startIcon={!loading ? <IoCloudUpload /> : <CircularProgress color="inherit" size={24} />}
          className={classes.btn}
          disabled={!selectedFile}
        >
          Upload
        </Button>
      </Tooltip>

      <input
        onChange={handleFilesChange}
        ref={uploadRef}
        type="file"
        className={classes.fileInput}
      />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: 50,
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    zIndex: 2,
    margin: '0px 4px',
  },
  fileInput: {
    position: 'absolute',
    height: 1,
    width: 1,
    overflow: 'hidden',
    clip: 'rect(1px, 1px, 1px, 1px)',
  },
}));
