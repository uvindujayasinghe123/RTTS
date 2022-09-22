import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, Paper, Typography } from "@material-ui/core";
import PostsList from "./PostsList";

const FeedBack = (props) => {
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
      .post("http://localhost:5000/feedback", {
        content: content,
        email: user.email,
        image: user.imageUrl,
        name: user.name ? user.name : user.firstName + " " + user.lastName
      })
      .then((response) => {
        console.log(response);
        setContent("")
        props.alert("Success");
      });
  };

  const getAll = () => {
    axios.get("http://localhost:5000/feedback").then((response) => {
      console.log(response);
      setPosts(response.data.data);
    });
  };

  const deletePost = (id) => {
    axios.delete("http://localhost:5000/feedback?id=" + id).then((response) => {
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
        <Typography variant="h4">Feedback</Typography>
        {user ? (
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
              Add feedback
            </Button>
          </div>
        ) : (
          <div>Login to give a feedback</div>
        )}
        <div>
          {posts && user?.role === "ADMIN" ? (
            <PostsList posts={posts} user={user} delete={deletePost} />
          ) : (
            <div></div>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default FeedBack;
