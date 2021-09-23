import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
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
          window.location= "/content"
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
              name=""
              className="btn btn-light"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Signin;
