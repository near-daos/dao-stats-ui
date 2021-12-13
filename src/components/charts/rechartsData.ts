type ChartData = {
  name: string;
  ['Total In']: number;
  ['Total Out']: number;
  id: number;
};

type RechartsData = {
  monthlyData: ChartData[];
  last9Months: ChartData[];
  last6Months: ChartData[];
  last3Months: ChartData[];
  dailyData: ChartData[];
  last9Daily: ChartData[];
  last6Daily: ChartData[];
  last3Daily: ChartData[];
  lastMonth: ChartData[];
  last7days: ChartData[];
  last30days: ChartData[];
};

const getRechartsData = (): RechartsData => {
  const monthlyData: ChartData[] = [
    { name: 'Jan', 'Total In': 400, 'Total Out': 450, id: 0 },
    { name: 'Feb', 'Total In': 500, 'Total Out': 570, id: 1 },
    { name: 'Mar', 'Total In': 200, 'Total Out': 200, id: 2 },
    { name: 'Apr', 'Total In': 230, 'Total Out': 240, id: 3 },
    { name: 'May', 'Total In': 220, 'Total Out': 220, id: 4 },
    { name: 'Jun', 'Total In': 300, 'Total Out': 315, id: 5 },
    { name: 'Jul', 'Total In': 500, 'Total Out': 550, id: 6 },
    { name: 'Aug', 'Total In': 400, 'Total Out': 450, id: 7 },
    { name: 'Sep', 'Total In': 500, 'Total Out': 570, id: 8 },
    { name: 'Oct', 'Total In': 200, 'Total Out': 230, id: 9 },
    { name: 'Nov', 'Total In': 200, 'Total Out': 200, id: 10 },
    { name: 'Dec', 'Total In': 300, 'Total Out': 315, id: 11 },
  ];

  const dailyData: ChartData[] = [
    { name: '1/1/20', 'Total In': 400, 'Total Out': 450, id: 12 },
    { name: '1/2/20', 'Total In': 500, 'Total Out': 570, id: 13 },
    { name: '1/3/20', 'Total In': 200, 'Total Out': 200, id: 14 },
    { name: '1/4/20', 'Total In': 230, 'Total Out': 240, id: 15 },
    { name: '1/5/20', 'Total In': 220, 'Total Out': 220, id: 16 },
    { name: '1/6/20', 'Total In': 300, 'Total Out': 315, id: 17 },
    { name: '1/7/20', 'Total In': 500, 'Total Out': 550, id: 18 },
    { name: '1/8/20', 'Total In': 400, 'Total Out': 450, id: 19 },
    { name: '1/9/20', 'Total In': 500, 'Total Out': 570, id: 20 },
    { name: '1/10/20', 'Total In': 200, 'Total Out': 230, id: 21 },
    { name: '1/11/20', 'Total In': 200, 'Total Out': 200, id: 22 },
    { name: '1/12/20', 'Total In': 300, 'Total Out': 315, id: 23 },
  ];

  const lastMonth: ChartData[] = [
    { name: '1/11/20', 'Total In': 400, 'Total Out': 450, id: 24 },
    { name: '2/11/20', 'Total In': 500, 'Total Out': 570, id: 25 },
    { name: '3/11/20', 'Total In': 200, 'Total Out': 200, id: 26 },
    { name: '4/11/20', 'Total In': 230, 'Total Out': 240, id: 27 },
    { name: '5/11/20', 'Total In': 220, 'Total Out': 220, id: 28 },
    { name: '6/11/20', 'Total In': 300, 'Total Out': 315, id: 29 },
    { name: '7/11/20', 'Total In': 500, 'Total Out': 550, id: 30 },
    { name: '8/11/20', 'Total In': 400, 'Total Out': 450, id: 31 },
    { name: '9/11/20', 'Total In': 500, 'Total Out': 570, id: 32 },
    { name: '10/11/20', 'Total In': 200, 'Total Out': 230, id: 33 },
    { name: '11/11/20', 'Total In': 200, 'Total Out': 200, id: 34 },
    { name: '12/11/20', 'Total In': 300, 'Total Out': 315, id: 35 },
    { name: '13/11/20', 'Total In': 300, 'Total Out': 315, id: 36 },
    { name: '14/11/20', 'Total In': 340, 'Total Out': 350, id: 37 },
    { name: '15/11/20', 'Total In': 350, 'Total Out': 350, id: 38 },
    { name: '16/11/20', 'Total In': 340, 'Total Out': 350, id: 39 },
    { name: '17/11/20', 'Total In': 320, 'Total Out': 340, id: 40 },
    { name: '18/11/20', 'Total In': 350, 'Total Out': 350, id: 41 },
    { name: '19/11/20', 'Total In': 370, 'Total Out': 390, id: 42 },
    { name: '20/11/20', 'Total In': 375, 'Total Out': 375, id: 43 },
    { name: '21/11/20', 'Total In': 350, 'Total Out': 375, id: 44 },
    { name: '22/11/20', 'Total In': 345, 'Total Out': 350, id: 45 },
    { name: '23/11/20', 'Total In': 345, 'Total Out': 350, id: 46 },
    { name: '24/11/20', 'Total In': 320, 'Total Out': 320, id: 47 },
    { name: '25/11/20', 'Total In': 300, 'Total Out': 315, id: 48 },
    { name: '26/11/20', 'Total In': 280, 'Total Out': 300, id: 49 },
    { name: '27/11/20', 'Total In': 300, 'Total Out': 300, id: 50 },
    { name: '28/11/20', 'Total In': 310, 'Total Out': 315, id: 51 },
    { name: '29/11/20', 'Total In': 340, 'Total Out': 350, id: 52 },
    { name: '30/11/20', 'Total In': 290, 'Total Out': 340, id: 53 },
    { name: '31/11/20', 'Total In': 300, 'Total Out': 315, id: 54 },
  ];

  const last9Months: ChartData[] = [];
  const last6Months: ChartData[] = [];
  const last3Months: ChartData[] = [];
  const last7days: ChartData[] = [];
  const last30days: ChartData[] = [];

  const last9Daily: ChartData[] = [];
  const last6Daily: ChartData[] = [];
  const last3Daily: ChartData[] = [];

  lastMonth.forEach((currentValue, index) => {
    if (index >= 0) {
      last30days.push(currentValue);
    }

    if (index > 23) {
      last7days.push(currentValue);
    }
  });

  monthlyData.forEach((currentValue, index) => {
    if (index > 2) {
      last9Months.push(currentValue);
    }

    if (index > 5) {
      last6Months.push(currentValue);
    }

    if (index > 8) {
      last3Months.push(currentValue);
    }
  });

  dailyData.forEach((currentValue, index) => {
    if (index > 2) {
      last9Daily.push(currentValue);
    }

    if (index > 5) {
      last6Daily.push(currentValue);
    }

    if (index > 8) {
      last3Daily.push(currentValue);
    }
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
};

const pieData = [
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

export { getRechartsData, pieData };
