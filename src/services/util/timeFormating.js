import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import dayjs from 'dayjs';

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo('en-us');

const setTime = (time) => {
  const timeStamp = new Date(time).getTime();
  if (timeStamp < Date.now() - 24 * 60 * 60 * 1000) {
    return dayjs(timeStamp).format('DD/MM/YYYY');
  }
  return timeAgo.format(timeStamp);
};

export default setTime;
