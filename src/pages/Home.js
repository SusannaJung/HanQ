import "../assets/css/home.css";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { QrReader } from "react-qr-reader";
import Form from "react-bootstrap/Form";
import ScanOverlay from "../components/ScanOverlay";

import useSound from 'use-sound'
import success from './success.mp3'
import failed from './failed.mp3'

const Home = () => {
  const [sending, setSending] = useState(false);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState("environment");
  const [response, setResponse] = useState(null);

  const [playSuccess] = useSound(success);
  const [playFailed] = useSound(failed);

  useEffect(() => {
    if(data !== null)
      sendCode(data);
  }, [data]);

  useEffect(() => {
    console.log("response = ", response);
    if(response !== null) {
      if(response == 'Checked...') {
        playSuccess();
      }
      else {
        playFailed();
      }
    }
  }, [response]);

  const sendCode = async (data) => {
    setResponse(null);
    const headers = { 'Content-Type' : 'application/json' };
    setSending(true);
    await axios.post("http://walab.handong.edu:8080/HanQ/log", {event_id: 1, code: data}, {headers})
      .then(res => setResponse(res.data));
    setSending(false);
  }

  return (
    <div className="home">
      <h2>CSEE 특강</h2>
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
          if(!!error) {
            console.log("info", error);
          }
        }}
        ViewFinder={ScanOverlay}
        videoContainerStyle={{ padding: "0%", position: "relative" }}
        videoStyle={{ position: "relative", width: "100%", height: "auto" }}
        containerStyle={{ position: "relative", width: "100%", height: "auto" }}
      />
      <p>{data}</p>
    </div>
  );
};

export default Home;
