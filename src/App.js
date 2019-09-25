import React, { useEffect } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";

import {
  CHATS_QUERY,
  SEND_MESSAGE_MUTATION,
  MESSAGE_SENT_SUBSCRIPTION
} from "./queries";

function App() {
  let input;

  const { loading, error, data } = useQuery(CHATS_QUERY);
  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION);

  const { data: response, loading: subLoading } = useSubscription(
    MESSAGE_SENT_SUBSCRIPTION
  );
  console.log(response);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className="App">
      {data.chats.map((chat, index) => (
        <div key={index}>
          <div>ID: {chat.id}</div>
          <div>FROM: {chat.from}</div>
          <div>MESSAGE: {chat.message}</div>
        </div>
      ))}
      <form
        onSubmit={e => {
          e.preventDefault();
          sendMessage({ variables: { from: "ziomek", message: input.value } });
          input.value = "";
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

export default App;
