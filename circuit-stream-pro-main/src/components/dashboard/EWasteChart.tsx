import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { month: 'Jan', collected: 180, processed: 165 },
  { month: 'Feb', collected: 220, processed: 210 },
  { month: 'Mar', collected: 195, processed: 185 },
  { month: 'Apr', collected: 285, processed: 270 },
  { month: 'May', collected: 315, processed: 300 },
  { month: 'Jun', collected: 240, processed: 235 },
];

const categoryData = [
  { name: 'Computers', value: 35, color: 'hsl(var(--primary))' },
  { name: 'Mobile Devices', value: 25, color: 'hsl(var(--eco-success))' },
  { name: 'Batteries', value: 20, color: 'hsl(var(--accent))' },
  { name: 'Other Electronics', value: 20, color: 'hsl(var(--eco-warning))' },
];

export const EWasteChart: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">E-Waste Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Monthly Processing</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                className="text-muted-foreground"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-muted-foreground"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="collected" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="processed" fill="hsl(var(--eco-warning))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};