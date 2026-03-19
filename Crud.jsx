


import React, { useRef, useState } from "react";

export default function Uncontrolled() {

  let stored = JSON.parse(localStorage.getItem("user")) || [];

  const inputRef = useRef(null);
  const [list, setList] = useState(stored);
  const [edit, setEdit] = useState(null);

  function handleAdd() {
    const task = inputRef.current.value;
    if (!task) return;

    let updateList;

    if (edit !== null) {
      updateList = [...list];
      updateList[edit] = task;
      setEdit(null);
    } else {
      updateList = [...list, task];
    }

    setList(updateList);
    localStorage.setItem("user", JSON.stringify(updateList));
    inputRef.current.value = "";
  }

  function handleEdit(index) {
    inputRef.current.value = list[index];
    setEdit(index);
  }

  function handleDelete(index) {
    const updateList = [...list];
    updateList.splice(index, 1);

    setList(updateList);
    localStorage.setItem("user", JSON.stringify(updateList));
  }

  return (
    <div style={{
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      textAlign: "center",
      backgroundColor: "#f9f9f9"
    }}>

      <h2 style={{ marginBottom: "15px" }}>Todo App</h2>

      <input
        type="text"
        placeholder="Enter The Task"
        ref={inputRef}
        style={{
          width: "70%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginRight: "10px"
        }}
      />

      <button
        onClick={handleAdd}
        style={{
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          backgroundColor: edit !== null ? "#ffc107" : "#28a745",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        {edit !== null ? "Update" : "Add"}
      </button>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {list.map((item, index) => (
          <li key={index}
            style={{
              background: "#fff",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
          >
            <span>{item}</span>

            <div>
              <button
                onClick={() => handleEdit(index)}
                style={{
                  marginRight: "5px",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(index)}
                style={{
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </div>

          </li>
        ))}
      </ul>

    </div>
  );
}

        