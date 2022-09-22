import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, Paper, Typography } from "@material-ui/core";
import PostsList from "./PostsList";

const Posts = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!user && localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const add = () => {
    axios
      .post("http://localhost:5000/post", {
        content: content,
        email: user.email,
        image: user.imageUrl,
        name: user.name,
      })
      .then((response) => {
        console.log(response);
        setPosts([]);
        getAll();
      });
  };

  const getAll = () => {
    axios.get("http://localhost:5000/post").then((response) => {
      console.log(response);
      setPosts(response.data.data);
    });
  };

  const deletePost = (id) => {
    axios.delete("http://localhost:5000/post?id=" + id).then((response) => {
      console.log(response);
      getAll();
    });
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      <Paper style={{ margin: "10px", padding: "10px" }}>
        <Typography variant="h4">News</Typography>
        {user && user.role === "ADMIN" ? (
          <div style={{ width: "100%" }}>
            <TextField
              id="outlined-basic"
              label="Content"
              variant="outlined"
              type="text"
              multiline
              maxRows={4}
              value={content}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
            <br></br>
            <Button
              variant="contained"
              color="primary"
              onClick={add}
              style={{ width: "100%", marginTop: "10px" }}
            >
              Post
            </Button>
          </div>
        ) : (
          <div></div>
        )}
        <div>
          {posts ? (
            <PostsList posts={posts} user={user} delete={deletePost} />
          ) : (
            <div>No posts</div>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default Posts;
