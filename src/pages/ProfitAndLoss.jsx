import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Button, Table, Input } from 'antd';
import { jsPDF } from 'jspdf';
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

const ProfitAndLoss = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Sample sales data
  const salesData = [
    { key: '1', category: 'Merchandise', amount: 12000, date: '2024-10-01' },
    { key: '2', category: 'Albums', amount: 8000, date: '2024-10-02', commission: 200 },
    { key: '3', category: 'Tickets', amount: 15000, date: '2024-10-03', commission: 500 },
  ];

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
      <Header style={{ padding: 0, background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
          {/* Search Bar */}
          <Search
            placeholder="Search offers..."
            onSearch={(value) => console.log(value)}
            style={{ width: 300 }}
          />
          {/* Current Time */}
          <div style={{ fontSize: '18px' }}>{currentTime}</div>
        </Header>
        <Content style={{ margin: '24px 16px' }}>
          <div style={{ padding: 24, background: '#fff', borderRadius: 8 }}>
          <h2>Profit and Loss</h2>
            <Card title="Profit and Loss Overview">
              <Table columns={columns} dataSource={salesData} pagination={false} />
              <h3>Total Income: ${totalIncome}</h3>
              <h3>Total Commission: ${totalCommission}</h3>
              <h3>Net Profit: ${netProfit}</h3>
              <Button type="primary" onClick={generatePDF}>Export as PDF</Button>
            </Card>
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ProfitAndLoss;