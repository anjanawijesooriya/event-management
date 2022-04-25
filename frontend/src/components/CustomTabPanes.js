import { Tabs } from "antd";
import CreateAdvertisement from "./CreateEvents";
import DisplayAdvertisement from "./DisplayEvents";
import StripeCheckout from "react-stripe-checkout";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const CustomTabPanes = () => (
  <center>
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Event Booking" key="1">
        <CreateAdvertisement />
      </TabPane>
      <TabPane tab="Event Book List" key="2">
        <DisplayAdvertisement />
      </TabPane>
      {/* <TabPane tab="Advertisement Payment Details" key="3">
        <StripeCheckout
          stripeKey="pk_test_4TbuO6qAW2XPuce1Q6ywrGP200NrDZ2233"
          name="Advertisement Payment Gateway"
          billingAddress
          shippingAddress
        />
      </TabPane> */}
    </Tabs>
  </center>
);

export default CustomTabPanes;
