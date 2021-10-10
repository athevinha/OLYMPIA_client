import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
import { Card, Button, ListGroup } from "react-bootstrap";
class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gmail: "",
      password: "",
      data: [],
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    let { data } = this.state;
    console.log(data);
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (
          this.state.gmail === data[i].gmail &&
          this.state.password === data[i].pass
        ) {
          localStorage.setItem("tooken", data[i].tooken);
          localStorage.setItem("tooken_id", i);
          // alert("hi:"+ data[i].name);
          window.location = "/content";
        }
      }
    }
    if (localStorage.tooken == null) {
      alert("login false");
    }
    this.setState({
      gmail: "",
      password: "",
    });
  };

  onLogin = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    console.log(this.props.data);
    this.setState({
      data: this.props.data,
    });
  }

  render() {
    return (
      <div className="App ">
        {/* <form className="App-header" onSubmit={this.onSubmit}>
          <p>Make by Nguyen The Vinh</p>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="gmail"
              value={this.state.gmail}
              placeholder="Type Your Gmail..."
              onChange={this.onLogin}
            />
            <input
              type="text"
              className="form-control"
              name="password"
              value={this.state.password}
              placeholder="Type Your Password..."
              onChange={this.onLogin}
            />
            <input
              name=""
              className="btn btn-light"
              type="submit"
              value="Submit"
            />
          </div>
        </form> */}
        <Card className="text-center" style={{ width: "90%" }}>
          <ListGroup.Item>Sign In</ListGroup.Item>
          <ListGroup.Item>
            <form onSubmit={this.onSubmit}>
              <input
                type="email"
                className="form-control"
                name="gmail"
                value={this.state.gmail}
                placeholder="Type Your Gmail..."
                onChange={this.onLogin}
              />
              <input
                type="text"
                className="form-control"
                name="password"
                value={this.state.password}
                placeholder="Type Your Password..."
                onChange={this.onLogin}
              />
              <input
                name=""
                className="btn btn-light"
                type="submit"
                value="Submit"
              />
            </form>
          </ListGroup.Item>
          <ListGroup.Item>
            <Card.Link href="#">THPT Chuyên Đại Học Vinh</Card.Link>
            <Card.Link href="#">KC Olympia Square</Card.Link>
          </ListGroup.Item>
        </Card>
      </div>
    );
  }
}

export default Signin;
