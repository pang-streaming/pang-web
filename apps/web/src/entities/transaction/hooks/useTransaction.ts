import { useEffect, useState } from "react";
import { Transaction } from "../model/type";
import { fetchTransaction } from "../api";

export const useTransaction = () => {
  const [transaction, setTransaction] = useState<Transaction>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetchTransaction();
        setTransaction(res.data);
        console.log("거래내역" ,res.data)
      } catch (e) {
        setError(e as Error);
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return { transaction, loading, error };
};
