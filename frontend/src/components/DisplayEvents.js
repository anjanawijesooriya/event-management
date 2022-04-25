import { Button, notification, Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "antd";
import moment from "moment";

const DisplayEvents = () => {
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

  // const columns = [
  //   {
  //     title: "Advertisement Name",
  //     dataIndex: "adName",
  //   },
  //   {
  //     title: "Contact Number",
  //     dataIndex: "contactNo",
  //   },
  //   {
  //     title: "Email",
  //     dataIndex: "email",
  //   },
  //   {
  //     title: "Title",
  //     dataIndex: "title",
  //   },
  //   {
  //     title: "Description",
  //     dataIndex: "description",
  //   },
  //   {
  //     title: "Price Range",
  //     dataIndex: "priceRange",
  //   },
  //   {
  //     title: "Action",
  //     render: (record) => (
  //       <>
  //         <Link to={`/edit/${record._id}`}>
  //           <button style={{ background: "green", color: "white" }}>
  //             Edit
  //           </button>
  //         </Link>
  //         <button
  //           style={{ background: "red", color: "white" }}
  //           onClick={() => deleteHandler(record._id)}
  //         >
  //           Delete
  //         </button>
  //       </>
  //     ),
  //   },
  // ];

  return (
    <div>
      <Row >
        <Col style={{width: "100%"}}>
          {data.map((i) => (
            <div style={{ display: "inline-block", padding:10 }}>
              <Card title={i.eType} bordered={false} style={{width:300}} >
                {i.eHall} <br />
                {moment(i.eDate).format("DD MMM YYYY")} <br />
                {"Rs." + i.eRevenue} <br />
                {i.eFood} <br />
                {i.eLtype} <br />
                {i.eDtype}
                <br />
                <br />
                <>
                  <Link to={`/edit/${i._id}`}>
                    <button style={{ background: "green", color: "white" }}>
                      Edit
                    </button>
                  </Link>
                  <button
                    style={{ background: "red", color: "white" }}
                    onClick={() => deleteHandler(i._id)}
                  >
                    Delete
                  </button>
                </>
              </Card>
            </div>
          ))}
        </Col>
      </Row>

      <br />
      <br />

      {/* <Table columns={columns} dataSource={data} /> */}
    </div>
  );
};
export default DisplayEvents;
