import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import Select from 'react-select'

const categories = [
    { value: 'household', label: 'Household'},
    { value: 'investments', label: 'Investments'},
    { value: 'bills', label: 'Bills'},
    { value: 'rent', label: 'Rent'},
    { value: 'beauty-fitness', label: 'Beauty & Fitness'},
    { value: 'eating-out', label: 'Eating Out'},
    { value: 'entertainment', label: 'Entertainment'},
    { value: 'grocery', label: 'Grocery'},
    { value: 'medical', label: 'Medical'},
    { value: 'travel', label: 'Travel'},
    { value: 'shopping', label: 'Shopping'}
  ]

const TransactionForm = ({ uid }) => {
    const [transactionName, setTransactionName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('')
    const { addDocument, response } =  useFirestore('transactions');
    const [categoryError, setCategoryError] = useState(null)

    const customStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            fontSize: 14,
            borderColor: 'none',
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' , borderColor: 'none', outline: 'none'},
        }),
        menu: (baseStyles) => ({
            ...baseStyles,
            zIndex: 1, // To ensure the dropdown appears above other elements
            scroll: 'auto',
            padding: 0,
            margin: 0
        }),
        option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused  ? '#1f9751' : 'transparent', // Change background color on focus
            '&:active': { backgroundColor:  '#1f9751' },
            color: state.isFocused ? '#fff' : '#333', // Change text color on focus
            padding: 10, // Adjust padding for options
            margin: -4,
            cursor: 'pointer',
            fontSize: 14,
        }),

        noOptionsMessage: (baseStyles) => ({
            ...baseStyles,
            fontSize: 12,
            padding: 3
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setCategoryError(null)

        if(!category){
            setCategoryError('Please select a category')
            return
        }

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
            setCategory('')
        }
    }, [response.success])

  return (
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
            <label>
                <span>Category:</span>
                <Select
                    onChange={(option) => setCategory(option)}
                    options={categories}
                    placeholder='Select a category...'
                    styles={customStyles}
                    backspaceRemovesValue = {true}
                />
            </label>
            {categoryError && <p className='error'>{categoryError}</p>}
            <button>Add Transaction</button>
        </form>
    
  )
}

export default TransactionForm;