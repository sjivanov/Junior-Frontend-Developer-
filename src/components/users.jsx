import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevContacts) => prevContacts.filter((item) => item !== userId));
  };

  let counter = users.length;

  const renderPhrase = (number) => {
    let message = "";
    message =
      number > 4 || number === 1
        ? number + " Человек тусанёт с тобой сегодня"
        : number === 0
        ? "Никто с тобой не тусанёт"
        : number + " Человека тусанёт с тобой сегодня";
    return message;
  };

  const getCounterClasses = () => {
    let classes = "badge ";
    classes += counter === 0 ? "bg-danger" : "bg-primary";
    return classes;
  };

  const usersTableBody = () => {
    return users.map((user) => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>
          {user.qualities.map((qualitie) => (
            <span
              className={"badge m-1 bg-" + qualitie.color}
              key={qualitie._id}
            >
              {qualitie.name}
            </span>
          ))}
        </td>
        <td key={user.profession._id}>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}</td>
        <td>
          <button className="btn btn-danger" onClick={() => handleDelete(user)}>
            delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <h1>
        <span className={getCounterClasses()}>{renderPhrase(counter)}</span>
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{usersTableBody()}</tbody>
      </table>
    </>
  );
};

export default Users;
