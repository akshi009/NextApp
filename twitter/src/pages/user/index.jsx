
import React, { useEffect, useState } from "react";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userIdToUpdate, setUserIdToUpdate] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:8082/user")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, []);
 

  async function addUser() {
    try {
      const response = await fetch("http://localhost:8082/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email }),
      });

      if (response.ok) {
        await response.json();
        setName("");
        setEmail("");
        fetchUsers();
      } else {
        console.error("Error adding user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function updateUser(userIdToUpdate) {
    try {
      const response = await fetch(
        `http://localhost:8082/user/${userIdToUpdate}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: updatedName, email: updatedEmail }),
        }
      );

      if (response.ok) {
        await response.json();
        setUpdatedName("");
        setUpdatedEmail("");
        fetchUsers();
      } else {
        console.error("Error updating user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function deleteUser(userIdToDelete) {
    try {
      const response = await fetch(
        `http://localhost:8082/user/${userIdToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchUsers();
      } else {
        console.error("Error deleting user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function fetchUsers() {
    fetch("http://localhost:8082/user")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }

  return (
    <div>
      <div>
    
        <h1>ADD USER</h1>
        <input
          className=" px-4 py-2 rounded cursor-pointer mt-2  "
          type="text"
          placeholder="Enter User name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ backgroundColor: "grey", color: "white" }}
        />
        <br />
        <input
          className=" px-4 py-2 rounded cursor-pointer mt-2  "
          type="text"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ backgroundColor: "grey", color: "white" }}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mt-2 mx-2" onClick={addUser}>Submit</button>
      </div>
      <h1>User List</h1>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="bg-slate-200 text-black p-4 rounded-lg shadow-md mb-6">
              <li>
                
                id: {user.id},
              </li>
              <li>Name: {user.name},</li>
              <li>Email: {user.email},</li>
              <li>
                <button  className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer mt-2" onClick={() => deleteUser(user.id)}>Delete</button><br/>
                <input
                 className=" px-4 py-2 rounded cursor-pointer mt-2 "
                  type="text"
                  placeholder="New Name"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                   style={{ backgroundColor: "grey", color: "white" }}
                /><br/>
                <input
                 className=" px-4 py-2 rounded cursor-pointer mt-2  "
                  type="text"
                  placeholder="New Email"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                   style={{ backgroundColor: "grey", color: "white" }}
                />
                <button   className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mt-2 mx-2"onClick={() => updateUser(user.id)}>Update</button>
              </li>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>

      
    </div>
  );
};

export default Index;
