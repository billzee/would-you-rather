import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Alert,
  Form
} from "react-bootstrap";
import Radio from "../components/Radio";

import { handleSaveQuestionAnswer } from "../actions/questions";
import Votes from "./Votes";
import { Link, Redirect } from "react-router-dom";

class NewQuestion extends Component {
  state = {
    answer: ""
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return { answer: prevState.answer || nextProps.answer };
  }

  selectAnswer = answer => this.setState({ answer });

  vote = e => {
    e.preventDefault();
    const { question, handleSaveQuestionAnswer } = this.props;
    const { answer } = this.state;

    handleSaveQuestionAnswer(question, answer);
  };

  render() {
    const { users, question, messages } = this.props;
    const submitDisabled =
      !this.state.answer || this.state.answer === this.props.answer;

    if (!question) return <Redirect to="/404" />;

    return (
      <>
        {messages.saveQuestionAnswerSuccess && (
          <Alert variant="success">
            {messages.saveQuestionAnswerSuccess}
            <Link to="/"> Back to home</Link>
          </Alert>
        )}

        {messages.saveQuestionAnswerError && (
          <Alert variant="danger">{messages.saveQuestionAnswerError}</Alert>
        )}

        <Card className="mb-3">
          <Form onSubmit={this.vote}>
            <Card.Header>{users[question.author].name} asked</Card.Header>
            <div className="row no-gutters">
              <div style={{ width: "300px", height: "300px" }}>
                <img
                  alt={users[question.author].name}
                  src={users[question.author].avatarURL}
                />
              </div>
              <div className="col">
                <Card.Body>Would You Rather...</Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    <Radio
                      checked={this.state.answer}
                      value="optionOne"
                      onChange={this.selectAnswer}
                      label={<strong>{question.optionOne.text}</strong>}
                    />
                  </ListGroupItem>
                  <ListGroupItem>
                    <Radio
                      checked={this.state.answer}
                      value="optionTwo"
                      onChange={this.selectAnswer}
                      label={<strong>{question.optionTwo.text}</strong>}
                    />
                  </ListGroupItem>
                </ListGroup>
              </div>
            </div>
            <Card.Body>
              <Button
                disabled={submitDisabled}
                variant="success"
                type="submit"
                block
              >
                {(this.props.answer && "Change vote") || "Vote!"}
              </Button>
            </Card.Body>
          </Form>
        </Card>

        <Votes className="mb-3" question={question} />
      </>
    );
  }
}

const mapStateToProps = (
  { questions, users, authedUser, messages },
  { match }
) => {
  let answer = "";
  const { question_id } = match.params;
  const question = questions[question_id];
  answer = users[authedUser].answers[question_id];

  return {
    question,
    answer,
    users,
    messages
  };
};

export default connect(
  mapStateToProps,
  { handleSaveQuestionAnswer }
)(NewQuestion);
