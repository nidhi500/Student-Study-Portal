import React from 'react';
import UserContributions from '../components/UserContributions';
import RemindersPanel from '../components/RemindersPanel';

function ProfilePage() {
  return (
    <>
      {/* Other dashboard components */}
      <RemindersPanel />
      <UserContributions />
    </>
  );
}

export default ProfilePage;
