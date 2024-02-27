import { useState, useEffect, useRef } from "react"
import { db } from "../firebase/config"
import { collection, onSnapshot, where, query, orderBy } from "firebase/firestore"

export const useCollection = (collectionName, queryDoc) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    //If we don't use a ref -> infinite loop in useEffect
    //queryDoc is an array and is diff on every function call and is being passed as a reference
    const _query = useRef(queryDoc).current

    useEffect(() => {
        let ref = query(collection(db, collectionName), where(..._query), orderBy("createdAt", "desc"))

        const getDocuments = async () => {

            const unsubscribe = await onSnapshot(ref, (snapshot) => {
                let results = []
                snapshot.forEach(( doc ) => {
                    results.push({ ...doc.data(), id: doc.id })
                })
    
                //update state
                setDocuments(results)
                setError(null)
            }, (error) => {
                console.log(error);
                setError('Could not fetch the data')
            })

            //unsubscribe on unmount
            return () => unsubscribe();
        }

        getDocuments();

    }, [collectionName, _query])

    return { documents, error }
}