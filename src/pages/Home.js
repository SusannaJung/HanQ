import "../assets/css/home.css";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import Form from "react-bootstrap/Form";
import ScanOverlay from "../components/ScanOverlay";

const Home = () => {
  const [data, setData] = useState("No result");
  const [selected, setSelected] = useState("environment");

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
        scanDelay={10000}
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
            console.log(result);
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
