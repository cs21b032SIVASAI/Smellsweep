import Excel from "../ExcelSheet/Excel";
import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import "./Mainpage.css";
import jsPDF from "jspdf";
import { Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import Codebox from "../Codebox";
import Table from "./Table";

const language = "python";

export default function MainPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [heatmapData, setHeatmapData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bargraph_sp_miss, setBargraph_sp_miss] = useState(null);
  const [bargraph_nan, setBargraph_nan] = useState(null);
  const [bargraph_binning_cat, setBargraph_binning_cat] = useState(null);
  const [bargraph_class_imbal, setBargraph_class_imbal] = useState(null);
  const bargraph_sp_char = null;
  const bargraph_hum_friendly = null;
  const bargraph_tr_spaces = null;
  const [boxplot, setBoxplot] = useState(null);
  const [click, setClick] = useState(false);
  const [fileChosen, setFileChosen] = useState(false);

  const handleFileUpload = (event) => {
    setFileChosen(true);
    setSelectedFile(event.target.files[0]);
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: function (result) {
        setJsonData(result.data);
        console.log(result.data);
      },
    });
  };

  const handleUpload = () => {
    setClick(true);
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    setIsLoading(false);
    // axios
    //   .post("http://localhost:5000/upload", formData)
    //   .then((response) => {
    //     setAnalysisData(response.data);
    //     setHeatmapData(response.data.heatmap);
    //     setBargraph_sp_miss(response.data.bargraph_sp_miss);
    //     setBargraph_nan(response.data.bargraph_nan);
    //     setBoxplot(response.data.outliers.plot);
    //     setBargraph_binning_cat(response.data.binning_cat.plot);
    //     setBargraph_class_imbal(response.data.imbalance.plot);
    //     console.log(response.data);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setIsLoading(false);
    //   });
  };

  const handleDownload = () => {
    html2canvas(document.body).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("page-content.pdf");
    });
  };

  return (
    <div className="App">
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className="heading-text">
        <h1>SniffCSV DataSmell Detector</h1>
      </div>
      <div className="Intput-and-Btn">
        <br />
        <input
          type="file"
          name="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="input-file"
        />
        <Button
          className="analyze-btn d-flex align-self-center"
          variant="success"
          size="lg"
          onClick={handleUpload}
        >
          Analysis
        </Button>
      </div>
      {fileChosen && jsonData && <Excel myjson={jsonData} />}
      {analysisData && (
        <div className="analysis-container">
          {/* Rest of your code */}
        </div>
      )}
    </div>
  );
}

function splitIntoSentences(text) {
  const sentences = text.split("\n");
  return sentences.filter((sentence) => sentence.length > 0);
}