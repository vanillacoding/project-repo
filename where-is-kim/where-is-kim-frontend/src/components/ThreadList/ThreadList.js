import React from "react";
import ThreadItem from "../ThreadItem/Container";

export default function ThreadList({ threads }) {
  return (
    <div>
      {threads.map((thread) => {
        const {
          id,
          createdBy: { username, profile },
          text,
          createdAt,
          likes,
          comments,
        } = thread;

        return (
          <ThreadItem
            key={id}
            id={id}
            profile={profile}
            username={username}
            text={text}
            createdAt={createdAt}
            likes={likes}
            comments={comments}
          />
        );
      })}
    </div>
  );
}
