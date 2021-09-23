import React, { Component } from "react";
import logo from "../logo.svg";
import io from "socket.io-client";
import port from "../port.json";
import usersService from "../service/users.service";
import "../App.css";
const socket = io.connect(port.port);
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
  GenerateTooken = () => {
    let length = 40;
    var randomChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  };
  onSubmit = (e) => {
    e.preventDefault();
    let userN= {
      gmail: this.state.gmail,
      pass: this.state.password,
      name: this.state.name,
      avatar:
        "https://wsa.ca/wp-content/uploads/2018/10/facebook-profile-picture-unknown-facts-about-facebook-300x188.jpg",
      score: 0,
      tooken: this.GenerateTooken()
    };
    usersService.create(userN).then((req,res)=>{
      alert(req);
      window.location="/content"
      localStorage.setItem("tooken", req.data.tooken )
    })
    // socket.emit("add data", );
  };

  onLogin = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    this.setState({
      data: this.props.data,
    });
    console.log(this.props.data);

    socket.on("add data ok ", (check) => {
      console.log(check);
    });
  }

  render() {
    return (
      <div className="App">
        <form className="App-header" onSubmit={this.onSubmit}>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
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
