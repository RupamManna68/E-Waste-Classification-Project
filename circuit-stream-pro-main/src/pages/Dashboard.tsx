import React from 'react';
import { Package, Truck, Users, TrendingUp, Recycle, AlertTriangle } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { EWasteChart } from '@/components/dashboard/EWasteChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-slide-up">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Smart E-Waste Management System Overview
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Current Status</p>
            <p className="text-2xl font-bold text-eco-success">Operational</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Items Collected"
            value="2,847"
            icon={Package}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Items Processed"
            value="2,654"
            icon={Recycle}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Active Vendors"
            value="24"
            icon={Users}
            trend={{ value: 4, isPositive: true }}
          />
          <StatsCard
            title="Pending Pickups"
            value="18"
            icon={Truck}
            trend={{ value: 2, isPositive: false }}
          />
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EWasteChart />
          <RecentActivity />
        </div>

        {/* Processing Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Processing Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Items in Storage</span>
                  <span className="font-medium">156/200</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Weekly Processing Target</span>
                  <span className="font-medium">89/100</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Compliance Rate</span>
                  <span className="font-medium">98%</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Recycle className="w-5 h-5 text-primary" />
                Environmental Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-eco-success">1,247 kg</p>
                <p className="text-sm text-muted-foreground">E-waste processed this month</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">340 kg</p>
                <p className="text-sm text-muted-foreground">CO₂ emissions prevented</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-accent">89%</p>
                <p className="text-sm text-muted-foreground">Materials recovered</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-eco-warning" />
                Alerts & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-eco-warning/10 rounded-lg border border-eco-warning/20">
                <p className="text-sm font-medium text-foreground">Storage Near Capacity</p>
                <p className="text-xs text-muted-foreground">Main storage at 78% capacity</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm font-medium text-foreground">Scheduled Maintenance</p>
                <p className="text-xs text-muted-foreground">Processing unit maintenance tomorrow</p>
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  );
};

export default Dashboard;