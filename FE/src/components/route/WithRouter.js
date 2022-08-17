import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <WrappedComponent
      {...props}
      params={params}
      location={location}
      navigate={navigate}
    />
  );
};

export default withRouter;
