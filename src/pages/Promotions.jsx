/*import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Table, Modal, Form, Input, Upload, message } from 'antd';
import { Link } from 'react-router-dom';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import logo from '../Images/logo.jpg';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon) {
  return { key, icon, label };
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

const Promotions = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [form] = Form.useForm();
  const [promotions, setPromotions] = useState([]);

  // Fetch promotions from the backend
  const fetchPromotions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/promotions');
      setPromotions(response.data);
    } catch (error) {
      message.error('Failed to fetch promotions.');
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  // Show modal for creating/editing a promotion
  const showModal = (promotion) => {
    setEditingPromotion(promotion);
    setIsModalVisible(true);
    form.resetFields();
  };

  // Handle form submission
  const handleFinish = async (values) => {
    try {
      if (editingPromotion) {
        await axios.put(`http://localhost:5000/api/promotions/${editingPromotion.id}`, values);
      } else {
        await axios.post('http://localhost:5000/api/promotions', values);
      }
      setIsModalVisible(false);
      fetchPromotions();
      message.success('Promotion saved successfully!');
    } catch (error) {
      message.error('Failed to save promotion.');
    }
  };

  // Handle delete promotion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/promotions/${id}`);
      fetchPromotions();
      message.success('Promotion deleted successfully!');
    } catch (error) {
      message.error('Failed to delete promotion.');
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} alt="promo" style={{ width: 100 }} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, promotion) => (
        <>
          <Button onClick={() => showModal(promotion)}>Edit</Button>
          <Button danger onClick={() => handleDelete(promotion.id)}>Delete</Button>
        </>
      ),
    },
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
        <Header style={{ padding: '0 20px', background: '#d1bea8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Input.Search placeholder="Search..." onSearch={(value) => console.log(value)} style={{ width: 300 }} />
          <div style={{ fontSize: '18px' }}>{new Date().toLocaleTimeString()}</div>
        </Header>
        <Content style={{ margin: '24px 16px' }}>
          <div style={{ padding: 24, background: '#fff', borderRadius: 8 }}>
            <h2>Promotions</h2>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <Button type="primary" onClick={() => showModal(null)}>Create Promotion</Button>
            </div>
            <Table columns={columns} dataSource={promotions} pagination={false} />

            <Modal
              title={editingPromotion ? 'Edit Promotion' : 'Create Promotion'}
              visible={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              footer={null}
            >
              <Form form={form} initialValues={editingPromotion} onFinish={handleFinish}>
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the promotion name!' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the promotion description!' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Image" name="image" rules={[{ required: true, message: 'Please upload an image!' }]}>
                  <Upload beforeUpload={(file) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const base64String = reader.result;
                      form.setFieldsValue({ image: base64String });
                    };
                    reader.readAsDataURL(file);
                    return false;
                  }}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', background: '#d1bea8', }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Promotions;*/

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Table, Modal, Form, Input, Upload, message } from 'antd';
import { Link } from 'react-router-dom';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import logo from '../Images/logo.jpg';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon) {
  return { key, icon, label };
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

const Promotions = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [form] = Form.useForm();
  const [promotions, setPromotions] = useState([]);

  // Dummy data for promotions
  const dummyPromotions = [
    {
      id: 1,
      name: 'Summer Sale',
      description: 'Get 20% off on all products during the summer sale!',
      image: 'https://via.placeholder.com/100', // Placeholder image
    },
    {
      id: 2,
      name: 'Winter Clearance',
      description: 'Clearance sale! Up to 50% off on selected items.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 3,
      name: 'New Year Bonanza',
      description: 'Start the new year with exciting discounts!',
      image: 'https://via.placeholder.com/100',
    },
  ];

  // Fetch promotions from the backend
  const fetchPromotions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/promotions');
      setPromotions(response.data);
    } catch (error) {
      console.error('Failed to fetch promotions, using dummy data instead.', error);
      setPromotions(dummyPromotions); // Use dummy data if fetching fails
      message.error('Failed to fetch promotions, using dummy data instead.');
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  // Show modal for creating/editing a promotion
  const showModal = (promotion) => {
    setEditingPromotion(promotion);
    setIsModalVisible(true);
    form.resetFields();
  };

  // Handle form submission
  const handleFinish = async (values) => {
    try {
      if (editingPromotion) {
        await axios.put(`http://localhost:5000/api/promotions/${editingPromotion.id}`, values);
      } else {
        await axios.post('http://localhost:5000/api/promotions', values);
      }
      setIsModalVisible(false);
      fetchPromotions();
      message.success('Promotion saved successfully!');
    } catch (error) {
      message.error('Failed to save promotion.');
    }
  };

  // Handle delete promotion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/promotions/${id}`);
      fetchPromotions();
      message.success('Promotion deleted successfully!');
    } catch (error) {
      message.error('Failed to delete promotion.');
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} alt="promo" style={{ width: 100 }} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, promotion) => (
        <>
          <Button onClick={() => showModal(promotion)}>Edit</Button>
          <Button danger onClick={() => handleDelete(promotion.id)}>Delete</Button>
        </>
      ),
    },
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
        <Header style={{ padding: '0 20px', background: '#d1bea8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Input.Search placeholder="Search..." onSearch={(value) => console.log(value)} style={{ width: 300 }} />
          <div style={{ fontSize: '18px' }}>{new Date().toLocaleTimeString()}</div>
        </Header>
        <Content style={{ margin: '24px 16px' }}>
          <div style={{ padding: 24, background: '#fff', borderRadius: 8 }}>
            <h2>Promotions</h2>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <Button type="primary" onClick={() => showModal(null)}>Create Promotion</Button>
            </div>
            <Table columns={columns} dataSource={promotions} pagination={false} />

            <Modal
              title={editingPromotion ? 'Edit Promotion' : 'Create Promotion'}
              visible={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              footer={null}
            >
              <Form form={form} initialValues={editingPromotion} onFinish={handleFinish}>
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the promotion name!' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the promotion description!' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Image" name="image" rules={[{ required: true, message: 'Please upload an image!' }]}>
                  <Upload beforeUpload={(file) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const base64String = reader.result;
                      form.setFieldsValue({ image: base64String });
                    };
                    reader.readAsDataURL(file);
                    return false;
                  }}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
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

export default Promotions;
