import React from 'react';

function LastPostTime({ timeOfLastPost }) {
  const now = Date.now();
  const postDate = new Date(timeOfLastPost);
  const diffMs = now - postDate.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day; // approximate
  const year = 365 * day; // approximate

  let displayText = '';

  switch (true) {
    case diffMs < minute:
      const seconds = Math.floor(diffMs / 1000);
      displayText = `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
      break;

    case diffMs < hour:
      const minutes = Math.floor(diffMs / minute);
      displayText = `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
      break;

    case diffMs < day:
      const hours = Math.floor(diffMs / hour);
      displayText = `${hours} hour${hours !== 1 ? 's' : ''} ago`;
      break;

    case diffMs < 7 * day:
      const days = Math.floor(diffMs / day);
      displayText = `${days} day${days !== 1 ? 's' : ''} ago`;
      break;

    case diffMs < 4 * week:
      const weeks = Math.floor(diffMs / week);
      displayText = `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
      break;

    case diffMs < 12 * month:
      const months = Math.floor(diffMs / month);
      displayText = `${months} month${months !== 1 ? 's' : ''} ago`;
      break;

    default:
      const years = Math.floor(diffMs / year);
      displayText = `${years} year${years !== 1 ? 's' : ''} ago`;
      break;
  }

  return <span>{displayText}</span>;
}

export default LastPostTime;
