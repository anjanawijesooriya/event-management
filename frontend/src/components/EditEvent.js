import { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Button,
  Form,
  Input,
  Select,
  Divider,
  notification,
  DatePicker,
} from "antd";
import {
  SendOutlined,
  CrownOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import {} from "antd";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
const { Header, Content, Footer, Sider } = Layout;

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const EditAdvertisement = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [eType, setEType] = useState("");
  const [eHall, setEHall] = useState("");
  const [eDate, setEDate] = useState("");
  const [eRevenue, setERevenue] = useState("")
  const [eFood, setEFood] = useState("");
  const [eLtype, setELtype] = useState("");
  const [eDtype, setEDtype] = useState("");

  const date = new Date();
  const hrs = date.getHours();

  let greet;

  if (hrs < 12) greet = "Good Morning";
  else if (hrs >= 12 && hrs < 17) greet = "Good Afternoon";
  else if (hrs >= 17 && hrs < 19) greet = "Good Evening";
  else greet = "Good Night";

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  const [form] = Form.useForm();

  const { id } = useParams();

  useEffect(() => {
    (async () =>
      await axios
        .get(`http://localhost:8070/events/get/${id}`)
        .then((res) => {
          console.log(res);
          form.setFieldsValue({
            eType: res.data.eType,
            eHall: res.data.eHall,
            eDate: res.data.eDate,
            eRevenue: res.data.eRevenue,
            eFood: res.data.eFood,
            eLtype: res.data.eLtype,
            eDtype: res.data.eDtype,
          });
          setEType(res.data.eType);
          setEHall(res.data.eHall);
          setEDate(res.data.eDate);
          setERevenue(res.data.eRevenue);
          setEFood(res.data.eFood);
          setELtype(res.data.eLtype);
          setEDtype(res.data.eDtype);
        }))();
  }, []);

  const onReset = () => {
    form.resetFields();
  };

  const editHandler = async () => {
    try {
      await axios.put(`http://localhost:8070/events/update/${id}`, {
        eType,
        eHall,
        eDate,
        eRevenue,
        eFood,
        eLtype,
        eDtype
      });
      notification.info({
        title: "Update Form",
        message: "Successfully Updated The Advertidement",
        placement: "top",
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Menu theme="dark" mode="inline" selectedKeys={"0"}>
              <Menu.Item key="0" icon={<SendOutlined />}>
                <Link to="/home">Event Booking</Link>
              </Menu.Item>
            </Menu>
            <br />
            <br />
          </Sider>
          <Layout className="site-layout">
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>{greet}</Breadcrumb.Item>
                <Breadcrumb.Item>Admin</Breadcrumb.Item>
              </Breadcrumb>
              <center>
                <Divider />

                <h1>Edit Event</h1>
                <Divider />
              </center>
              <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={editHandler}
              >
                <Form.Item
                  name="eType"
                  label="Event Type"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  // initialValue={data.adName}
                >
                  <Input onChange={(e) => setEType(e.target.value)} />
                </Form.Item>
                <Form.Item
                  name="eHall"
                  label="Hall"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    type={"text"}
                    onChange={(e) => setEHall(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Date"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker
                    defaultValue={moment(Date(eDate))}
                    onChange={(e) => setEDate(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="eRevenue"
                  label="Revenue"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input onChange={(e) => setERevenue(e.target.value)} />
                </Form.Item>
                <Form.Item
                  name="eFood"
                  label="Food"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input onChange={(e) => setEFood(e.target.value)} />
                </Form.Item>
                <Form.Item
                  name="eLtype"
                  label="Lunch Type"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input onChange={(e) => setELtype(e.target.value)} />
                </Form.Item>
                <Form.Item
                  name="eDtype"
                  label="Dinner Type"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input onChange={(e) => setEDtype(e.target.value)} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Edit
                  </Button>
                  <Button htmlType="button" onClick={onReset}>
                    Cancel
                  </Button>
                </Form.Item>
              </Form>
            </Content>
            <Link to="/home">
              {" "}
              <Button>Back</Button>
            </Link>
            <Footer style={{ textAlign: "center" }}>
              Copyright © {date.getFullYear()} ABC Company
            </Footer>
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default EditAdvertisement;
