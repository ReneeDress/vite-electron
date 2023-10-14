import { useEffect } from 'react';
import { useState } from 'react';
import './index.css';
import {
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Breadcrumb, Layout, Menu, Typography } from 'antd';
import { customRoutes, routes } from '../pages/routes';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const DefaultLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  const HeaderMenu: MenuItemType[] = customRoutes.map((item) => {
    if (item?.menuData)
        return {
            ...item?.menuData,
            key: item.route.path
        };
    else return undefined
  }).filter((i) => i);

  const [selectedHeaderIndex, setSelectedHeaderIndex] = useState<string>('/');

  const handleMenuItemClick = (info: any) => {
    navigate(info.key);
  }

  const ifSider = () => {
    const children = routes.find((item) => {
        return (item.path !== '/') && (item.path)?.indexOf(location.pathname);
    })?.children;
    console.log('[DefaultLayout]', children);
    return children ? true : false
  };

  const SiderMenu: MenuItemType[] = [];

  const [currentPageInfo, setCurrentPageInfo] = useState<any>();

  useEffect(() => {
    console.log('[DefaultLayout]','location changed', `/${location.pathname.split('/')[1]}`);
    setSelectedHeaderIndex(`/${location.pathname.split('/')[1]}`);
    const matchedPage = customRoutes.find((item) => {
        return (item.route.path !== '/') && (item.route.path)?.indexOf(location.pathname);
    });
    console.log('[DefaultLayout]','matchedPage', matchedPage);
    if (matchedPage)
        setCurrentPageInfo(matchedPage?.pageInfo);
  }, [location]);

  return (
    <Layout style={{ width: '100%', height: '100%', minHeight: '100vh', }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedHeaderIndex]}
          items={HeaderMenu}
          onClick={(info) => handleMenuItemClick(info)}
        />
      </Header>
      <Layout>
        {
            ifSider() ?
            <Sider
            width={200}
            collapsible
            collapsed={collapsed}
            onCollapse={value => setCollapsed(value)}
            >
            <Menu
                mode="inline"
                // defaultSelectedKeys={[selectedHeaderIndex]}
                selectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                items={SiderMenu}
            />
            </Sider>
            : <></>
        }
        
        <Layout style={{ padding: '0 24px 24px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb> */}
          <Title>{ currentPageInfo?.title }</Title>
          {JSON.stringify(currentPageInfo)}
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              // background: colorBgContainer,
            }}
          >
            {JSON.stringify(HeaderMenu)}
            {selectedHeaderIndex}
            {JSON.stringify(location)}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      {/* <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/DefaultLayout.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      {/* <p>
        <a href={`/usb-devices`}>USB Devices</a>
      </p> */}
    </Layout>
  );
};

export default DefaultLayout;
