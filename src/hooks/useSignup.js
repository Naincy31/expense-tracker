import { useState, useEffect } from "react"; 
import { projectAuth, provider } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { useAuthContext }  from "./useAuthContext";

const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)

    try {
        //signup user
        const res = await createUserWithEmailAndPassword(projectAuth, email, password);

        if(!res){
            throw new Error('Could not complete signup');
        }

        //Add display name to current user
        await updateProfile(projectAuth.currentUser, { displayName })

        //dispatch login action
        dispatch({ type: 'LOGIN', payload: projectAuth.currentUser})

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

  const googleSignIn = async () => {
    setError(null)
    setIsPending(true)

    try{

      const res = await signInWithPopup(projectAuth, provider)

      if(!res){
        throw new Error('Could not complete signup');
      }

      //dispatch login action
      dispatch({ type: 'LOGIN', payload: projectAuth.currentUser})

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

  useEffect(() => {
    return () => setIsCancelled(true);
  }, [])

  return {error, isPending, signup, googleSignIn}
}

export default useSignup;