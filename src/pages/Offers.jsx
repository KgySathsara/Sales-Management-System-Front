import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, message, Table, Modal, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import logo from '../Images/logo.jpg';

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

const Offers = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [offers, setOffers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch offers
  const fetchOffers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/offers/show');
      setOffers(response.data);
    } catch (error) {
      console.error('Error fetching offers:', error);
      message.error('Failed to fetch offers.');
    }
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
        await axios.put(`http://localhost:5000/api/offers/${editingOffer._id}`, values);
      } else {
        await axios.post('http://localhost:5000/api/offers/add', values);
      }
      setIsModalVisible(false);
      fetchOffers();
      message.success('Offer saved successfully!');
    } catch (error) {
      console.error('Error saving offer:', error);
      message.error('Failed to save offer.');
    }
  };

  // Handle delete offer
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/offers/${id}`);
      fetchOffers();
      message.success('Offer deleted successfully!');
    } catch (error) {
      console.error('Error deleting offer:', error);
      message.error('Failed to delete offer.');
    }
  };

  // Columns for the offers table
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
          <Button danger onClick={() => handleDelete(offer._id)}>Delete</Button>
        </>
      ),
    },
  ];

  // Function to get menu items
  const getItem = (label, key, icon, children) => ({
    key,
    icon,
    children,
    label,
  });

  // Menu items
  const items = [
    getItem(<Link to="/">Dashboard</Link>, '1', <DesktopOutlined />),
    getItem(<Link to="/sales">Sales</Link>, '2', <PieChartOutlined />),
    getItem(<Link to="/profit&loss">Profit & Loss</Link>, '3', <UserOutlined />),
    getItem(<Link to="/promotions">Promotions</Link>, '4', <TeamOutlined />),
    getItem(<Link to="/offers">Offers</Link>, '5', <FileOutlined />),
    getItem(<Link to="/refund">Refunds</Link>, '6', <FileOutlined />),
  ];

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
        <Header style={{ padding: 0, background: '#d1bea8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
          <Search
            placeholder="Search offers..."
            onSearch={(value) => console.log(value)}
            style={{ width: 300 }}
          />
          <div style={{ fontSize: '18px' }}>{currentTime}</div>
        </Header>
        <Content style={{ margin: '24px 16px' }}>
          <div style={{ padding: 24, background: '#fff', borderRadius: 8 }}>
            <h2>Offers</h2>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <Button type="primary" onClick={() => showModal(null)}>Create Offer</Button>
            </div>
            <Table columns={columns} dataSource={offers} pagination={false} rowKey="_id" />
            <Modal
              title={editingOffer ? 'Edit Offer' : 'Create Offer'}
              open={isModalVisible}
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
        </Content>
        <Footer style={{ textAlign: 'center', background: '#d1bea8' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Offers;
