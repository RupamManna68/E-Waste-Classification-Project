import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Package, Truck, CheckCircle } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'collection',
    message: 'New laptop collected from Tech Corp',
    time: '5 minutes ago',
    status: 'pending',
    icon: Package
  },
  {
    id: 2,
    type: 'processing',
    message: 'Batch #247 processing completed',
    time: '15 minutes ago',
    status: 'completed',
    icon: CheckCircle
  },
  {
    id: 3,
    type: 'pickup',
    message: 'Pickup scheduled for EcoVendor Ltd',
    time: '1 hour ago',
    status: 'scheduled',
    icon: Truck
  },
  {
    id: 4,
    type: 'collection',
    message: '12 smartphones collected from Mobile Store',
    time: '2 hours ago',
    status: 'completed',
    icon: Package
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-eco-success text-white';
    case 'pending': return 'bg-eco-warning text-foreground';
    case 'scheduled': return 'bg-primary text-primary-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

export const RecentActivity: React.FC = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <activity.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{activity.message}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
            <Badge className={getStatusColor(activity.status)}>
              {activity.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};