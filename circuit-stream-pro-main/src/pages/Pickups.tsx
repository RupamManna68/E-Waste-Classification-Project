import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit, Trash2, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PickupsPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('All');

  const pickups = [
    { id: 1, item: 'Old Laptop', date: '2025-08-12', status: 'Completed' },
    { id: 2, item: 'Smartphone', date: '2025-08-14', status: 'Pending' },
    { id: 3, item: 'Printer', date: '2025-08-15', status: 'Completed' },
    { id: 4, item: 'Tablet', date: '2025-08-16', status: 'Pending' },
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'Completed') {
      return <Badge className="bg-eco-success/20 text-eco-success flex items-center gap-1"><CheckCircle size={14}/> Completed</Badge>;
    }
    if (status === 'Pending') {
      return <Badge className="bg-eco-warning/20 text-eco-warning flex items-center gap-1"><Clock size={14}/> Pending</Badge>;
    }
    return <Badge>{status}</Badge>;
  };

  const filteredPickups = pickups.filter((pickup) => 
    statusFilter === 'All' ? true : pickup.status === statusFilter
  );

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Pickups</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> Schedule Pickup
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search pickups..." className="pl-8" />
        </div>

        {/* Status Filter Dropdown */}
        <Select onValueChange={(value) => setStatusFilter(value)} defaultValue="All">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" /> More Filters
        </Button>
      </div>

      {/* Pickup List */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Scheduled Pickups</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPickups.map((pickup) => (
                <TableRow key={pickup.id}>
                  <TableCell>{pickup.item}</TableCell>
                  <TableCell>{pickup.date}</TableCell>
                  <TableCell>{getStatusBadge(pickup.status)}</TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredPickups.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No pickups found for this status.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PickupsPage;