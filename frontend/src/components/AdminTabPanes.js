import { Tabs } from "antd";
import EventsDisplay from "./EventsDisplay";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const CustomTabPanes = () => (
  <center>
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Booked Events" key="1">
        <EventsDisplay />
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
