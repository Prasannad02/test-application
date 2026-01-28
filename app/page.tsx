'use client';

import { useState } from 'react';
import Header from '@/components/header';
import AuthenticationPanel from '@/components/authentication-panel';
import UserLookupForm from '@/components/user-lookup-form';
import ProfileSection from '@/components/profile-section';
import ActionBar from '@/components/action-bar';
import SessionsTable from '@/components/sessions-table';
import ResetModal from '@/components/reset-modal';
import Toast from '@/components/toast';

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('Admin');
  const [userStatus, setUserStatus] = useState('Active');
  const [validationError, setValidationError] = useState('');

  const handleSignIn = () => {
    if (!email || !password) {
      setValidationError('Both fields required');
      return;
    }
    if (!email.includes('@')) {
      setValidationError('❌ Invalid email format');
      return;
    }
    setValidationError('');
    setIsLoggedIn(true);
    setToastMessage('✔ Login successful');
    setShowToast(true);
  };

  const handleReset = () => {
    setShowResetModal(true);
  };

  const handleConfirmReset = () => {
    setShowResetModal(false);
    setToastMessage('✔ Credentials reset sent to email');
    setShowToast(true);
    setEmail('');
    setPassword('');
  };

  const handleSaveProfile = () => {
    setToastMessage('✔ Changes saved successfully');
    setShowToast(true);
  };

  const handleSaveAccess = () => {
    setToastMessage('✔ Access settings updated');
    setShowToast(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setToastMessage('✔ Logged out successfully');
    setShowToast(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header onLogout={handleLogout} isLoggedIn={isLoggedIn} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {!isLoggedIn ? (
            <>
              <AuthenticationPanel
                email={email}
                password={password}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onSignIn={handleSignIn}
                onReset={handleReset}
                validationError={validationError}
              />

              <UserLookupForm />
            </>
          ) : (
            <>
              <ProfileSection
                email={email}
                role={userRole}
                status={userStatus}
                onRoleChange={setUserRole}
                onStatusChange={setUserStatus}
              />

              <ActionBar
                onSaveProfile={handleSaveProfile}
                onSaveAccess={handleSaveAccess}
              />

              <SessionsTable />
            </>
          )}
        </div>
      </div>

      <ResetModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleConfirmReset}
      />

      {showToast && (
        <Toast
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </main>
  );
}
