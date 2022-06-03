import axios from "axios";
import React, { useState } from "react";

function InputText() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const onSubmitHadlers = (e) => {
    e.preventDefault();
    if (userName === "") {
      try {
      } catch (error) {
        setError(error);
      }
    } else {
      setLoading(true);
      axios
        .get(`https://api.github.com/users/${userName}/repos`)
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => setLoading(false));
    }
  };

  if (error) {
    console.log(error);
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  const open_new = () => {
    window.open("_blank");
  };

  return (
    <>
      <form onSubmit={onSubmitHadlers}>
        <input
          type="text"
          placeholder="userName"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <button type="submit">Send</button>
      </form>
      {data &&
        data.map((item) => (
          <div key={item.id}>
            <div>{item.name}</div>
            <div>{item.description}</div>
            <div>{item.isPrivate}</div>
            <a onClick={open_new} href={item.html_url}>
              {item.html_url}
            </a>
          </div>
        ))}
    </>
  );
}

export default InputText;
