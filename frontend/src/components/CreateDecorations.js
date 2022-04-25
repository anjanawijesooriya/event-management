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
} from "antd";
import "antd/dist/antd.css";
import {} from "antd";
import axios from "axios";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
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


const CreateDecorations = () => {
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

  const [dType, setDType] = useState("");
  const [dLightings, setDLightings] = useState("");
  const [dFlowers, setDFlowers] = useState("");
  const [dSeating, setDSeating] = useState("");
  const [dEquipment, setDEquipment] = useState("")
 
  const createHandler = async () => {
    try {
      await axios.post("http://localhost:8070/decorations/create", {
        dType,
        dLightings,
        dFlowers,
        dSeating,
        dEquipment,
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

  const menu = (
    <Menu
      onClick={handleMenuClick}
      onChange={(e) => setDType(e.target.value)}
      items={[
        {
          label: "Wedding",
          key: "1",
          icon: <UserOutlined />,
        },
        {
          label: "DJ Party",
          key: "2",
          icon: <UserOutlined />,
        },
        {
          label: "Music Party",
          key: "3",
          icon: <UserOutlined />,
        },
      ]}
      
    />
  );

  return (
    <>
      <div>
        <center>
          <Divider />
          <h1>Create Decorations</h1>
          <Divider />
        </center>
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={createHandler}
        >
          <Form.Item
            name="decoration type"
            label="Decoration Type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              onChange={(e) => setDType(e.target.value)}
              placeholder="Enter Decoration Type"
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
            name="lightings"
            label="Lightings"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type={"String"}
              onChange={(e) => setDLightings(e.target.value)}
              placeholder="Enter Lightings Type"
            />
          </Form.Item>
          <Form.Item
            name="flowers"
            label="Flowers"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type={"text"}
              onChange={(e) => setDFlowers(e.target.value)}
              placeholder="Enter Flowers"
            />
          </Form.Item>
          <Form.Item
            name="seating"
            label="Seating"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type={"number"}
              onChange={(e) => setDSeating(e.target.value)}
              placeholder="Enter Seating"
            />
          </Form.Item>
          <Form.Item
            name="equipment"
            label="Equipment"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type={"text"}
              onChange={(e) => setDEquipment(e.target.value)}
              placeholder="Enter Equipment"
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

export default CreateDecorations;
