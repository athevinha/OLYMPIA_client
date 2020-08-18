import React, { Component } from "react";
import io from "socket.io-client";
import "./App.css";
import port from "./port.json";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
//============================================
import Admin from "./Components/KD/Admin";
import Content from "./Components/KD/Content";
//=================================================
import AdminVD from "./Components/VD/AdminVD";
import ContentVD from "./Components/VD/ContentVD";
import UserVD from "./Components/VD/UserVD";
//======================================================
import AdminCHP from "./Components/CHP/AdminCHP";
import ContentCHP from "./Components/CHP/ContentCHP";
import UserCHP from "./Components/CHP/UserCHP";
//========================================================
import AdminVCNV from "./Components/VCNV/AdminVCNV";
import ContentVCNV from "./Components/VCNV/ContentVCNV";
import UserVCNV from "./Components/VCNV/UserVCNV";
//=========================================================
import AdminTT from "./Components/TT/AdminTT";
import ContentTT from "./Components/TT/ContentTT";
import UserTT from "./Components/TT/UserTT";
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
      current: 0,
      questions: [],
      questionsVCNV: [],
      questionsTT: [],
      questionsVD: [],
      questionsCHP: [],
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
        questionsTT: data[2],
        questionsVD: data[3],
        questionsCHP: data[4],
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
          {/**========================================================================== */}
          <Route
            path="/AdminVD"
            component={() => (
              <AdminVD
                data={this.state.data}
                questions={this.state.questionsVD}
                current={this.state.current}
              ></AdminVD>
            )}
          />
          <Route
            path="/ContentVD"
            component={() => (
              <ContentVD
                data={this.state.data}
                current={this.state.current}
              ></ContentVD>
            )}
          />
          <Route
            path="/UserVD"
            component={() => (
              <UserVD
                data={this.state.data}
                current={this.state.current}
              ></UserVD>
            )}
          />
          {/**========================================================================== */}
          {/**========================================================================== */}
          <Route
            path="/AdminCHP"
            component={() => (
              <AdminCHP
                data={this.state.data}
                questions={this.state.questionsCHP}
                current={this.state.current}
              ></AdminCHP>
            )}
          />
          <Route
            path="/ContentCHP"
            component={() => (
              <ContentCHP
                data={this.state.data}
                current={this.state.current}
              ></ContentCHP>
            )}
          />
          <Route
            path="/UserCHP"
            component={() => (
              <UserCHP
                data={this.state.data}
                current={this.state.current}
              ></UserCHP>
            )}
          />
          {/**========================================================================== */}
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
          <Route
            path="/UserTT"
            component={() => (
              <UserTT
                data={this.state.data}
                current={this.state.current}
                questions={this.state.questionsTT}
              ></UserTT>
            )}
          />
          <Route
            path="/ContentTT"
            component={() => (
              <ContentTT
                data={this.state.data}
                current={this.state.current}
                questions={this.state.questionsTT}
              ></ContentTT>
            )}
          />
          <Route
            path="/AdminTT"
            component={() => (
              <AdminTT
                data={this.state.data}
                current={this.state.current}
                questions={this.state.questionsTT}
              ></AdminTT>
            )}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
