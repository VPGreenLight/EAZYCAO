export interface BestSellingProduct {
    productId: number;
    productName: string;
    price: number;
    totalQuantitySold: number;
  }
  
  export interface DashboardData {
    productCount: number;
    userCount: number;
    feedbackCount: number;
    orderCount: number;
    totalRevenue: number;
    allMonths: string[];
    monthlyRevenues: number[];
    bestSellingProducts: BestSellingProduct[];
    quantitySold: number;
    percentGrowth: number;
  }
  