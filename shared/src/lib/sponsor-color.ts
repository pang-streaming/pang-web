export const getSponsorColor = (amount: number) => {
  if (amount >= 1000 && amount < 5000) {
    return {
      background: 'linear-gradient(135deg, #4CAF50, #66BB6A)', // 초록색
      textColor: '#fff',
      shadowColor: 'rgba(76, 175, 80, 0.3)'
    };
  } else if (amount >= 5000 && amount < 10000) {
    return {
      background: 'linear-gradient(135deg, #2196F3, #42A5F5)', // 파란색
      textColor: '#fff',
      shadowColor: 'rgba(33, 150, 243, 0.3)'
    };
  } else if (amount >= 10000 && amount < 50000) {
    return {
      background: 'linear-gradient(135deg, #FF9800, #FFB74D)', // 주황색
      textColor: '#fff',
      shadowColor: 'rgba(255, 152, 0, 0.3)'
    };
  } else if (amount >= 50000) {
    return {
      background: 'linear-gradient(135deg, #E91E63, #F06292)', // 핑크색
      textColor: '#fff',
      shadowColor: 'rgba(233, 30, 99, 0.3)'
    };
  } else {
    return {
      background: 'linear-gradient(135deg, #9E9E9E, #BDBDBD)', // 회색
      textColor: '#fff',
      shadowColor: 'rgba(158, 158, 158, 0.3)'
    };
  }
};
