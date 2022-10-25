import "../assets/css/home.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import Form from "react-bootstrap/Form";
import ScanOverlay from "../components/ScanOverlay";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useSound from "use-sound";
import success from "../assets/sounds/success.mp3";
import failed from "../assets/sounds/failed.mp3";

const Home = () => {
  const [sending, setSending] = useState(false);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState("environment");
  const [response, setResponse] = useState(null);

  const [playSuccess] = useSound(success);
  const [playFailed] = useSound(failed);

  const notifySuccess = () =>
    toast.success("출석이 완료되었습니다!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyFailure = () =>
    toast.error("이미 출석되었습니다!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  useEffect(() => {
    if (data !== null) sendCode(data);
  }, [data]);

  useEffect(() => {
    console.log("response = ", response);
    if (response !== null) {
      if (response === "Checked...") {
        playSuccess();
        notifySuccess();
      } else {
        playFailed();
        notifyFailure();
      }
    }
  }, [response]);

  const sendCode = async (data) => {
    setResponse(null);
    const headers = { "Content-Type": "application/json" };
    setSending(true);
    await axios.post("http://walab.handong.edu:8080/HanQ/log", { event_id: 1, code: data }, { headers }).then((res) => setResponse(res.data));
    setSending(false);
  };

  return (
    <div className="home">
      <h2>CSEE 특강</h2>
      <ToastContainer />
      <Form.Select className="camera" aria-label="카메라 세팅" onChange={(e) => setSelected(e.target.value)}>
        <option value={"environment"}>후면 카메라</option>
        <option value={"user"}>전면 카메라</option>
      </Form.Select>
      <QrReader
        className="QrReader"
        constraints={{ facingMode: selected }}
        scanDelay={500}
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }
          if (!!error) {
            console.log("info", error);
          }
        }}
        ViewFinder={ScanOverlay}
        videoContainerStyle={{ padding: "0%", position: "relative", width: "100%", height: "100%" }}
        videoStyle={{ position: "relative", width: "100%", height: "100%" }}
        containerStyle={{ position: "relative", width: "70vw", height: "70vw" }}
      />
      <p>{data}</p>
    </div>
  );
};

export default Home;
