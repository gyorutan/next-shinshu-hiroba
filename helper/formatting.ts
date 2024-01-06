export const calculatePostTime = (timeParams: Date) => {
  const createdPostNumberTime = new Date(timeParams).getTime();

  const createdPostTime = new Date(createdPostNumberTime);

  const currentNumberTime = new Date().getTime();

  const seconds = currentNumberTime - createdPostNumberTime;

  const calculatedTimeFloor = Math.floor(seconds / 1000);

  if (calculatedTimeFloor < 60) {
    return "방금전";
  }
  const minutes = Math.floor(calculatedTimeFloor / 60);

  if (minutes < 60) {
    return `${minutes}분 전`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24 && hours > 0) {
    return `${hours}시간 전`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7 && days > 0) {
    return `${days}일 전`;
  }

  const year = new Date(createdPostTime).getFullYear();

  const month = new Date(createdPostTime).getMonth() + 1;

  const day = new Date(createdPostTime).getDate();

  const tooMuchTimeAgoPost = `${year}년 ${month}월 ${day}일`;

  if (days > 6) {
    return tooMuchTimeAgoPost;
  }
};
