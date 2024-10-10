"use client";

import React, { createContext, useContext, useState } from 'react';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactionTrigger, setTransactionTrigger] = useState(false);

  return (
    <TransactionContext.Provider value={{ transactionTrigger, setTransactionTrigger }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);