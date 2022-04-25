import { useState } from "react";
import {
  Layout,
  Button,
  Form,
  Input,
  Select,
  Divider,
  notification,
  Menu,
  Dropdown,
  message,
  Space,
  Tooltip,
  DatePicker,
} from "antd";
import "antd/dist/antd.css";
import {} from "antd";
import axios from "axios";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
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

const CreateEvents = () => {
  function handleMenuClick(e) {
    message.info("Click on menu item.");
    console.log("click", e);
  }

  const [collapsed, setCollapsed] = useState(false);

  const date = new Date();
  const hrs = date.getHours();

  let greet;

  if (hrs < 12) greet = "Good Morning";
  else if (hrs >= 12 && hrs < 17) greet = "Good Afternoon";
  else if (hrs >= 17 && hrs < 19) greet = "Good Evening";
  else greet = "Good Night";

  const [eType, setEType] = useState("");
  const [eHall, setEHall] = useState("");
  const [eDate, setEDate] = useState("");
  const [eRevenue, setERevenue] = useState("");
  const [eFood, setEFood] = useState("");
  const [eLtype, setELtype] = useState("");
  const [eDtype, setEDtype] = useState("");

  const createHandler = async () => {
    try {
      await axios.post("http://localhost:8070/events/create", {
        eType,
        eHall,
        eDate,
        eRevenue,
        eFood,
        eLtype,
        eDtype,
      });
      notification.info({
        title: "Create Form",
        message: "Successfully Create The Events",
        placement: "top",
      });
      form.resetFields();
    } catch (error) {
      alert(error);
    }
  };

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  // const menu = (
  //   <Menu
  //     onClick={handleMenuClick}
  //     onChange={(e) => setEType(e.target.value)}
  //     items={[
  //       {
  //         label: "Wedding",
  //         key: "1",
  //         icon: <UserOutlined />,
  //       },
  //       {
  //         label: "DJ Party",
  //         key: "2",
  //         icon: <UserOutlined />,
  //       },
  //       {
  //         label: "Music Party",
  //         key: "3",
  //         icon: <UserOutlined />,
  //       },
  //     ]}
  //   />
  // );

  return (
    <>
      <div>
        <center>
          <Divider />
          <h1>Create Event</h1>
          <Divider />
        </center>
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={createHandler}
        >
          <Form.Item
            name="event type"
            label="Event Type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              onChange={(e) => setEType(e.target.value)}
              placeholder="Enter Event Type"
            />
          </Form.Item>
          {/* <Form.Item
            name="Event Type"
            label="Event Type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Dropdown overlay={menu}>
              <Button>
                Event Type
                <DownOutlined />
              </Button>
            </Dropdown>
          </Form.Item> */}
          <Form.Item
            name="Hall"
            label="Hall"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type={"String"}
              onChange={(e) => setEHall(e.target.value)}
              placeholder="Enter Hall"
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
            <DatePicker style={{marginRight:750, width:200}}
              onChange={(e) => setEDate(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="revenue"
            label="Revenue"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type={"number"}
              onChange={(e) => setERevenue(e.target.value)}
              placeholder="Enter Revenue"
            />
          </Form.Item>
          <Form.Item
            name="food"
            label="Food"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type={"text"}
              onChange={(e) => setEFood(e.target.value)}
              placeholder="Enter Food"
            />
          </Form.Item>
          <Form.Item
            name="lunch type"
            label="Lunch Type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type={"text"}
              onChange={(e) => setELtype(e.target.value)}
              placeholder="Enter Lunch type"
            />
          </Form.Item>
          <Form.Item
            name="dinner type"
            label="Dinner Type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type={"text"}
              onChange={(e) => setEDtype(e.target.value)}
              placeholder="Enter Dinner type"
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CreateEvents;
