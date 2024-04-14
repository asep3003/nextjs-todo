import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

export default function useFetchTodos() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchData(params) {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTodos("todos" in docSnap.data() ? docSnap.data().todos : {});
        } else {
          setTodos({});
        }
      } catch (error) {
        setError("Failed to load todos");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { loading, error, todos, setTodos };
}
