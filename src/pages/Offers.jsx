import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, message, Table, Modal, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

// Function to get menu items
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

// Offers component
const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);

  // Fetch offers from the backend
  const fetchOffers = async () => {
    const response = await axios.get('/api/offers'); // Adjust API endpoint as needed
    setOffers(response.data);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // Show modal for creating/editing an offer
  const showModal = (offer) => {
    setEditingOffer(offer);
    setIsModalVisible(true);
  };

  // Handle form submission
  const handleFinish = async (values) => {
    try {
      if (editingOffer) {
        // Update offer
        await axios.put(`/api/offers/${editingOffer.id}`, values);
      } else {
        // Create new offer
        await axios.post('/api/offers', values);
      }
      setIsModalVisible(false);
      fetchOffers();
      message.success('Offer saved successfully!');
    } catch (error) {
      message.error('Failed to save offer.');
    }
  };

  // Handle delete offer
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/offers/${id}`);
      fetchOffers();
      message.success('Offer deleted successfully!');
    } catch (error) {
      message.error('Failed to delete offer.');
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Code/PIN', dataIndex: 'code', key: 'code' },
    {
      title: 'Action',
      key: 'action',
      render: (_, offer) => (
        <>
          <Button onClick={() => showModal(offer)}>Edit</Button>
          <Button danger onClick={() => handleDelete(offer.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => showModal(null)}>Create Offer</Button>
      <Table columns={columns} dataSource={offers} pagination={false} />

      <Modal
        title={editingOffer ? 'Edit Offer' : 'Create Offer'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form initialValues={editingOffer} onFinish={handleFinish}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the offer name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the offer description!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Code/PIN" name="code" rules={[{ required: true, message: 'Please input the offer code or PIN!' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

// Main Sales component
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
            src="../Images/logo.jpeg"
            alt="Logo"
            style={{ width: collapsed ? '40px' : '100%', transition: 'width 0.3s' }}
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
            <h2>Offers</h2>
            <Offers />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Sales;
