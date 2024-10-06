import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Select, Button, DatePicker, message, Input } from 'antd';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { Link } from 'react-router-dom';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../Images/logo.jpg';

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;

function getItem(label, key, icon, children) {
    return { key, icon, children, label };
}

// Menu items
const items = [
  getItem(<Link to="/">Dashboard</Link>, '1', <PieChartOutlined />),
  getItem(<Link to="/sales">Sales</Link>, '2', <DesktopOutlined />),
  getItem(<Link to="/profit&loss">Profit & Loss</Link>, '3', <UserOutlined />),
  getItem(<Link to="/promotions">Promotions</Link>, '4', <TeamOutlined />),
  getItem(<Link to="/offers">Offers</Link>, '5', <FileOutlined />),
  getItem(<Link to="/refund">Refunds</Link>, '6', <FileOutlined />),
];

const Sales = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [category, setCategory] = useState('Merchandise');
  const [month, setMonth] = useState(null);
  const [salesData, setSalesData] = useState(null); 
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    // Update the time every second
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString());
      }, 1000);
      return () => clearInterval(timer);
    }, []);

  // Fetch sales data from backend
  const fetchSalesData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/sales/get-sales-data', { category, month });
      setSalesData({
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Sales',
          data: response.data.map(sale => sale.total_sales),
          borderColor: 'rgba(75,192,192,1)',
          fill: false,
        }],
      });
    } catch (error) {
      message.error('Failed to fetch sales data');
    }
  };

  const generateReport = () => {
    if (!category || !month) {
      message.error('Please select category and month!');
      return;
    }
    fetchSalesData(); 
  };

  const exportPDF = () => {
    const element = document.getElementById('report-content');
    html2pdf().from(element).save('SalesReport.pdf');
  };

  const { Search } = Input;

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
      <Header style={{ padding: 0, background: '#d1bea8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
          <Search
            placeholder="Search offers..."
            onSearch={(value) => console.log(value)}
            style={{ width: 300 }}
          />
          <div style={{ fontSize: '18px' }}>{currentTime}</div>
        </Header>
        <Content style={{ margin: '24px 16px' }}>
          <div id="report-content" style={{ padding: 24, background: '#fff', borderRadius: 8 }}>
            <h2>Sales</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Card title="Total Sales" style={{ width: 200 }}><p>Rs.1000</p></Card>
              <Card title="Daily Sales" style={{ width: 200 }}><p>Rs.100</p></Card>
              <Card title="Monthly Sales" style={{ width: 200 }}><p>Rs.3000</p></Card>
              <Card title="Yearly Sales" style={{ width: 200 }}><p>Rs.10,000</p></Card>
            </div>
            <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'space-between' }}>
              <Select placeholder="Select Category" style={{ width: 200 }} onChange={setCategory}>
                <Option value="Merchandise">Merchandise</Option>
                <Option value="Albums">Albums</Option>
                <Option value="Tickets Sold">Tickets Sold</Option>
              </Select>
              <DatePicker picker="month" placeholder="Select Month" onChange={(date, dateString) => setMonth(dateString)} />
              <Button type="primary" onClick={generateReport}>Generate Report</Button>
              <Button onClick={exportPDF}>Export PDF</Button>
            </div>
            {salesData && (
              <Line
                data={salesData}
                options={{
                  title: { display: true, text: `Sales Report for ${category}`, fontSize: 20 },
                  legend: { display: true, position: 'right' },
                }}
              />
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', background: '#d1bea8' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Sales;
