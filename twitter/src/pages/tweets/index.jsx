import React, { useEffect, useState } from "react";

function Index() {
  const [users, setUsers] = useState([]);
  const [tweetContent, setTweetContent] = useState(""); 
  const [tweetId, setTweetId] = useState("");
  const [updatedTweet, setUpdatedTweet] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8082/twitter")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, []);

  async function addTweet() {
    try {
      const response = await fetch("http://localhost:8082/twitter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: parseInt(tweetId),content: tweetContent }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Tweet added:", data);
        setTweetContent(""); 
        setTweetId("");
        window.location.reload();
       
      } else {
        console.error("Error adding tweet");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function updateTweet(tweetIdToUpdate) {
    try {
      const response = await fetch(
        `http://localhost:8082/twitter/${tweetIdToUpdate}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: parseInt(tweetId), content: tweetContent }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Tweet updated:", data);
        setTweetContent(""); 
        setTweetId("");
        setUpdatedTweet(data); 
        window.location.reload();
      } else {
        console.error("Error updating tweet");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function deleteTweet(tweetIdToDelete) {
    try {
      const response = await fetch(
        `http://localhost:8082/twitter/${tweetIdToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Tweet deleted:", tweetIdToDelete);
        // Optionally, you can refresh the list of tweets here
        window.location.reload();
      } else {
        console.error("Error deleting tweet");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <h1>Add Tweets</h1>
      <input
      className=" px-4 py-2 rounded cursor-pointer mt-2"
        type="text"
        placeholder="Enter User Id"
        value={tweetId}
        onChange={(e) => setTweetId(e.target.value)} 
        style={{ backgroundColor: "grey", color: "white" }}
      /><br/>
      <input
      className=" px-4 py-2 rounded cursor-pointer mt-2"
        type="text"
        placeholder="Enter your tweet"
        value={tweetContent}
        onChange={(e) => setTweetContent(e.target.value)} 
        style={{ backgroundColor: "grey", color: "white" }}
      />
      <button  className="bg-blue-500 text-white px-4 py-2 mx-2 rounded cursor-pointer" onClick={addTweet}>Submit</button>


      <h1>User Tweets</h1>
      <ul>
  {users.map((user) => (
    <div key={user.id} className="bg-slate-300 text-black p-4 rounded-lg shadow-md mb-6">
      <li className="mb-2">
        <span className="font-semibold">Name:</span> {user.user.name}
      </li>
      <li className="mb-2">
        <span className="font-semibold">ID:</span> {user.id}
      </li>
      <li className="mb-2">
        <span className="font-semibold">Content:</span> {user.content}
      </li>
      <li className="mb-2">
        <span className="font-semibold">Created_at:</span> {user.created_at}
      </li>
      <li>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer mt-2"
          onClick={() => deleteTweet(user.id)}
        >
          Delete
        </button>
      </li>
    </div>
  ))}
</ul>
<h1>UPDATE TWEETS</h1>
     
      <input
      className=" px-4 py-2 rounded cursor-pointer mt-2"
        type="text"
        placeholder="Enter Tweet ID"
        value={tweetId}
        onChange={(e) => setTweetId(e.target.value)}
        style={{ backgroundColor: "grey", color: "white" }}
      /><br />
      <input
       className=" px-4 py-2 rounded cursor-pointer mt-2"
        type="text"
        placeholder="Enter new content"
        value={tweetContent}
        onChange={(e) => setTweetContent(e.target.value)}
        style={{ backgroundColor: "grey", color: "white" }}
      />
      <button  className="bg-blue-500 text-white px-4 py-2 mx-2 rounded cursor-pointer" onClick={() => updateTweet(tweetId)}>Update Tweet</button>
    </div>
  );
}

export default Index;
