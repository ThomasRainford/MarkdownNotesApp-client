export const getTimeSince = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval + (interval > 1 ? " years" : " year");
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + (interval > 1 ? " months" : " month");
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + (interval > 1 ? " days" : " day");
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + (interval > 1 ? " hours" : " hour");
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + (interval > 1 ? " minutes" : " minute");
  }
  const floorSeconds = Math.floor(seconds);
  return floorSeconds === 0
    ? "Just now"
    : floorSeconds > 1
    ? `${floorSeconds} seconds`
    : `${floorSeconds} second`;
};
