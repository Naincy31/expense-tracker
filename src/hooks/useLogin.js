import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [resetPwd, setResetPwd] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);

        //sign the user in
        try {
            await signInWithEmailAndPassword(projectAuth, email, password)
            //dispatch login action
            dispatch({ type: 'LOGIN', payload: projectAuth.currentUser})

            //update state
            if(!isCancelled){
                setIsPending(false);
                setError(null);
            }
            
        } catch (err) {
            if(!isCancelled){
                setError(err.message);
                setIsPending(false);
            }
        }
    }

    const resetPassword = async (email) => {
        setError(null);
        setIsPending(true);
        setResetPwd(false)

        //send password reset mail
        try {

            await sendPasswordResetEmail(projectAuth, email)
            
            //update state
            if(!isCancelled){
                setIsPending(false);
                setError(null);
                setResetPwd(true)
            }
            
        } catch (err) {
            if(!isCancelled){
                setError(err.message);
                setIsPending(false);
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, [])

    return {login, resetPassword, error, isPending, resetPwd}

}