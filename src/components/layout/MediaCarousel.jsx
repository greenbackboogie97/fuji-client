import React from 'react';
import Carousel, { arrowsPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { IconButton, makeStyles } from '@material-ui/core';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function MediaCarousel(props) {
  const classes = useStyles();

  return (
    <div>
      <Carousel
        plugins={[
          {
            resolve: arrowsPlugin,
            options: {
              arrowLeft: (
                <IconButton className={classes.button}>
                  <FiChevronLeft />
                </IconButton>
              ),
              arrowLeftDisabled: <div style={{ width: 32 }}></div>,
              arrowRight: (
                <IconButton className={classes.button}>
                  <FiChevronRight />
                </IconButton>
              ),
              arrowRightDisabled: <div style={{ width: 32 }}></div>,
              addArrowClickHandler: true,
            },
          },
        ]}
      >
        {props.media.map((el, index) => {
          return <img key={index} src={el} className={classes.image} />;
        })}
      </Carousel>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  image: {
    maxHeight: '30vh',
    maxWidth: '100%',
    borderRadius: theme.shape.borderRadius,
  },
  button: {
    padding: theme.spacing(1),
  },
}));
