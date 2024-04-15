import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import CategoryList from './CategoryList';

//styles
import styles from './Home.module.css';

//components
import TransactionForm from './TransactionForm';

const Home = () => {
  const { user } = useAuthContext()
  const { documents, error} = useCollection('transactions', ["uid", "==", user.uid] , null, ["createdAt", "desc"])

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid}/>
      </div>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <CategoryList transactions = {documents} />}
      </div>
    </div>
  )
}

export default Home