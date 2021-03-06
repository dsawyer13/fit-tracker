import React from "react";

export default function Exercise(props) {
  return (
    <>
      <td className="name">{props.name}</td>
      <td className="weight">{props.weight}</td>
      <td className="sets">{props.sets}</td>
      <td className="reps">{props.reps}</td>
    </>
  );
}

Exercise.defaultProps = {
  name: "",
  weight: "",
  sets: "",
  reps: ""
};
