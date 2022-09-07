import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import "./table.css";

function Table() {
  const [teamsData, setTeamsData] = useState({});
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const fetchData = () => {
    fetch("http://127.0.0.1:5000/team")
      .then((response) => {
        return response.json();
      })
      .then((data) => setTeamsData(data));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateTeam = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        team_name: inputs.teamName,
      }),
    };
    fetch("http://127.0.0.1:5000/team", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("API request was not successful!");
        }
        return true;
      })
      .catch((error) => {
        alert("Failed to create team");
        console.log("There has been a problem", error);
      });
    setInputs("");
  };

  return (
    <div>
      <table>
        <tr>
          <th>Team Name</th>
          <th>Games Played</th>
          <th>Wins</th>
          <th>Draws</th>
          <th>Losses</th>
          <th>Goals For</th>
          <th>Goals Against</th>
          <th>Points</th>
        </tr>
        {Array.from(teamsData)
          .sort((a, b) => (a.points < b.points ? 1 : -1))
          .map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.team_name}</td>
                <td>{val.games_played}</td>
                <td>{val.wins}</td>
                <td>{val.draws}</td>
                <td>{val.losses}</td>
                <td>{val.goals_for}</td>
                <td>{val.goals_against}</td>
                <td>{val.points}</td>
              </tr>
            );
          })}
      </table>
      {/* <form id="tournament_form" onSubmit={handleCreateTeam}>
        <label>TEAM NAME:</label>
        <input
          className="input"
          id="inputField"
          type="text"
          name="teamName"
          value={inputs.teamName || ""}
          onChange={handleChange}
        />
        <input
          className="btn"
          id="inputButton"
          type="submit"
          value="CREATE TEAM"
        />
      </form> */}
    </div>
  );
}

export default Table;
