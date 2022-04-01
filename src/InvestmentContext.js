import React from 'react'

const InvestmentContext = React.createContext()

export const InvestmentProvider = InvestmentContext.Provider
export const InvestmentConsumer = InvestmentContext.Consumer

export default InvestmentContext