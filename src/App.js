import React, { Component } from "react";
import io from "socket.io-client";
import "./App.css";
import port from "./port.json";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Admin from "./Components/Admin";
import Content from "./Components/Content";
import AdminVCNV from "./Components/VCNV/AdminVCNV";
import ContentVCNV from "./Components/VCNV/ContentVCNV";
import UserVCNV from "./Components/VCNV/UserVCNV";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { json } from "body-parser";
const socket = io.connect(port.port); //change when change wifi
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gmail: "",
      password: "",
      data: [],
      questions: [],
      current: 0,
      questionsVCNV: [],
    };
  }

  componentDidMount() {
    socket.emit("recive data", "hellu");
    socket.on("recive data", (data) => {
      if (data) this.setState({ data: data });

      localStorage.setItem("users", JSON.stringify(data));
    });
    //============GetUser========================================================================================

    //====================================================================================================

    socket.emit("get ques", "hellu");
    socket.on("get ques", (data) => {
      this.setState({
        questions: data[0],
        questionsVCNV: data[1],
      });
    });
    //=============GetQuestion=======================================================================================
    // socket.emit("get ques vcnv", "hellu");
    // socket.on("get ques vcnv", (data) => {
    //   this.setState({ questions: data });
    // });
    //=============GetQuestionVCNV===========================================================================
    //====================================================================================================
    socket.emit("recive current", "hellu");
    socket.on("recive current", (crr) => {
      if (crr) this.setState({ current: crr });
    });
  }
  // componentWillUnmount(){

  // }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <ul>
              <li>
                <Link to="/">Sign In</Link>
              </li>
              <li>
                <Link to="/Signup">SignUp</Link>
              </li>
              <li>
                <Link to="/Content">Content</Link>
              </li>
            </ul>
          </div>
          <Route
            exact
            path="/"
            component={() => (
              <Signin
                data={this.state.data}
                current={this.state.current}
              ></Signin>
            )}
          />
          <Route
            path="/Signup"
            component={() => (
              <Signup
                data={this.state.data}
                current={this.state.current}
              ></Signup>
            )}
          />
          <Route
            path="/Admin"
            component={() => (
              <Admin
                data={this.state.data}
                questions={this.state.questions}
                current={this.state.current}
              ></Admin>
            )}
          />
          <Route
            path="/Content"
            component={() => (
              <Content
                data={this.state.data}
                current={this.state.current}
              ></Content>
            )}
          />
          <Route
            path="/AdminVCNV"
            component={() => (
              <AdminVCNV
                data={this.state.data}
                current={this.state.current}
                questions={this.state.questionsVCNV}
              ></AdminVCNV>
            )}
          />
          <Route
            path="/ContentVCNV"
            component={() => (
              <ContentVCNV
                data={this.state.data}
                current={this.state.current}
                questions={this.state.questionsVCNV}
              ></ContentVCNV>
            )}
          />
          <Route
            path="/UserVCNV"
            component={() => (
              <UserVCNV
                data={this.state.data}
                current={this.state.current}
                questions={this.state.questionsVCNV}
              ></UserVCNV>
            )}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
