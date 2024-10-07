import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Card, Table, Row, Col, Input } from 'antd';
import logo from '../Images/logo.jpg';

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

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

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // State for the current time
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, []);

  // Sample data for the table
  const salesData = [
    { key: '1', category: 'Merchandise', amount: 1200, date: '2024-10-01' },
    { key: '2', category: 'Albums', amount: 800, date: '2024-10-02' },
    { key: '3', category: 'Tickets', amount: 1500, date: '2024-10-03' },
  ];

  const salesColumns = [
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" style={{ textAlign: 'center', padding: '16px' }}>
          <img
            src={logo} // Use the imported logo
            alt="Logo"
            style={{
              width: collapsed ? '40px' : '80%', // Adjust size of the logo
              transition: 'width 0.3s',
              border: '1px solid red', // Add red border
              borderRadius: '200px', // Optional: round the corners
            }}
          />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 20px',
            background: '#d1bea8', // Set header background color to gray
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
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item><h2>Dashboard</h2></Breadcrumb.Item>
          </Breadcrumb>

          {/* Sales Overview Section */}
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card title="Merchandise Sales" bordered={false}>
                Rs.12,000
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Album Sales" bordered={false}>
                Rs.8,000
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Tickets Sold" bordered={false}>
                Rs.15,000
              </Card>
            </Col>
          </Row>

          {/* Sales Transactions Table */}
          <div
            style={{
              padding: 24,
              marginTop: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <h3>Sales Transactions</h3>
            <Table columns={salesColumns} dataSource={salesData} pagination={false} />
          </div>

          {/* Top Selling Items Section */}
          <div
            style={{
              padding: 24,
              marginTop: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <h3>Top Selling Items</h3>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card title="Top Merchandise" bordered={false}>
                  T-shirts
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Top Album" bordered={false}>
                  Greatest Hits
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Top Ticket Sales" bordered={false}>
                  Concert Tickets
                </Card>
              </Col>
            </Row>
          </div>
        </Content>

        <Footer
          style={{
            textAlign: 'center',
            background: '#d1bea8', // Set footer background color to gray
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
