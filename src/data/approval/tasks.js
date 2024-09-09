export const tasks = [
  {
    type: 'planning',
    status: 'pending',
    title: 'Self Development',
    description: "Yemisirach is waiting for your approval, don't forget to reflect on her task",
    image: '',
    username: 'Yemisirach Abebe',
    position: 'Pharmacist',
    step: 3,
    date: '14/08/2024',
    onPress: () => alert('Task: Self Development')
  },
  {
    type: 'evaluation',
    status: 'rejected',
    title: 'Inventory Management',
    description: 'Tesfaye is currently working on the inventory audit.',
    image: '',
    username: 'Tesfaye Bekele',
    position: 'Inventory Manager',
    step: 3,
    date: '13/08/2024',
    onPress: () => alert('Task: Inventory Management')
  },
  {
    type: 'planning',
    status: 'amended',
    title: 'Monthly Sales Report',
    description: 'The sales report for July is ready for review.',
    image: '',
    username: 'Meklit Tadesse',
    position: 'Sales Analyst',
    step: 3,
    date: '12/08/2024',
    onPress: () => alert('Task: Monthly Sales Report')
  },
  {
    type: 'planning',
    status: 'approved',
    title: 'Product Launch',
    description: 'The product launch plan is pending your approval.',
    image: '',
    username: 'Liya Ayele',
    position: 'Marketing Specialist',
    step: 3,
    date: '15/08/2024',
    onPress: () => alert('Task: Product Launch')
  },
  {
    type: 'evaluation',
    status: 'approved',
    title: 'Customer Feedback Analysis',
    description: 'Dawit has completed the initial analysis of customer feedback.',
    image: '',
    username: 'Dawit Alemu',
    position: 'Customer Service Lead',
    step: 3,
    date: '16/08/2024',
    onPress: () => alert('Task: Customer Feedback Analysis')
  }
];
