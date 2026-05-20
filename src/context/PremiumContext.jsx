import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext.jsx';

const PremiumContext = createContext(null);

export function PremiumProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Premium holati serverdan keladi (user.isPremium + premiumExpiry)
  const isPremium = (() => {
    if (!user) return false;
    if (!user.isPremium) return false;
    if (!user.premiumExpiry) return false;
    return new Date() < new Date(user.premiumExpiry);
  })();

  const daysLeft = (() => {
    if (!isPremium || !user?.premiumExpiry) return 0;
    return Math.ceil((new Date(user.premiumExpiry) - new Date()) / (1000 * 60 * 60 * 24));
  })();

  const openPremiumModal = () => {
    if (!user) {
      // Login qilmagan bo'lsa — avval login modali
      setShowAuthModal(true);
    } else {
      setShowPremiumModal(true);
    }
  };

  const closePremiumModal = () => setShowPremiumModal(false);
  const closeAuthModal = () => setShowAuthModal(false);

  return (
    <PremiumContext.Provider value={{
      isPremium,
      daysLeft,
      showPremiumModal,
      showAuthModal,
      openPremiumModal,
      closePremiumModal,
      closeAuthModal,
      // Eski kodni buzmaslik uchun
      activatePremium: () => {},
      setIsPremium: () => {},
    }}>
      {children}
    </PremiumContext.Provider>
  );
}

export function usePremium() {
  const ctx = useContext(PremiumContext);
  if (!ctx) throw new Error('usePremium must be used inside PremiumProvider');
  return ctx;
}
