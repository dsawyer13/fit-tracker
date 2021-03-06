import React from "react";
import Workout from "./Workout";
import Exercise from "./Exercise";
import AddWorkoutForm from "./AddWorkoutForm";
import TableForm from "./TableForm";
import { connect } from "react-redux";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";

import "./css/home-page.css";
import "./css/buttons.css";
import "./css/table-and-form.css";

import {
  addWorkout,
  deleteExercise,
  editExercise,
  fetchWorkouts
} from "../actions";

export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      exerciseIndex: "",
      workouts: []
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchWorkouts());
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.workouts !== this.props.workouts) {
      this.setState({
        workouts: this.props.workouts
      });
    }
  }

  setEditing = index => {
    this.setState({
      exerciseIndex: index,
      editing: !this.state.editing
    });
  };

  addWorkout = exercises => {
    this.props.dispatch(addWorkout(exercises));
  };

  editExercise = (editedExercise, wID, eID) => {
    const withID = editedExercise;
    let id = "id";
    withID[id] = eID;
    this.props.dispatch(editExercise(withID, wID, eID));
    this.setState({
      editing: !this.state.editing,
      exerciseIndex: ""
    });
  };
  deleteExercise = id => {
    this.props.dispatch(deleteExercise(id));
  };

  render() {
    const workouts = this.props.workouts.map((workout, index) => {
      return (
        <AccordionItem key={index}>
          <AccordionItemHeading>
            <AccordionItemButton>
              <Workout {...workout} />
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Exercise</th>
                  <th>Weight</th>
                  <th>Sets</th>
                  <th>Reps</th>
                  <th className="hide">Action</th>
                </tr>
              </thead>
              <tbody>
                {workout.exercises &&
                  workout.exercises.map((exercise, index2) => {
                    return (
                      <>
                        {this.state.editing &&
                        this.state.exerciseIndex === index2 ? (
                          <tr key={index2}>
                            <td>{index + 1}</td>
                            <TableForm
                              index={index2}
                              name={
                                this.state.workouts[index].exercises[index2]
                                  .name
                              }
                              weight={
                                this.state.workouts[index].exercises[index2]
                                  .weight
                              }
                              sets={
                                this.state.workouts[index].exercises[index2]
                                  .sets
                              }
                              reps={
                                this.state.workouts[index].exercises[index2]
                                  .reps
                              }
                              onAdd={editedExercise => {
                                this.editExercise(
                                  editedExercise,
                                  workout.id,
                                  exercise._id
                                );
                              }}
                              onClick={() => this.setEditing(index)}
                            />
                          </tr>
                        ) : (
                          <tr key={index2}>
                            <td>{index2 + 1}</td>
                            <Exercise key={index2} {...exercise} />
                            <td className="button-td">
                              <span className="edit-button">
                                <button
                                  className="button warning"
                                  onClick={() => this.setEditing(index2)}
                                >
                                  Edit
                                </button>
                              </span>
                              <span className="delete-button">
                                <button
                                  className="button danger"
                                  onClick={id =>
                                    this.deleteExercise(exercise._id)
                                  }
                                >
                                  Delete
                                </button>
                              </span>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
              </tbody>
            </table>
          </AccordionItemPanel>
        </AccordionItem>
      );
    });

    return (
      <>
        <div className="homeBackground">
          <div className="homePage">
            <h1 className="previous">Previous Workouts</h1>
            <Accordion allowZeroExpanded={true}>{workouts}</Accordion>
            <AddWorkoutForm onAdd={exercises => this.addWorkout(exercises)} />
          </div>
        </div>
      </>
    );
  }
}

HomePage.defaultProps = {
  workouts: []
};

const mapStateToProps = state => ({
  workouts: state.workouts
});

export default connect(mapStateToProps)(HomePage);
