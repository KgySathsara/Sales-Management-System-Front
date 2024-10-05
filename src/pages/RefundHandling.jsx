import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Button, Table, message, Modal } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// Menu items
const items = [
  getItem(<Link to="/">Dashboard</Link>, '1', <PieChartOutlined />),
  getItem(<Link to="/sales">Sales</Link>, '2', <DesktopOutlined />),
  getItem(<Link to="/profit&loss">Profit & Loss</Link>, 'sub1', <UserOutlined />),
  getItem(<Link to="/promotions">Promotions</Link>, 'sub2', <TeamOutlined />),
  getItem(<Link to="/offers">Offers</Link>, '9', <FileOutlined />),
  getItem(<Link to="/refund">Refunds</Link>, '10', <FileOutlined />),
];

const RefundHandling = () => {
  const [orders, setOrders] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders'); // Adjust API endpoint as needed
      setOrders(response.data);
    } catch (error) {
      message.error('Failed to fetch orders.');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Filter orders based on search value
  const filteredOrders = orders.filter(order =>
    order.id.toString().includes(searchValue)
  );

  // Show modal for verifying refund
  const showModal = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  // Handle refund request
  const handleRefund = async () => {
    try {
      // Logic to deduct the amount from sales and process the refund
      await axios.post(`/api/refunds`, { orderId: selectedOrder.id });
      message.success(`Refund processed for Order ID: ${selectedOrder.id}`);
      fetchOrders(); // Refresh orders
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to process refund.');
    }
  };

  const columns = [
    { title: 'Order ID', dataIndex: 'id', key: 'id' },
    { title: 'Customer Name', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount' },
    { title: 'Order Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Action',
      key: 'action',
      render: (_, order) => (
        <Button onClick={() => showModal(order)}>Verify Refund</Button>
      ),
    },
  ];

  return (
    <div>
      <Input
        placeholder="Search by Order ID"
        value={searchValue}
        onChange={handleSearchChange}
        style={{ marginBottom: 16 }}
      />
      <Table columns={columns} dataSource={filteredOrders} pagination={false} />

      <Modal
        title={`Verify Refund for Order ID: ${selectedOrder?.id}`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="confirm" type="primary" onClick={handleRefund}>
            Confirm Refund
          </Button>,
        ]}
      >
        <p>Are you sure you want to process the refund for Order ID: {selectedOrder?.id}?</p>
      </Modal>
    </div>
  );
};

const Sales = () => {
  const [collapsed, setCollapsed] = useState(false);

       // State for the current time
       const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
       const { Search } = Input;
    
       // Update the time every second
       useEffect(() => {
         const timer = setInterval(() => {
           setCurrentTime(new Date().toLocaleTimeString());
         }, 1000);
     
         // Cleanup timer on component unmount
         return () => clearInterval(timer);
       }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className="demo-logo-vertical" style={{ textAlign: 'center', padding: '16px' }}>
        {/* Replace 'path/to/your/logo.png' with the actual path to your logo */}
        <img
          src="../Images/logo.jpeg" 
          alt="Logo"
          style={{ width: collapsed ? '40px' : '100%', transition: 'width 0.3s' }} // Adjust width for collapsed state
        />
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>
      <Layout>
      <Header
          style={{
            padding: '0 20px',
            background: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Search Bar on the Left */}
          <Search
            placeholder="Search..."
            onSearch={(value) => console.log(value)}
            style={{ width: 300 }}
          />

          {/* Display Current Time on the Right */}
          <div style={{ fontSize: '18px' }}>{currentTime}</div>
        </Header>
        <Content style={{ margin: '24px 16px' }}>
        <h2>RefundHandling</h2>
          <RefundHandling />
        </Content>

        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Sales;
