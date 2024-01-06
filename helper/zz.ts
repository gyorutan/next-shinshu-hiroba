const friends = [
  {
    name: "양주진",
    age: 32,
    job: "비트코인러",
    married: false,
  },
  {
    name: "오영제",
    age: 20,
    job: "개쩌는랩퍼",
    married: false,
  },
  {
    name: "서준형",
    age: 67,
    job: "45년차 유부남",
    married: true,
  },
];

export const test = () => {
  const result = friends.reduce((accumulator, currentObject) => {
    console.log(accumulator);
    console.log(currentObject);
    // 0 + 32
    // 32 + 20
    // 52 + 67
    // 119
    return accumulator + currentObject.age;
  }, 1);
  console.log(result);
};

// 콜백함수
// 4가지의 인수를 가져
