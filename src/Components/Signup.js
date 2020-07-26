import React, { Component } from "react";
import logo from "../logo.svg";
import io from "socket.io-client";
import "../App.css";
// import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
const socket = io.connect("http://192.168.1.151:5000"); //change when change wifi
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gmail: "",
      password: "",
      name: "",
      data: [],
    };
  }
  onSubmit = (e) => {
    e.preventDefault();
    socket.emit("add data", {
      gmail: this.state.gmail,
      pass: this.state.password,
      name: this.state.name,
      avatar:
        "https://wsa.ca/wp-content/uploads/2018/10/facebook-profile-picture-unknown-facts-about-facebook-300x188.jpg",
      vip: "0",
      score: 0,
    });
  };

  onLogin = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    //this.props.data;
    this.setState({
      data: this.props.data,
    });
    console.log(this.props.data);
    // socket.emit("recive data", "hellu");

    // socket.on("recive data", (data) => {
    //   if (data) this.setState({ data: data });
    // });

    socket.on("add data ok ", (check) => {
      console.log(check);
    });
  }

  render() {
    return (
      <div className="App">
        <form className="App-header" onSubmit={this.onSubmit}>
          <img src={logo} className="App-logo" alt="logo" />
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
              type="text"
              className="form-control"
              name="name"
              value={this.state.name}
              placeholder="Type Your Name..."
              onChange={this.onLogin}
            />
            <input className="btn btn-light" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
