import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  makeStyles,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Axios from "axios";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const PostsList = (props) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {props.posts.map((post) => {
        return (
          <ListItem
            alignItems="flex-start"
            style={{
              border: "1px solid #999",
              padding: "10px",
              marginTop: "5px",
              borderRadius: "5px",
            }}
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={post.image} />
            </ListItemAvatar>
            <ListItemText
              primary={post.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {moment(post.addedOn).format('DD MMM, hh:mm A')}
                  </Typography>
                  <br></br>
                  {post.content}
                </React.Fragment>
              }
            />
            {props.user &&
            post.email === props.user.email &&
            props.user.role === "ADMIN" ? (
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => props.delete(post._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            ) : (
              <div></div>
            )}
          </ListItem>
        );
      })}
    </List>
  );
};

export default PostsList;
