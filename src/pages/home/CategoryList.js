import React, { useEffect, useState } from 'react';

// styles
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const CategoryList = ({ transactions }) => {
    // State to store grouped transactions by category
    const [groupedTransactions, setGroupedTransactions] = useState({});

    useEffect(() => {
        const grouped = {};

        // Group transactions by category
        transactions.forEach((transaction) => {
            const category = transaction.category;
            
            // Initialize the category array if it doesn't exist
            if (!grouped[category]) {
                grouped[category] = [];
            }

            // Add the transaction to the category array
            grouped[category].push(transaction);
        });

        // Update the state variable with the grouped transactions
        setGroupedTransactions(grouped);
    }, [transactions]);

    return (
        <ul className={styles.categories}>
            {/* Iterate through each category */}
            {Object.keys(groupedTransactions).map((category) => (
                <li key={category}>
                    <Link to = {`/transactions/${category}`}>
                        <p className={styles.name}>{category}</p>
                        <p className={styles.amount}>
                        {`₹ `}
                            {groupedTransactions[category].reduce((total, transaction) => {
                                    return total + Number(transaction.amount);
                            }, 0)}
                        </p>
                    </Link>
                </li>
                
            ))}
        </ul>
    );
};

export default CategoryList;
