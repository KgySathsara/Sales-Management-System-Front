import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Button, Table, Input } from 'antd';
import { jsPDF } from 'jspdf';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import logo from '../Images/logo.jpg';

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
  getItem(<Link to="/">Dashboard</Link>, '1', <DesktopOutlined />),
  getItem(<Link to="/sales">Sales</Link>, '2', <PieChartOutlined />),
  getItem(<Link to="/profit&loss">Profit & Loss</Link>, '3', <UserOutlined />),
  getItem(<Link to="/promotions">Promotions</Link>, '4', <TeamOutlined />),
  getItem(<Link to="/offers">Offers</Link>, '5', <FileOutlined />),
  getItem(<Link to="/refund">Refunds</Link>, '6', <FileOutlined />),
];

const ProfitAndLoss = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [salesData, setSalesData] = useState([]); // State to hold sales data
  const [loading, setLoading] = useState(true);

  // Fetch sales data from backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/profit/show') // Ensure to match your backend URL
      .then((response) => {
        setSalesData(response.data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching sales data:', error));
  }, []);

  // Calculate total income and deductions
  const calculateProfitAndLoss = () => {
    const totalIncome = salesData.reduce((acc, item) => acc + item.amount, 0);
    const totalCommission = salesData.reduce((acc, item) => acc + (item.commission || 0), 0);
    const netProfit = totalIncome - totalCommission;

    return { totalIncome, totalCommission, netProfit };
  };

  const { totalIncome, totalCommission, netProfit } = calculateProfitAndLoss();

  // Generate PDF function
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Profit and Loss Statement', 14, 22);

    doc.setFontSize(12);
    doc.text(`Total Income: $${totalIncome}`, 14, 40);
    doc.text(`Total Commission: $${totalCommission}`, 14, 50);
    doc.text(`Net Profit: $${netProfit}`, 14, 60);

    doc.save('profit_and_loss_statement.pdf');
  };

  const columns = [
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Commission', dataIndex: 'commission', key: 'commission' },
  ];

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
        <Menu theme="dark" defaultSelectedKeys={['3']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#d1bea8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
          <Search placeholder="Search offers..." onSearch={(value) => console.log(value)} style={{ width: 300 }} />
          <div style={{ fontSize: '18px' }}>{currentTime}</div>
        </Header>
        <Content style={{ margin: '24px 16px' }}>
          <div style={{ padding: 24, background: '#fff', borderRadius: 8 }}>
            <h2>Profit and Loss</h2>
            <Card title="Profit and Loss Overview">
              <Table columns={columns} dataSource={salesData} loading={loading} pagination={false} />
              <h3>Total Income: ${totalIncome}</h3>
              <h3>Total Commission: ${totalCommission}</h3>
              <h3>Net Profit: ${netProfit}</h3>
              <Button type="primary" onClick={generatePDF}>Export as PDF</Button>
            </Card>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', background: '#d1bea8' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ProfitAndLoss;
