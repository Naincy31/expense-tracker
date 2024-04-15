import { useState, useEffect, useRef } from "react"
import { db } from "../firebase/config"
import { collection, onSnapshot, where, query, orderBy } from "firebase/firestore"

export const useCollection = (collectionName, queryDoc1, queryDoc2, orderDoc) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    //If we don't use a ref -> infinite loop in useEffect
    //queryDoc is an array and is diff on every function call and is being passed as a reference
    const _query1 = useRef(queryDoc1).current
    const _query2 = useRef(queryDoc2).current
    const _order = useRef(orderDoc).current

    useEffect(() => {
        let ref = _query2 ? query(collection(db, collectionName), where(..._query1), where(..._query2), orderBy(..._order)) : query(collection(db, collectionName), where(..._query1), orderBy(..._order))

        const getDocuments = () => {
            setError(null)

            const unsubscribe = onSnapshot(ref, (snapshot) => {
                let results = []
                snapshot.forEach(( doc ) => {
                    results.push({ ...doc.data(), id: doc.id })
                })
    
                //update state
                setDocuments(results)
                setError(null)
            }, (error) => {
                setError(error.message)
            })

            //unsubscribe on unmount
            return () => unsubscribe();
        }

        getDocuments();

    }, [collectionName, _query1, _query2, _order])

    return { documents, error }
}