import React, { Component } from "react";
import { Howl } from "howler";
import io from "socket.io-client";
import "../../App.css";
import "./VCNV.css";
import port from "../../port.json";
import OnVCNV from "./Music/ObstacleRowRightAnswer.mp3";
import OnVCNV2 from "./Music/ObstacleRightAnswer2.mp3";
import second from "./Music/15sAdven.wav";
import ObsGranted from "./Music/ObsGranted.wav";
import RowShow from "./Music/ObstacleRowShow.mp3";
import OpenCircle from "./Music/OpenCircle.mp3";
import ImgShow from "./Music/ObstacleShowImage.mp3";
import QuesShow from "./Music/ObstacleShowQues.mp3";
import Img from "./Img/VCNVIMG.png";
import Show from "./Img/show.png";
import WrongMusic from "./Music/ExitAdvenSec.mp3";
import ReactAudioPlayer from "react-audio-player";
import $ from "jquery";
//==============import img==================
import {
  Card,
  Button,
  ListGroup,
  Table,
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import Pie1 from "./Img/Pie1.png";
import Pie2 from "./Img/Pie2.png";
import Pie3 from "./Img/Pie3.png";
import Pie4 from "./Img/Pie4.png";
import PieCen from "./Img/PieCen.png";
const socket = io.connect(port.port); //change when change wifi
let check = true;
let oneMusic = 0,
  OnlyOne = 0,
  OnePush = 0;
class ContentVCNV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gmail: "",
      password: "",
      data: [],
      questions: [],
      question: "",
      Ending: [],
      currentQues: 0,
      currentUser: 0,
      ListShowContentVCNV: [],
      toogle: 0,
      WhoIsFaster: [],
    };
  }
  soundPlay = (src) => {
    const sound = new Howl({ src });
    sound.volume(0.4);
    sound.play();
  };
  soundStop = (src) => {
    const sound = new Howl({ src });
    sound.stop();
  };
  //==============================================
  //==============================================

  componentDidMount() {
    $(".TongKetBar").hide();
    $(".ShowAns").hide();
    this.setState({
      data: this.props.data,
      questions: this.props.questions,
    });

    socket.on("show list VCNV", (show) => {
      if (this.state.toogle == 0) {
        $(".ShowAns").show(1000);
        document.getElementById("RowShow").play();
        this.setState({ toogle: 1 });
      } else {
        $(".ShowAns").hide(1000);
        this.setState({ toogle: 0 });
      }
      this.setState({ ListShowContentVCNV: show.list });
    });
    socket.on("disable", (dis) => {
      document.getElementById("WrongMusic").play();
      $(".names").eq(dis.id).css("background-color", "red");
      $(".names").eq(dis.id).css("color", "black");
    });
    socket.on("play sound VCNV", (hello) => {
      if (oneMusic == 0) {
        document.getElementById("OnVCNV2").play();
        oneMusic = 1;
        console.log("hello");
      }
    });
    socket.on("show answervcnv", (show) => {
      document.getElementById("OpenCircle").play();
      console.log(
        this.state.questions[this.state.currentQues]
          ? this.state.questions[this.state.currentQues].answer
          : ""
      );
      if (this.state.currentQues !== 0)
        $(".around")
          .eq(show.stt - 1 ? show.stt - 1 : 0)
          .html(
            this.state.questions[this.state.currentQues]
              ? this.state.questions[this.state.currentQues].answer
              : ""
          )
          .css({ "font-size": "30px" })
          .css({ color: "black" });
    });
    socket.on("choose ques", (ques) => {
      $(".names").removeClass("ActiveName");
      let thisd = this;

      this.setState({
        question: ques.ques,
        currentQues: ques.id,
      });
      document.getElementById("QuesShow").play();
      $(".around").removeClass("CircleActive");
      $(".around")
        .eq(ques.id - 1)
        .addClass("CircleActive");
      setTimeout(function () {
        if (check) {
          $("#progressBar").css("background-color", "#cfd6d9");
          $(".bar").css("background-color", "#428bca");
          thisd.soundPlay(second);
          progress(15, 15, $("#progressBar"));
          check = false;
        }
      }, 7000);
    });
    socket.on("Add score", (crr) => {
      if (crr !== []) {
        this.setState({ data: crr.data });
      }
    });
    socket.on("on VCNV", (data) => {
      console.log(data);
      let WhoIsFasters = this.state.WhoIsFaster;
      if (OnePush % 1 == 0) {
        WhoIsFasters.push({ name: data.name });

        this.setState({ WhoIsFaster: WhoIsFasters });
        console.log(this.state.WhoIsFaster);
      }

      OnePush++;
      if (data) {
        document.getElementById("ObsGranted").play();
        $(".names").removeClass("ActiveName");
        $(".names").eq(data.id).addClass("ActiveName");
        $(".names").addClass("label danger");
      }
    });
    socket.on("Open Picture", (data) => {
      document.getElementById("ImgShow").play();
      if (data) {
        $(data).hide(1000);
      }
    });
    socket.on("TongKetDiem", (data) => {
      if (OnlyOne == 0) {
        document.getElementById("OnVCNV").play();

        OnlyOne = 1;
      }
      if (data) {
        $(".TongKetBar").show(500);
        let { Ending } = this.state;
        let sorts = [];
        Ending = data;
        for (let i = 0; i < Ending.length; i++) {
          sorts.push(Ending[i].score);
          sorts.sort();
        }
        for (let i = 0; i < Ending.length; i++) {
          for (let k = 0; k < Ending.length; k++) {
            if (Ending[k].score == sorts[i]) {
              let fake = Ending[k];
              Ending[k] = Ending[i];
              Ending[i] = fake;
            }
          }
        }

        this.setState({ Ending: Ending });
        setTimeout(function () {
          $(".EndingUser").eq(0).addClass("AnimationEndingUser");
        }, 1000);
        setTimeout(function () {
          $(".EndingUser").eq(1).addClass("AnimationEndingUser");
        }, 2500);
        setTimeout(function () {
          $(".EndingUser").eq(2).addClass("AnimationEndingUser");
        }, 5000);
        setTimeout(function () {
          $(".EndingUser").eq(3).addClass("AnimationEndingUser");
        }, 7500);
      }
    });
  }
 
  render() {
    // $(".names").eq(this.state.current).addClass("CrName");
    return (
      <div className="App">
           <div className="full-control">
          <ReactAudioPlayer id="OnVCNV" src={OnVCNV} />
          <ReactAudioPlayer id="OnVCNV2" src={OnVCNV2} />
          <ReactAudioPlayer id="second" src={second} />
          <ReactAudioPlayer id="ObsGranted" src={ObsGranted} />
          <ReactAudioPlayer id="RowShow" src={RowShow} />
          <ReactAudioPlayer id="OpenCircle" src={OpenCircle} />
          <ReactAudioPlayer id="ImgShow" src={ImgShow} />
          <ReactAudioPlayer id="QuesShow" src={QuesShow} />
          <ReactAudioPlayer id="WrongMusic" src={WrongMusic} />
        </div>
        {/* <ul className="circle">
            <div className="around">
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
            </div>
            <div className="around">
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
            </div>
            <div className="around ">
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
            </div>

            <div className="around">
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
            </div>
          </ul>
          <div>
            <img className="VCNVimgContent" src={Img} alt=""></img>
            <img className="pie1 pie" src={Pie1} alt=""></img>
            <img className="pie2 pie" src={Pie2} alt=""></img>
            <img className="pie3 pie" src={Pie3} alt=""></img>
            <img className="pie4 pie" src={Pie4} alt=""></img>
            <img className="pieCen pie" src={PieCen} alt=""></img>
          </div>
          <table id="NameList">
            <tbody>
              <tr>
                {this.state.data.map((user, id) => {
                  return (
                    <td className="names" key={id}>
                      {user.name} ({user.score})
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
          <table id="NameList" className="ListFasterVCNV">
            <tbody>
              <tr>
                {this.state.WhoIsFaster.map((user, id) => {
                  return (
                    <td className="names FasterVCNV" key={id}>
                      {user.name + "[" + id + "]"}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
          <div className="questionsVCNV col-11">
            <div>
              <p className="questionVCNV quessVCNV">
                {this.state.question ? this.state.question.ques : ""}{" "}
              </p>
            </div>
          </div>
          <div id="progressBar">
            <div className="bar"></div>
          </div>
          <div className="TongKetBar">
            <div className="BlackTongKetBar">
              <ul>
                {this.state.Ending.map((user, id) => {
                  return (
                    <li className="EndingUser" key={id}>
                      {user.name} : {user.score}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <ul className="ShowAns">
            {this.state.ListShowContentVCNV.map((user, id) => {
              return (
                <li className={"ShowVCNV diffTT" + id} key={id}>
                  <span className={"nameTT eTT" + id + "1"}>{user.name}</span>
                  <br />
                  <span className={"AnsTT eTT" + id + "2"}>{user.answer}</span>
                </li>
              );
            })}
          </ul> */}
          
        <Card
          className="text-center"
          style={{ width: "90%", borderRadius: "20px" }}
        >
          <ListGroup.Item>
            <h5>Vòng vượt chướng ngại vật</h5>
            Có 4 từ hàng ngang – cũng chính là 4 gợi ý liên quan đến chướng ngại
            vật mà các thí sinh phải đi tìm. Có 1 gợi ý thứ 5 – là 1 hình ảnh
            liên quan đến chướng ngại vật hoặc chính là chướng ngại vật. Hình
            ảnh được chia thành 5 ô đánh số thứ tự từ 1 đến 4 và một ô trung
            tâm.
            <Table style={{ marginTop: "10px" }} striped bordered hover>
              <tbody>
                <tr>
                  {this.state.data.map((user, id) => {
                    if (id <= 3)
                      return (
                        <td key={id} className="names">
                          {user.name} ({user.score})
                        </td>
                      );
                  })}
                </tr>
              </tbody>
            </Table>
            Chướng ngoại vật gồm:{" "}
            <b>
              {this.state.questions[0]
                ? this.state.questions[0].answer.length
                : "..."}{" "}
              ký tự{" "}
            </b>
          </ListGroup.Item>
          <ListGroup.Item>
            <Container>
              <Row>
                <Col xs={8}>
                  {/* <ul className="circle">
                    <div className="around">
                      <li className="black-circle">◉</li>
                      <li className="black-circle">◉</li>
                      <li className="black-circle">◉</li>
                    </div>
                    <div className="around">
                      <li className="black-circle">◉</li>
                      <li className="black-circle">◉</li>
                    </div>
                    <div className="around ">
                      <li className="black-circle">◉</li>
                      <li className="black-circle">◉</li>
                      <li className="black-circle">◉</li>
                      <li className="black-circle">◉</li>
                      <li className="black-circle">◉</li>
                    </div>
                    <div className="around">
                      <li className="black-circle">◉</li>
                      <li className="black-circle">◉</li>
                      <li className="black-circle">◉</li>
                    </div>
                  </ul> */}
                  <ul className="circle" style={{ marginTop: "5%" }}>
                    {this.state.questions.map((ques, id) => {
                      if (id !== 5 && id !== 0)
                        return (
                          <div className="around">
                            {ques.answer.split("").map((string, ids) => {
                              return <li className="black-circle">◉</li>;
                            })}
                          </div>
                        );
                    })}
                  </ul>
                </Col>
                <Col xs={4} style={{ padding: 0 }}>
                  <img className="VCNVimgContent" src={Img}></img>
                  <p className="pie1 pie" src={Pie1} alt="">
                    1
                  </p>
                  <p className="pie2 pie" src={Pie2} alt="">
                    2
                  </p>
                  <p className="pie3 pie" src={Pie3} alt="">
                    3
                  </p>
                  <p className="pie4 pie" src={Pie4} alt="">
                    4
                  </p>
                  <p className="pieCen pie" src={PieCen} alt="">
                    5
                  </p>
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
          <ListGroup.Item>
            <Container>
              <Row>
                <Col xs={8}>
                  <h3>
                    {this.state.question ? this.state.question.ques : ""}{" "}
                  </h3>
                </Col>
                <Col xs={4}>
                  <table id="NameList" className="ListFasterVCNV">
                    <tbody>
                      <tr>
                        {this.state.WhoIsFaster.map((user, id) => {
                          return (
                            <td className="names FasterVCNV" key={id}>
                              <div>
                                <span
                                  style={{ position: "relative", top: "-5px" }}
                                >
                                  {user.name + "[" + id + "]"}{" "}
                                </span>
                                <Spinner animation="grow" variant="danger" />
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
          <ListGroup.Item>
            <div style={{ borderRadius: "50px" }} id="progressBar">
              <div className="bar" style={{ borderRadius: "50px" }}></div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <Card.Link href="#">THPT Chuyên Đại Học Vinh</Card.Link>
            <Card.Link href="#">KC Olympia Squad</Card.Link>
          </ListGroup.Item>
        </Card>
        <div className="TongKetBar">
          <ul>
            {this.state.Ending.map((user, id) => {
              return (
                <li className="EndingUser" key={id}>
                  {user.name} : {user.score}
                </li>
              );
            })}
          </ul>
        </div>
        <ul className="ShowAns">
          {this.state.ListShowContentVCNV.map((user, id) => {
            return (
              <li className={"ShowVCNV diffTT" + id} key={id}>
                <span className={"nameTT eTT" + id + "1"}>{user.name}</span>
                <br />
                <span className={"AnsTT eTT" + id + "2"}>{user.answer}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ContentVCNV;
function progress(timeleft, timetotal, $element) {
  var progressBarWidth = (timeleft * $element.width()) / timetotal;
  $element
    .find("div")
    .animate({ width: progressBarWidth }, 500)
    .html(Math.floor(timeleft / 60) + ":" + (timeleft % 60));
  if (timeleft > 0) {
    setTimeout(function () {
      progress(timeleft - 1, timetotal, $element);
    }, 1000);
  } else {
    $("#progressBar").css("background-color", "red");
    $(".bar").css("background-color", "red");
    $(".bar").html("");
    check = true;
  }
}
