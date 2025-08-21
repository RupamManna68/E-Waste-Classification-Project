import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  Monitor, 
  Shield, 
  Settings as SettingsIcon,
  AlertTriangle,
  Save,
  Upload,
  Eye,
  EyeOff,
  Smartphone,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

const Settings: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    portal: true,
    frequency: 'instant'
  });
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('english');

  const activeSessions = [
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'Mumbai, India',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'Mumbai, India',
      lastActive: '2 hours ago',
      current: false
    }
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account, preferences, and portal customization
          </p>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <SettingsIcon className="w-4 h-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            System
          </TabsTrigger>
          <TabsTrigger value="danger" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Danger Zone
          </TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="text-lg bg-primary/10 text-primary">JD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" className="gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Photo
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG up to 2MB. Recommended: 400x400px
                  </p>
                </div>
              </div>

              <Separator />

              {/* Profile Form */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@university.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Number</Label>
                  <Input id="phone" defaultValue="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue="Computer Science" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Coordinator" disabled />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-gradient-eco gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-gradient-eco">Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences" className="space-y-6">
          {/* Theme & Language */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-primary" />
                Display & Language
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Theme Mode</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light Mode</SelectItem>
                      <SelectItem value="dark">Dark Mode</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                      <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                      <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Portal Notifications</Label>
                    <p className="text-sm text-muted-foreground">Show notifications in the portal</p>
                  </div>
                  <Switch
                    checked={notifications.portal}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, portal: checked }))}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Notification Frequency</Label>
                <Select value={notifications.frequency} onValueChange={(value) => setNotifications(prev => ({ ...prev, frequency: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instant">Instant</SelectItem>
                    <SelectItem value="daily">Daily Summary</SelectItem>
                    <SelectItem value="weekly">Weekly Summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          {/* Two-Factor Authentication */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Two-Factor Authentication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Enable 2FA</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline">Setup 2FA</Button>
              </div>
            </CardContent>
          </Card>

          {/* Active Sessions */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-primary" />
                Active Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Monitor className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{session.device}</p>
                      <p className="text-sm text-muted-foreground">{session.location} • {session.lastActive}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {session.current && <Badge variant="secondary">Current</Badge>}
                    {!session.current && (
                      <Button variant="outline" size="sm">Logout</Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Data Privacy */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-primary" />
                Data Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Export Activity Data</Label>
                  <p className="text-sm text-muted-foreground">Download a copy of your activity and data</p>
                </div>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Customization */}
        <TabsContent value="system" className="space-y-6">
          <div className="mb-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-sm font-medium text-primary">Admin Only Section</p>
            <p className="text-xs text-muted-foreground">These settings are only available to system administrators</p>
          </div>

          {/* Role Management */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Role Permissions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">Coordinator</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Manage all items</li>
                    <li>• View all reports</li>
                    <li>• Manage vendors</li>
                  </ul>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">Vendor</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• View assigned items</li>
                    <li>• Update item status</li>
                    <li>• Submit reports</li>
                  </ul>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">Admin</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Full system access</li>
                    <li>• User management</li>
                    <li>• System settings</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Item Categories */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5 text-primary" />
                Default Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Recyclable Items</Label>
                  <Textarea placeholder="Laptops, Monitors, Keyboards..." defaultValue="Laptops, Desktop Computers, Monitors, Keyboards, Mice, Printers, Scanners" />
                </div>
                <div className="space-y-2">
                  <Label>Reusable Items</Label>
                  <Textarea placeholder="Functional devices..." defaultValue="Functional Smartphones, Working Tablets, Good Condition Laptops" />
                </div>
                <div className="space-y-2">
                  <Label>Hazardous Items</Label>
                  <Textarea placeholder="Batteries, CRT monitors..." defaultValue="Lithium Batteries, CRT Monitors, Mercury-containing devices, Lead-acid batteries" />
                </div>
                <div className="space-y-2">
                  <Label>Special Handling</Label>
                  <Textarea placeholder="Items requiring special care..." defaultValue="Data Storage Devices, Medical Equipment, Industrial Electronics" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-gradient-eco">Update Categories</Button>
              </div>
            </CardContent>
          </Card>

          {/* Portal Branding */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Portal Branding
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Organization Name</Label>
                  <Input defaultValue="University E-Waste Management" />
                </div>
                <div className="space-y-2">
                  <Label>Contact Email</Label>
                  <Input defaultValue="ewaste@university.edu" />
                </div>
                <div className="space-y-2">
                  <Label>Support Phone</Label>
                  <Input defaultValue="+91 22 1234 5678" />
                </div>
                <div className="space-y-2">
                  <Label>Website URL</Label>
                  <Input defaultValue="https://ewaste.university.edu" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-gradient-eco">Update Branding</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Danger Zone */}
        <TabsContent value="danger" className="space-y-6">
          <Card className="shadow-card border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Deactivate Account */}
              <div className="p-4 border border-eco-warning/20 bg-eco-warning/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Deactivate Account</h4>
                    <p className="text-sm text-muted-foreground">
                      Temporarily deactivate your account. You can reactivate it later.
                    </p>
                  </div>
                  <Button variant="outline" className="border-eco-warning text-eco-warning hover:bg-eco-warning/10">
                    Deactivate
                  </Button>
                </div>
              </div>

              {/* Delete Account */}
              <div className="p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-destructive">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data. This cannot be undone.
                    </p>
                  </div>
                  <Button variant="destructive">
                    Delete Account
                  </Button>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                <p>⚠️ Account deletion requires admin approval and may take up to 7 days to process.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;