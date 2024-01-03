import { useState, useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const ViewMessages = () => {
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState(null);

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data: messages, error, isLoading, mutate } = useSWR("/api/messages", fetcher);
// console.log(messages)
  useEffect(() => {
    updateStatistics(messages);
  }, [messages]);

  const deleteAllMessages = async () => {
    try {
      setLoading(true);
      await axios.delete("/api/messages");
      mutate();
    } catch (error) {
      console.error("Error deleting messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatistics = (messages) => {
    const totalMessages = messages?.length;
    const latestMessage = messages?.length > 0 ? messages[0] : null;

    let totalWords = 0;
    let maxMessagesInADay = 0;
    const messagesPerDay = {};

    messages?.forEach((message) => {
      totalWords += message?.content?.split(" ")?.length;

      const messageDate = new Date(message.timestamp)?.toLocaleDateString("en-US");
      messagesPerDay[messageDate] = (messagesPerDay[messageDate] || 0) + 1;

      if (messagesPerDay[messageDate] > maxMessagesInADay) {
        maxMessagesInADay = messagesPerDay[messageDate];
      }
    });

    const averageWordsPerMessage = totalWords / totalMessages;

    setStatistics({
      totalMessages,
      latestMessageTimestamp: latestMessage ? latestMessage.timestamp : null,
      averageWordsPerMessage: isNaN(averageWordsPerMessage) ? 0 : averageWordsPerMessage.toFixed(2),
      maxMessagesInADay,
    });
  };


  const formatDate = (timestamp) => {
    const options = { weekday: "long", hour: "numeric", minute: "numeric" };
    return new Date(timestamp).toLocaleDateString("en-US", options);
  };

  return (
    <div className="container">
      <section className="section">
        <div className="container">
          <h1 className="title has-text-centered">View Messages</h1>

          {statistics && (
            <div className="notification is-info">
              <p>Total Messages: {statistics.totalMessages}</p>
              {statistics.latestMessageTimestamp && <p>Latest Message Timestamp: {formatDate(statistics.latestMessageTimestamp)}</p>}
              <p>Average Words Per Message: {statistics.averageWordsPerMessage}</p>
              <p>Highest Messages in a Day: {statistics.maxMessagesInADay}</p>
            </div>
          )}

          {/* {!authenticated && (
            <div className="field">
              <label className="label">Enter Password:</label>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input type="password" className="input" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
                </div>
                <div className="control">
                  <button className={`button is-primary ${loading ? "is-loading" : ""}`} onClick={authenticate} disabled={loading}>
                    Authenticate
                  </button>
                </div>
              </div>
            </div>
          )} */}

          {/* {authenticated && (
            <> */}
              <button className={`button is-danger ${loading ? "is-loading" : ""}`} onClick={deleteAllMessages} disabled={loading}>
                Delete All Messages
              </button>
{/* 
              <button className={`button is-primary ${loading ? "is-loading" : ""}`} onClick={handleRefresh} disabled={loading}>
                Refresh Messages
              </button> */}

              <hr />

              {isLoading ? (
                <p>Loading...</p>
              ) : messages.length === 0 ? (
                <p>No messages available.</p>
              ) : (
                <div className="columns is-multiline">
                  {messages.map((message) => (
                    <div key={message.id} className="column is-one-third">
                      <div className="box">
                        <p className="is-size-3 has-text-centered">{message.content}</p>
                        <br></br>
                        <p className="has-text-grey-light has-text-centered">{formatDate(message.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            {/* </>
          )} */}
        </div>
      </section>
    </div>
  );
};

export default ViewMessages;
