import { useParams } from 'react-router-dom'
import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'

//styles
import styles from './Home.module.css'
import { useAuthContext } from '../../hooks/useAuthContext'

const TransactionList = () => {
    const { user } = useAuthContext()
    const { deleteDocument } = useFirestore('transactions')
    const { category } = useParams()
    const { documents, error} = useCollection('transactions', ["uid", "==", user.uid], ["category", "==", category] , ["createdAt", "desc"])

  return (
    <ul className={styles.transactions}>
        {documents?.map((transaction) => (
            <li key={transaction.id}>
                <p className={styles.name}>{transaction.transactionName}</p>
                <p className={styles.amount}>₹ {transaction.amount}</p>
                <button onClick={() => deleteDocument(transaction.id)}>x</button>
            </li>
        ))}
        {error && <p className='error'>{error}</p>}
    </ul>
  )
}

export default TransactionList