export function RechartsData() {
  const monthlyData = [
    { name: 'Jan', 'Total In': 400, 'Total Out': 450 },
    { name: 'Feb', 'Total In': 500, 'Total Out': 570 },
    { name: 'Mar', 'Total In': 200, 'Total Out': 200 },
    { name: 'Apr', 'Total In': 230, 'Total Out': 240 },
    { name: 'May', 'Total In': 220, 'Total Out': 220 },
    { name: 'Jun', 'Total In': 300, 'Total Out': 315 },
    { name: 'Jul', 'Total In': 500, 'Total Out': 550 },
    { name: 'Aug', 'Total In': 400, 'Total Out': 450 },
    { name: 'Sep', 'Total In': 500, 'Total Out': 570 },
    { name: 'Oct', 'Total In': 200, 'Total Out': 230 },
    { name: 'Nov', 'Total In': 200, 'Total Out': 200 },
    { name: 'Dec', 'Total In': 300, 'Total Out': 315 },
  ];

  const dailyData = [
    { name: '1/1/20', 'Total In': 400, 'Total Out': 450 },
    { name: '1/2/20', 'Total In': 500, 'Total Out': 570 },
    { name: '1/3/20', 'Total In': 200, 'Total Out': 200 },
    { name: '1/4/20', 'Total In': 230, 'Total Out': 240 },
    { name: '1/5/20', 'Total In': 220, 'Total Out': 220 },
    { name: '1/6/20', 'Total In': 300, 'Total Out': 315 },
    { name: '1/7/20', 'Total In': 500, 'Total Out': 550 },
    { name: '1/8/20', 'Total In': 400, 'Total Out': 450 },
    { name: '1/9/20', 'Total In': 500, 'Total Out': 570 },
    { name: '1/10/20', 'Total In': 200, 'Total Out': 230 },
    { name: '1/11/20', 'Total In': 200, 'Total Out': 200 },
    { name: '1/12/20', 'Total In': 300, 'Total Out': 315 },
  ];

  const lastMonth = [
    { name: '1/11/20', 'Total In': 400, 'Total Out': 450 },
    { name: '2/11/20', 'Total In': 500, 'Total Out': 570 },
    { name: '3/11/20', 'Total In': 200, 'Total Out': 200 },
    { name: '4/11/20', 'Total In': 230, 'Total Out': 240 },
    { name: '5/11/20', 'Total In': 220, 'Total Out': 220 },
    { name: '6/11/20', 'Total In': 300, 'Total Out': 315 },
    { name: '7/11/20', 'Total In': 500, 'Total Out': 550 },
    { name: '8/11/20', 'Total In': 400, 'Total Out': 450 },
    { name: '9/11/20', 'Total In': 500, 'Total Out': 570 },
    { name: '10/11/20', 'Total In': 200, 'Total Out': 230 },
    { name: '11/11/20', 'Total In': 200, 'Total Out': 200 },
    { name: '12/11/20', 'Total In': 300, 'Total Out': 315 },
    { name: '13/11/20', 'Total In': 300, 'Total Out': 315 },
    { name: '14/11/20', 'Total In': 340, 'Total Out': 350 },
    { name: '15/11/20', 'Total In': 350, 'Total Out': 350 },
    { name: '16/11/20', 'Total In': 340, 'Total Out': 350 },
    { name: '17/11/20', 'Total In': 320, 'Total Out': 340 },
    { name: '18/11/20', 'Total In': 350, 'Total Out': 350 },
    { name: '19/11/20', 'Total In': 370, 'Total Out': 390 },
    { name: '20/11/20', 'Total In': 375, 'Total Out': 375 },
    { name: '21/11/20', 'Total In': 350, 'Total Out': 375 },
    { name: '22/11/20', 'Total In': 345, 'Total Out': 350 },
    { name: '23/11/20', 'Total In': 345, 'Total Out': 350 },
    { name: '24/11/20', 'Total In': 320, 'Total Out': 320 },
    { name: '25/11/20', 'Total In': 300, 'Total Out': 315 },
    { name: '26/11/20', 'Total In': 280, 'Total Out': 300 },
    { name: '27/11/20', 'Total In': 300, 'Total Out': 300 },
    { name: '28/11/20', 'Total In': 310, 'Total Out': 315 },
    { name: '29/11/20', 'Total In': 340, 'Total Out': 350 },
    { name: '30/11/20', 'Total In': 290, 'Total Out': 340 },
    { name: '31/11/20', 'Total In': 300, 'Total Out': 315 },
  ];

  const last9Months = [];
  const last6Months = [];
  const last3Months = [];
  const last7days = [];
  const last30days = [];

  const last9Daily = [];
  const last6Daily = [];
  const last3Daily = [];

  lastMonth.map((currentValue, index) => {
    if (index >= 0) {
      return last30days.push(currentValue);
    }

    return undefined;
  });

  lastMonth.forEach((currentValue, index) => {
    if (index > 23) {
      return last7days.push(currentValue);
    }

    return undefined;
  });

  monthlyData.forEach((currentValue, index) => {
    if (index > 2) {
      return last9Months.push(currentValue);
    }

    return undefined;
  });

  monthlyData.forEach((currentValue, index) => {
    if (index > 5) {
      return last6Months.push(currentValue);
    }

    return undefined;
  });

  monthlyData.forEach((currentValue, index) => {
    if (index > 8) {
      return last3Months.push(currentValue);
    }

    return undefined;
  });

  dailyData.forEach((currentValue, index) => {
    if (index > 2) {
      return last9Daily.push(currentValue);
    }

    return undefined;
  });

  dailyData.forEach((currentValue, index) => {
    if (index > 5) {
      return last6Daily.push(currentValue);
    }

    return undefined;
  });

  dailyData.forEach((currentValue, index) => {
    if (index > 8) {
      return last3Daily.push(currentValue);
    }

    return undefined;
  });

  return {
    monthlyData,
    last9Months,
    last6Months,
    last3Months,
    dailyData,
    last9Daily,
    last6Daily,
    last3Daily,
    lastMonth,
    last7days,
    last30days,
  };
}

export const PieDatas = [
  [
    { name: 'Payout', value: 60 },
    { name: 'Council member', value: 30 },
    { name: 'Policy change', value: 5 },
    { name: 'Expired', value: 5 },
  ],
  [
    { name: 'Payout', value: 40 },
    { name: 'Council member', value: 20 },
    { name: 'Policy change', value: 30 },
    { name: 'Expired', value: 10 },
  ],
  [
    { name: 'Payout', value: 44 },
    { name: 'Council member', value: 12 },
    { name: 'Policy change', value: 17 },
    { name: 'Expired', value: 27 },
  ],
  [
    { name: 'Payout', value: 33 },
    { name: 'Council member', value: 13 },
    { name: 'Policy change', value: 17 },
    { name: 'Expired', value: 37 },
  ],
];
