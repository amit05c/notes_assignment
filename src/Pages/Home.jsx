import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../Style/home.module.css";
import { AiOutlinePlus } from "react-icons/ai";

function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the uploaded data from the server
    axios
      .get("http://localhost:3001/data") // Replace with your server URL
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function limitWords(str, limit) {
    // const words = content.split(' ');
    // if (words.length > limit) {
    //     return words.slice(0, limit).join(' ') + '...';
    // }
    // return content;

    if (str.length > limit) {
      return str.slice(0, limit) + "...";
    }
    return str;
  }

  function goToViewPage(value) {
    navigate(`/single-note/${value}`);
  }

  function goToAddPage() {
    navigate("/add");
  }

  return (
    <div className={styles.container}>
      <div>
        <h2>Notes</h2>
        <div>
          <button
            style={{
              backgroundColor: "#579BC3",
              color: "#FFFFFF",
              padding: "10px",
              borderRadius: "10px",
              border: "none",
            }}
            onClick={goToAddPage}
          >
            <AiOutlinePlus />
            NEW
          </button>
        </div>
      </div>

      <div>
        {data.map((item, index) => (
          <div
            className={styles.child}
            key={index}
            onClick={() => goToViewPage(index)}
          >
            {/* <Link to={`/single-note/${index}`}> */}
            <h2>{item.title}</h2>
            <div>
              <p
                style={{
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                  padding: "10px",
                }}
              >
                {limitWords(item.description, 200)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
