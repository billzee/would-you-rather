import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

class PollList extends PureComponent {
  static propTypes = {
    polls: PropTypes.array.isRequired,
  };

  render() {
    const { users, polls } = this.props;
    if (polls.length === 0)
      return (
        <div className="text-center mt-2">
          No polls available in this category.
        </div>
      );

    return polls.map(question => {
      return (
        <Card key={question.id} className="mb-3">
          <Card.Header>{users[question.author].name} asked</Card.Header>
          <Card.Body>
            <Card.Text className="mb-0 font-weight-bold">
              Would you rather...
            </Card.Text>
            <Card.Title>{question.optionOne.text} or ...</Card.Title>
            <Link to={`questions/${question.id}`}>View Complete Poll</Link>
          </Card.Body>
        </Card>
      );
    });
  }
}

const mapStateToProps = ({ users }, { questions }) => ({
  users,
  questions,
});

export default connect(mapStateToProps)(PollList);
