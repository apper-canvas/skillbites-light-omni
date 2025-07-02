import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: 'John Educator',
    email: 'john@skillbites.com',
    bio: 'Passionate educator with 10+ years of experience in online learning.',
    website: 'https://johneducator.com',
    linkedin: 'https://linkedin.com/in/johneducator',
    twitter: '@johneducator'
  });

  const [paymentData, setPaymentData] = useState({
    stripeAccountId: '',
    paypalEmail: '',
    bankAccount: '',
    taxId: ''
  });

  const [notificationData, setNotificationData] = useState({
    emailNotifications: true,
    newEnrollments: true,
    courseComments: false,
    weeklyReports: true,
    marketingEmails: false
  });

  const [platformData, setPlatformData] = useState({
    coursesPublished: 12,
    totalStudents: 847,
    totalRevenue: 15420,
    memberSince: '2023-01-15'
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'payment', label: 'Payment', icon: 'CreditCard' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'platform', label: 'Platform', icon: 'Settings' }
  ];

  const handleProfileUpdate = () => {
    toast.success('Profile updated successfully!');
  };

  const handlePaymentUpdate = () => {
    toast.success('Payment settings updated!');
  };

  const handleNotificationUpdate = () => {
    toast.success('Notification preferences updated!');
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            icon="User"
          />
          <Input
            label="Email Address"
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            icon="Mail"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bio
        </label>
        <textarea
          rows={4}
          value={profileData.bio}
          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
          className="input-field resize-none"
          placeholder="Tell students about your expertise..."
        />
      </div>

      <div>
        <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
          Social Links
        </h3>
        <div className="space-y-4">
          <Input
            label="Website"
            value={profileData.website}
            onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
            icon="Globe"
            placeholder="https://yourwebsite.com"
          />
          <Input
            label="LinkedIn"
            value={profileData.linkedin}
            onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
            icon="Linkedin"
            placeholder="https://linkedin.com/in/username"
          />
          <Input
            label="Twitter"
            value={profileData.twitter}
            onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
            icon="Twitter"
            placeholder="@username"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="primary" onClick={handleProfileUpdate}>
          Save Changes
        </Button>
      </div>
    </div>
  );

  const renderPaymentTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
          Payment Methods
        </h3>
        <div className="space-y-4">
          <Input
            label="Stripe Account ID"
            value={paymentData.stripeAccountId}
            onChange={(e) => setPaymentData({ ...paymentData, stripeAccountId: e.target.value })}
            icon="CreditCard"
            placeholder="acct_xxxxxxxxxx"
          />
          <Input
            label="PayPal Email"
            type="email"
            value={paymentData.paypalEmail}
            onChange={(e) => setPaymentData({ ...paymentData, paypalEmail: e.target.value })}
            icon="Mail"
            placeholder="your@paypal.com"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
          Tax Information
        </h3>
        <div className="space-y-4">
          <Input
            label="Tax ID / SSN"
            value={paymentData.taxId}
            onChange={(e) => setPaymentData({ ...paymentData, taxId: e.target.value })}
            icon="FileText"
            placeholder="XXX-XX-XXXX"
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <ApperIcon name="Info" size={20} className="text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Payment Processing</h4>
            <p className="text-sm text-blue-700">
              We use Stripe for secure payment processing. You'll need to complete your Stripe setup to receive payments.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="primary" onClick={handlePaymentUpdate}>
          Save Payment Settings
        </Button>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
          Email Notifications
        </h3>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive email notifications for important updates' },
            { key: 'newEnrollments', label: 'New Enrollments', description: 'Get notified when students enroll in your courses' },
            { key: 'courseComments', label: 'Course Comments', description: 'Receive notifications for course reviews and comments' },
            { key: 'weeklyReports', label: 'Weekly Reports', description: 'Get weekly summary of your course performance' },
            { key: 'marketingEmails', label: 'Marketing Emails', description: 'Receive promotional emails and platform updates' }
          ].map((item) => (
            <div key={item.key} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.label}</h4>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationData[item.key]}
                  onChange={(e) => setNotificationData({ 
                    ...notificationData, 
                    [item.key]: e.target.checked 
                  })}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="primary" onClick={handleNotificationUpdate}>
          Save Preferences
        </Button>
      </div>
    </div>
  );

  const renderPlatformTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
          Account Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <ApperIcon name="BookOpen" size={32} className="text-primary" />
              <Badge variant="primary">Active</Badge>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-1">
              {platformData.coursesPublished}
            </h4>
            <p className="text-gray-600">Courses Published</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <ApperIcon name="Users" size={32} className="text-green-600" />
              <Badge variant="success">Growing</Badge>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-1">
              {platformData.totalStudents.toLocaleString()}
            </h4>
            <p className="text-gray-600">Total Students</p>
          </div>

          <div className="bg-gradient-to-br from-accent/10 to-accent/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <ApperIcon name="DollarSign" size={32} className="text-accent-dark" />
              <Badge variant="warning">Earning</Badge>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-1">
              ${platformData.totalRevenue.toLocaleString()}
            </h4>
            <p className="text-gray-600">Total Revenue</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <ApperIcon name="Calendar" size={32} className="text-blue-600" />
              <Badge variant="info">Member</Badge>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-1">
              {new Date(platformData.memberSince).getFullYear()}
            </h4>
            <p className="text-gray-600">Member Since</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
          Account Actions
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Export Data</h4>
              <p className="text-sm text-gray-600">Download all your course and student data</p>
            </div>
            <Button variant="ghost" icon="Download">
              Export
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Account Backup</h4>
              <p className="text-sm text-gray-600">Create a backup of your account settings</p>
            </div>
            <Button variant="ghost" icon="Archive">
              Backup
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
            <div>
              <h4 className="font-medium text-red-900">Delete Account</h4>
              <p className="text-sm text-red-700">Permanently delete your account and all data</p>
            </div>
            <Button variant="danger" icon="Trash2">
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900">
          Settings
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your account preferences and platform settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200
                  ${activeTab === tab.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <ApperIcon name={tab.icon} size={18} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="card">
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'payment' && renderPaymentTab()}
            {activeTab === 'notifications' && renderNotificationsTab()}
            {activeTab === 'platform' && renderPlatformTab()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;