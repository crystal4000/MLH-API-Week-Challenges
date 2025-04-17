import React from 'react';
import { useMyMLH } from '../hooks/useMyMLH';

const MyMLHLogin: React.FC = () => {
  const { authorizeWithMyMLH } = useMyMLH();

  return (
    <button 
      onClick={authorizeWithMyMLH}
      className="mymlh-login-button"
    >
      Sign in with MyMLH
    </button>
  );
};

export default MyMLHLogin;