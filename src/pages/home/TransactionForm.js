import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

const TransactionForm = ({ uid }) => {
    const [transactionName, setTransactionName] = useState('');
    const [amount, setAmount] = useState('');
    const { addDocument, response } =  useFirestore('transactions');

    const handleSubmit = (e) => {
        e.preventDefault()
        addDocument({
            uid,
            transactionName, 
            amount
        })
    }

    //reset the form fields
    useEffect(() => {
        if(response.success){
            setTransactionName('')
            setAmount('')
        }
    }, [response.success])

  return (
    <>
        <h3>Add Transaction</h3>
        <form onSubmit={handleSubmit} className="transaction-form">
            <label>
                <span>Transaction name:</span>
                <input 
                    type="text"
                    required
                    onChange={(e) => setTransactionName(e.target.value)}
                    value={transactionName}
                />
            </label>
            <label>
                <span>Amount (₹):</span>
                <input 
                    type="number"
                    required
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                />
            </label>
            <button>Add Transaction</button>
        </form>
    </>
    
  )
}

export default TransactionForm;