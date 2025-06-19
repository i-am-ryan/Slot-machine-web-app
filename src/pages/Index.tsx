import React, { useState } from 'react';
import LandingPage from '../components/LandingPage';
import AuthModal from '../components/AuthModal';
import SlotMachine from '../components/SlotMachine';
import DepositModal from '../components/DepositModal';

interface User {
  name: string;
  email: string;
  currency: string;
}

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<number>(0);

  const handleGetStarted = () => {
    setShowAuth(true);
  };

  const handleAuthenticated = (userData: User) => {
    setUser(userData);
    setShowAuth(false);
    setShowDeposit(true); // Show deposit modal after authentication
  };

  const handleDeposit = (amount: number) => {
    setBalance(amount);
    setShowDeposit(false);
  };

  const handleLogout = () => {
    setUser(null);
    setBalance(0);
  };

  // If user is authenticated and has balance, show slot machine
  if (user && balance > 0) {
    return (
      <SlotMachine 
        user={user} 
        balance={balance} 
        setBalance={setBalance} 
        onLogout={handleLogout} 
      />
    );
  }

  // Otherwise show landing page
  return (
    <>
      <LandingPage onGetStarted={handleGetStarted} />
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onAuthenticated={handleAuthenticated}
      />
      <DepositModal
        isOpen={showDeposit}
        onClose={() => setShowDeposit(false)}
        onDeposit={handleDeposit}
      />
    </>
  );
};

export default Index;