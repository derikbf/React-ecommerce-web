import React from 'react';
import { Col, Row } from 'react-bootstrap';
import AdminHeader from '../Header/AdminHeader';
import AdminFooter from '../Footer/AdminFooter';

const AdminComponent: React.FC = ({children}) => {
  return(
    <Row className="mr-lg-4">
      <Col lg={3}>
          Menu Lateral
      </Col>

      <Col lg={9}>
          <div className="d-flex flex-column sticky-footer-wrapper container">
            
            <AdminHeader name="Nome do User" />
            
            <div className="flex-fill text-center">
                { children }
            </div>
            <AdminFooter />
          </div>
      </Col>
    </Row>
  )
}

export default AdminComponent;
