

export interface Transaction {
    id: string;
    type: "CHARGE" | "USE" | "REFUND";
    amount: number;
    createdAt: string;
    description: string;
  }
  
  export interface BalanceData {
    balance: number;
    transactions: Transaction[];
  }
  
  export interface BalanceResponse {
    status: string; 
    message: string;
    data: BalanceData;
    timestamp: string;
  }