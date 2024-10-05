import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Table, Modal, Form, Input, Upload, message } from 'antd';
import { Link } from 'react-router-dom';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
  } from '@ant-design/icons';
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}

// Menu items
const items = [
    getItem(<Link to="/">Dashboard</Link>, '1', <PieChartOutlined />),
    getItem(<Link to="/sales">Sales</Link>, '2', <DesktopOutlined />), // Use Link here
    getItem(<Link to="/profit&loss">Profit & Loss</Link>, 'sub1', <UserOutlined />),
    getItem(<Link to="/promotions">Promotions</Link>, 'sub2', <TeamOutlined />),
    getItem(<Link to="/offers">Offers</Link>, '9', <FileOutlined />),
    getItem(<Link to="/refund">Refunds</Link>, '10', <FileOutlined />),
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
      const response = await axios.get('/api/promotions'); // Adjust API endpoint
      setPromotions(response.data);
    } catch (error) {
      message.error('Failed to fetch promotions.');
    }
  };

  // Use Effect to fetch promotions on mount
  useEffect(() => {
    fetchPromotions();
  }, []);

  // Show modal for creating/editing a promotion
  const showModal = (promotion) => {
    setEditingPromotion(promotion);
    setIsModalVisible(true);
    form.resetFields(); // Reset fields when opening the modal
  };

  // Handle form submission
  const handleFinish = async (values) => {
    try {
      if (editingPromotion) {
        // Update promotion
        await axios.put(`/api/promotions/${editingPromotion.id}`, values);
      } else {
        // Create new promotion
        await axios.post('/api/promotions', values);
      }
      setIsModalVisible(false);
      fetchPromotions(); // Refresh promotions list
      message.success('Promotion saved successfully!');
    } catch (error) {
      message.error('Failed to save promotion.');
    }
  };

  // Handle delete promotion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/promotions/${id}`);
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
                    return false; // Prevent upload
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
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Your Name
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Promotions;
