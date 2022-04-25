import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core//Paper";
import axios from "axios";
import jsPDF from "jspdf";
import "./Report.css";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";
import moment from "moment";

export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ReportData: [],
    };
  }
  printDocument() {
    const input = document.getElementById("pdfdiv");
    html2canvas(input).then((canvas) => {
      var img = new Image();
      const doc = new jsPDF("p", "mm", "a4");
      doc.setTextColor(255, 0, 0);
      doc.setFontSize(28);
      doc.setTextColor(0, 0, 255);
      doc.setFontSize(16);
      doc.text(10, 70, "Event Booking");
      doc.setTextColor(0, 255, 0);
      doc.setFontSize(12);
      doc.text(145, 85, "Signature :");
      //Date
      var m_names = new Array(
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      );

      var today = new Date();
      var seconds = today.getSeconds();
      var minutes = today.getMinutes();
      var hours = today.getHours();
      var curr_date = today.getDate();
      var curr_month = today.getMonth();
      var curr_year = today.getFullYear();

      today =
        m_names[curr_month] +
        " " +
        curr_date +
        "/ " +
        curr_year +
        " | " +
        hours +
        "h : " +
        minutes +
        "min : " +
        seconds +
        "sec";
      var newdat = today;
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      doc.text(130, 93, newdat);
      var imgHeight = (canvas.height * 200) / canvas.width;
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "JPEG", 5, 100, 200, imgHeight);
      const date = Date().split(" ");
      // we use a date string to generate our filename.
      const dateStr =
        "AdvertisementManagement_" +
        date[0] +
        date[1] +
        date[2] +
        date[3] +
        date[4];
      doc.save(`report_${dateStr}.pdf`);
    });
  }

  componentDidMount() {
    axios.get("http://localhost:8070/events/").then((response) => {
      console.log(response?.data);
      this.setState({
        ReportData: response?.data,
      });
    });
  }
  render() {
    console.log(this.state?.CustomerData);
    return (
      <div>
        <TableContainer id="pdfdiv" className="txt" component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Event Type</TableCell>
                <TableCell align="right">Hall</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Revenue</TableCell>
                <TableCell align="right">Food</TableCell>
                <TableCell align="right">Lunch Type</TableCell>
                <TableCell align="right">Dinner Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state?.ReportData?.map((p, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="right">{p.eType}</TableCell>
                    <TableCell align="right">{p.eHall}</TableCell>
                    <TableCell align="right">{moment(p.eDate).format("DD MMM YYYY")}</TableCell>
                    <TableCell align="right">Rs.{p.eRevenue}</TableCell>
                    <TableCell align="right">{p.eFood}</TableCell>
                    <TableCell align="right">{p.eLtype}</TableCell>
                    <TableCell align="right">{p.eDtype}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>{" "}
        <br />
        <br />
        <center>
          <div>
            <button
              className="info__button"
              onClick={this.printDocument}
              variant="contained"
              color="primary"
            >
              <i class="fa fa-file-pdf-o" aria-hidden="true"></i> Download PDF
            </button>
            <br />

            <Link to={`/admin`}>
              <button
                variant="contained"
                color="primary"
                style={{ float: "right", background: "lightgreen" }}
              >
                <i class="fa fa-reply" aria-hidden="true"></i> Go Back
              </button>
            </Link>
          </div>
        </center>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <center>
          <br />
          <span style={{ color: "white" }}>{"Copyright © "}</span>

          <span style={{ color: "lightcoral" }}>Event Company</span>

          <span style={{ color: "white" }}>
            {" " + new Date().getFullYear() + " . "}
          </span>
        </center>
      </div>
    );
  }
}
