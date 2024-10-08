import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Button, Table, message, Modal } from 'antd';
import { Link } from 'react-router-dom';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import logo from '../Images/logo.jpg';

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

// Helper function for getting Menu items
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
  getItem(<Link to="/">Dashboard</Link>, '1', <DesktopOutlined />),
  getItem(<Link to="/sales">Sales</Link>, '2', <PieChartOutlined />),
  getItem(<Link to="/profit&loss">Profit & Loss</Link>, '3', <UserOutlined />),
  getItem(<Link to="/promotions">Promotions</Link>, '4', <TeamOutlined />),
  getItem(<Link to="/offers">Offers</Link>, '5', <FileOutlined />),
  getItem(<Link to="/refund">Refunds</Link>, '6', <FileOutlined />),
];

// Dummy data for orders
const dummyOrders = [
  {
    id: 1,
    customerName: 'John Doe',
    totalAmount: '$200',
    status: 'Completed',
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    totalAmount: '$350',
    status: 'Pending',
  },
  {
    id: 3,
    customerName: 'Chris Johnson',
    totalAmount: '$120',
    status: 'Refunded',
  },
  {
    id: 4,
    customerName: 'Alice Brown',
    totalAmount: '$450',
    status: 'Completed',
  },
];

const RefundHandling = () => {
  const [orders, setOrders] = useState(dummyOrders); // Using dummy data
  const [searchValue, setSearchValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  // Handle refund request (mock functionality)
  const handleRefund = () => {
    message.success(`Refund processed for Order ID: ${selectedOrder.id}`);
    setIsModalVisible(false);
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
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

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
          <img
            src={logo}
            alt="Logo"
            style={{
              width: collapsed ? '40px' : '80%',
              transition: 'width 0.3s',
              border: '1px solid red',
              borderRadius: '200px',
            }}
          />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 20px',
            background: '#d1bea8',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Search
            placeholder="Search..."
            onSearch={(value) => console.log(value)}
            style={{ width: 300 }}
          />
          <div style={{ fontSize: '18px' }}>{currentTime}</div>
        </Header>
        <Content style={{ margin: '24px 16px' }}>
          <h2>Refund Handling</h2>
          <RefundHandling />
        </Content>
        <Footer style={{ textAlign: 'center', background: '#d1bea8', }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Sales;
