import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import TodoCard from "./TodoCard";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function UserDashboard() {
  const { userInfo, currentUser } = useAuth();
  const [addTodo, setAddTodo] = useState(false);
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState({});
  console.log(todoList);

  // useEffect(() => {
  //   if (!userInfo || Object.keys(userInfo).length === 0) {
  //     setAddTodo(true);
  //   }
  // }, [userInfo]);

  async function handleAddTodo() {
    if (!todo) {
      return;
    }
    const newKey =
      Object.keys(todoList).length === 0
        ? 1
        : Math.max(...Object.keys(todoList)) + 1;
    setTodoList({
      ...todoList,
      [newKey]: todo,
    });
    setTodo("");
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        todos: {
          [newKey]: todo,
        },
      },
      { merge: true }
    );
  }

  return (
    <div className="w-full max-w-[65ch] text-xs sm:text-sm mx-auto flex flex-col gap-3 sm:gap-5">
      <div className="flex items-stretch">
        <input
          type="text"
          placeholder="Enter Todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="outline-none p-3 text-base sm:text-lg text-slate-900 flex-1"
        />
        <button
          onClick={handleAddTodo}
          className="w-fit px-4 sm:px-6 py-2 sm:py-3 bg-amber-400 text-white font-medium text-base duration-300 hover:opacity-40"
        >
          ADD
        </button>
      </div>
      {userInfo && (
        <>
          {Object.keys(todoList).map((todo, i) => {
            return <TodoCard key={i}>{todoList[todo]}</TodoCard>;
          })}
        </>
      )}
      {/* {!addTodo && (
        <button
          onClick={() => setAddTodo(true)}
          className="text-cyan-300 border border-solid border-cyan-300 py-2 text-center uppercase text-lg duration-300 hover:opacity-30"
        >
          ADD TODO
        </button>
      )} */}
    </div>
  );
}
