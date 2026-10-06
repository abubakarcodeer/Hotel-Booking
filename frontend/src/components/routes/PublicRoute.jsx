
import { useNavigate } from '@tanstack/react-router';
import React, { useEffect, useState } from 'react';
import { getSessionToken, getSessionUser } from '../../utils/authentication';
import Loading from '../shared/Loading';

function PublicRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const user = getSessionUser();
  const token = getSessionToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && token) {
      navigate({ to: '/profile', search: { tab: 'my-profile' } });
    } else {
      setLoading(false);
    }
  }, [user, token]);

  return loading ? <Loading /> : children;
}

export default PublicRoute;
