import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KPICard } from '@/components/KPICard';
import { Settings as SettingsIcon, User, Building2, Bell, Shield, Database, Palette, Monitor } from 'lucide-react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    occupancyAlerts: true,
    bookingReminders: true,
    maintenanceUpdates: false,
    weeklyReports: true
  });

  const [thresholds, setThresholds] = useState({
    occupancyWarning: 80,
    occupancyCritical: 95,
    meetingRoomUtilization: 85,
    dwellTimeAlert: 8
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your workspace analytics dashboard and preferences
          </p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
            <TabsTrigger value="buildings">Buildings</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <KPICard
                title="System Status"
                value="Online"
                subtitle="All sensors active"
                variant="success"
                icon={<Monitor className="h-5 w-5" />}
              />
              <KPICard
                title="Active Users"
                value="24"
                subtitle="Dashboard access"
                icon={<User className="h-5 w-5" />}
              />
              <KPICard
                title="Data Sources"
                value="156"
                subtitle="Connected sensors"
                variant="primary"
                icon={<Database className="h-5 w-5" />}
              />
              <KPICard
                title="Uptime"
                value="99.8%"
                subtitle="Last 30 days"
                variant="secondary"
                icon={<SettingsIcon className="h-5 w-5" />}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="kpi-card p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Dark Mode</div>
                      <div className="text-xs text-muted-foreground">Switch to dark theme</div>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        darkMode ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          darkMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-2">Theme Color</div>
                    <div className="flex gap-2">
                      {['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'].map((color) => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full ${color} border-2 border-white shadow-md hover:scale-110 transition-transform`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="kpi-card p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  Dashboard Preferences
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-2">Default View</div>
                    <select className="w-full p-2 border rounded-md bg-background">
                      <option>Dashboard Overview</option>
                      <option>Space Utilization</option>
                      <option>Analytics</option>
                      <option>Floor Plans</option>
                    </select>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-2">Refresh Interval</div>
                    <select className="w-full p-2 border rounded-md bg-background">
                      <option>Real-time (5 seconds)</option>
                      <option>30 seconds</option>
                      <option>1 minute</option>
                      <option>5 minutes</option>
                    </select>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Time Zone</div>
                    <select className="w-full p-2 border rounded-md bg-background">
                      <option>UTC-8 (Pacific Time)</option>
                      <option>UTC-5 (Eastern Time)</option>
                      <option>UTC+0 (GMT)</option>
                      <option>UTC+1 (CET)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="kpi-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Alert Notifications</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Occupancy Alerts</div>
                      <div className="text-xs text-muted-foreground">Threshold breach notifications</div>
                    </div>
                    <button
                      onClick={() => setNotifications({...notifications, occupancyAlerts: !notifications.occupancyAlerts})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.occupancyAlerts ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.occupancyAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Booking Reminders</div>
                      <div className="text-xs text-muted-foreground">Meeting room conflicts</div>
                    </div>
                    <button
                      onClick={() => setNotifications({...notifications, bookingReminders: !notifications.bookingReminders})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.bookingReminders ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.bookingReminders ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Maintenance Updates</div>
                      <div className="text-xs text-muted-foreground">System status changes</div>
                    </div>
                    <button
                      onClick={() => setNotifications({...notifications, maintenanceUpdates: !notifications.maintenanceUpdates})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.maintenanceUpdates ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.maintenanceUpdates ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Report Notifications</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Weekly Reports</div>
                      <div className="text-xs text-muted-foreground">Summary analytics email</div>
                    </div>
                    <button
                      onClick={() => setNotifications({...notifications, weeklyReports: !notifications.weeklyReports})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.weeklyReports ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.weeklyReports ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Email Recipients</div>
                    <textarea 
                      className="w-full p-2 border rounded-md bg-background text-sm"
                      rows={3}
                      placeholder="admin@workspace.com&#10;manager@workspace.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="thresholds" className="space-y-6">
            <div className="kpi-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Alert Thresholds
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-2">Occupancy Warning (%)</div>
                    <input
                      type="number"
                      value={thresholds.occupancyWarning}
                      onChange={(e) => setThresholds({...thresholds, occupancyWarning: parseInt(e.target.value)})}
                      className="w-full p-2 border rounded-md bg-background"
                      min="50"
                      max="100"
                    />
                    <div className="text-xs text-muted-foreground mt-1">Yellow alert threshold</div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Occupancy Critical (%)</div>
                    <input
                      type="number"
                      value={thresholds.occupancyCritical}
                      onChange={(e) => setThresholds({...thresholds, occupancyCritical: parseInt(e.target.value)})}
                      className="w-full p-2 border rounded-md bg-background"
                      min="80"
                      max="100"
                    />
                    <div className="text-xs text-muted-foreground mt-1">Red alert threshold</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-2">Meeting Room Utilization (%)</div>
                    <input
                      type="number"
                      value={thresholds.meetingRoomUtilization}
                      onChange={(e) => setThresholds({...thresholds, meetingRoomUtilization: parseInt(e.target.value)})}
                      className="w-full p-2 border rounded-md bg-background"
                      min="70"
                      max="100"
                    />
                    <div className="text-xs text-muted-foreground mt-1">Optimization alert</div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Dwell Time Alert (hours)</div>
                    <input
                      type="number"
                      value={thresholds.dwellTimeAlert}
                      onChange={(e) => setThresholds({...thresholds, dwellTimeAlert: parseInt(e.target.value)})}
                      className="w-full p-2 border rounded-md bg-background"
                      min="4"
                      max="12"
                    />
                    <div className="text-xs text-muted-foreground mt-1">Long stay notification</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="buildings" className="space-y-6">
            <div className="kpi-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Building Configuration
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'North Building', floors: 4, capacity: 650, sensors: 42, status: 'Active' },
                  { name: 'South Building', floors: 3, capacity: 390, sensors: 28, status: 'Active' },
                  { name: 'West Building', floors: 6, capacity: 670, sensors: 51, status: 'Active' },
                  { name: 'East Building', floors: 4, capacity: 290, sensors: 35, status: 'Active' }
                ].map((building) => (
                  <div key={building.name} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{building.name}</h4>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {building.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Floors</div>
                        <div className="font-medium">{building.floors}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Capacity</div>
                        <div className="font-medium">{building.capacity}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Sensors</div>
                        <div className="font-medium">{building.sensors}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="kpi-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                User Management
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'John Admin', email: 'john@workspace.com', role: 'Administrator', lastLogin: '2 hours ago' },
                  { name: 'Sarah Manager', email: 'sarah@workspace.com', role: 'Manager', lastLogin: '1 day ago' },
                  { name: 'Mike Analyst', email: 'mike@workspace.com', role: 'Analyst', lastLogin: '3 hours ago' },
                  { name: 'Lisa Viewer', email: 'lisa@workspace.com', role: 'Viewer', lastLogin: '5 minutes ago' }
                ].map((user) => (
                  <div key={user.email} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{user.role}</div>
                        <div className="text-xs text-muted-foreground">{user.lastLogin}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="kpi-card p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Management
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Storage Used</span>
                    <span className="text-sm font-medium">2.4 GB / 10 GB</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '24%' }} />
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm">Data Retention</span>
                    <span className="text-sm font-medium">12 months</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm">Backup Schedule</span>
                    <span className="text-sm font-medium">Daily 2:00 AM</span>
                  </div>
                </div>
              </div>

              <div className="kpi-card p-6">
                <h3 className="text-lg font-semibold mb-4">Export Options</h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 text-sm border rounded hover:bg-muted transition-colors">
                    📊 Export Analytics Report (CSV)
                  </button>
                  <button className="w-full text-left p-2 text-sm border rounded hover:bg-muted transition-colors">
                    🏢 Export Building Data (JSON)
                  </button>
                  <button className="w-full text-left p-2 text-sm border rounded hover:bg-muted transition-colors">
                    🚨 Export Alert Logs (PDF)
                  </button>
                  <button className="w-full text-left p-2 text-sm border rounded hover:bg-muted transition-colors">
                    📈 Export Usage Trends (Excel)
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;