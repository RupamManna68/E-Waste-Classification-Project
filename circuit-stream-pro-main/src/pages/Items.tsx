import React, { useState } from 'react';
import { Plus, Search, Filter, QrCode, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Item {
  id: string;
  qrCode: string;
  type: string;
  brand: string;
  model: string;
  condition: string;
  status: 'collected' | 'processing' | 'processed' | 'recycled';
  collectedDate: string;
  weight: string;
}

const mockItems: Item[] = [
  {
    id: '1',
    qrCode: 'QR001',
    type: 'Laptop',
    brand: 'Dell',
    model: 'Inspiron 15',
    condition: 'Fair',
    status: 'processing',
    collectedDate: '2024-01-15',
    weight: '2.1 kg'
  },
  {
    id: '2',
    qrCode: 'QR002',
    type: 'Smartphone',
    brand: 'Apple',
    model: 'iPhone 12',
    condition: 'Good',
    status: 'collected',
    collectedDate: '2024-01-16',
    weight: '0.16 kg'
  },
  {
    id: '3',
    qrCode: 'QR003',
    type: 'Monitor',
    brand: 'Samsung',
    model: '24" LED',
    condition: 'Poor',
    status: 'processed',
    collectedDate: '2024-01-10',
    weight: '4.2 kg'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'collected': return 'bg-blue-500 text-white';
    case 'processing': return 'bg-eco-warning text-foreground';
    case 'processed': return 'bg-eco-success text-white';
    case 'recycled': return 'bg-primary text-primary-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const Items: React.FC = () => {
  const [items, setItems] = useState<Item[]>(mockItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredItems = items.filter(item =>
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.qrCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Items Management</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage collected e-waste items
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-eco hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New E-Waste Item</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="qrCode">QR Code</Label>
                <div className="flex gap-2">
                  <Input id="qrCode" placeholder="Scan or enter QR code" />
                  <Button variant="outline" size="icon">
                    <QrCode className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Item Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="laptop">Laptop</SelectItem>
                    <SelectItem value="desktop">Desktop</SelectItem>
                    <SelectItem value="smartphone">Smartphone</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="monitor">Monitor</SelectItem>
                    <SelectItem value="printer">Printer</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" placeholder="Enter brand" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input id="model" placeholder="Enter model" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                    <SelectItem value="non-functional">Non-functional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" type="number" placeholder="0.0" step="0.1" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional notes..." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-gradient-eco">
                Add Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by type, brand, model, or QR code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Items Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>E-Waste Items ({filteredItems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>QR Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Brand & Model</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Collected Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-sm">{item.qrCode}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.brand}</p>
                      <p className="text-sm text-muted-foreground">{item.model}</p>
                    </div>
                  </TableCell>
                  <TableCell>{item.condition}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.weight}</TableCell>
                  <TableCell>{item.collectedDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Items;