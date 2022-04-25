import { Button, notification, Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

const EventsDisplay = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () =>
      await axios
        .get("http://localhost:8070/events/")
        .then((res) => setData(res.data)))();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/events/delete/${id}`);
      notification.info({
        title: "Delete Form",
        message: "Successfully Delete The Advertidement",
        placement: "top",
      });
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  const columns = [
    {
      title: "Event Type",
      dataIndex: "eType",
    },
    {
      title: "Hall",
      dataIndex: "eHall",
    },
    {
      title: "Date",
      render: (record) => <>{moment(record.eDate).format("DD MMM YYYY")}</>,
    },
    {
      title: "Revenue",
      render: (record) => <>{"Rs." + record.eRevenue}</>,
    },
    {
      title: "Food",
      dataIndex: "eFood",
    },
    {
      title: "Lunch Type",
      dataIndex: "eLtype",
    },
    {
      title: "Dinner Type",
      dataIndex: "eDtype",
    },
    {
      title: "Action",
      render: (record) => (
        <>
          <button
            style={{ background: "red", color: "white" }}
            onClick={() => deleteHandler(record._id)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <Link to="/report">
        <Button>Generate Report</Button>
      </Link>
      <br />
      <br />
      <Table columns={columns} dataSource={data} />
    </>
  );
};
export default EventsDisplay;
