import React from 'react'
import { Transaction } from '@/types'

interface LedgerWidgetProps {
    transactions: Transaction[]
}

const LedgerWidget: React.FC<LedgerWidgetProps> = ({ transactions }) => {
    return (
        <div>{transactions.map(t => (
            JSON.stringify(t)
        ))}</div>
    )
}

export default LedgerWidget;