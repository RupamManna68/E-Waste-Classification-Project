import React, { useState } from 'react';
import { Plus, Search, Phone, Mail, MapPin, Star, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Vendor {
  id: string;
  name: string;
  type: string;
  certification: string;
  rating: number;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  specializations: string[];
  status: 'active' | 'pending' | 'suspended';
  processedItems: number;
}

const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'EcoRecycle Solutions',
    type: 'Processing Facility',
    certification: 'ISO 14001',
    rating: 4.8,
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'contact@ecorecycle.com',
      address: '123 Green Street, Eco City, EC 12345'
    },
    specializations: ['Laptops', 'Smartphones', 'Tablets'],
    status: 'active',
    processedItems: 1247
  },
  {
    id: '2',
    name: 'TechWaste Pro',
    type: 'Collection Center',
    certification: 'R2 Certified',
    rating: 4.6,
    contact: {
      phone: '+1 (555) 987-6543',
      email: 'info@techwastepro.com',
      address: '456 Tech Avenue, Digital District, DD 67890'
    },
    specializations: ['Monitors', 'Printers', 'Servers'],
    status: 'active',
    processedItems: 892
  },
  {
    id: '3',
    name: 'Green Circuit Recovery',
    type: 'Specialized Recycler',
    certification: 'e-Stewards',
    rating: 4.9,
    contact: {
      phone: '+1 (555) 456-7890',
      email: 'hello@greencircuit.org',
      address: '789 Recycle Road, Sustainable City, SC 13579'
    },
    specializations: ['Circuit Boards', 'Precious Metals', 'Rare Earth Elements'],
    status: 'active',
    processedItems: 634
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-eco-success text-white';
    case 'pending': return 'bg-eco-warning text-foreground';
    case 'suspended': return 'bg-destructive text-destructive-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const Vendors: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.specializations.some(spec => 
      spec.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vendor Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage certified e-waste recycling vendors
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-eco hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Add Vendor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Vendor</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="vendorName">Vendor Name</Label>
                <Input id="vendorName" placeholder="Enter vendor name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendorType">Vendor Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="processing">Processing Facility</SelectItem>
                    <SelectItem value="collection">Collection Center</SelectItem>
                    <SelectItem value="specialized">Specialized Recycler</SelectItem>
                    <SelectItem value="transport">Transport Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="certification">Certification</Label>
                <Input id="certification" placeholder="e.g., ISO 14001, R2, e-Stewards" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="contact@vendor.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specializations">Specializations</Label>
                <Input id="specializations" placeholder="Laptops, Smartphones, etc." />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Full address..." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-gradient-eco">
                Add Vendor
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vendors by name, type, or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor) => (
          <Card key={vendor.id} className="shadow-card hover:shadow-soft transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{vendor.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{vendor.type}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(vendor.status)}>
                  {vendor.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-medium">{vendor.rating}</span>
                <span className="text-sm text-muted-foreground">
                  • {vendor.processedItems} items processed
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{vendor.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="truncate">{vendor.contact.email}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <span className="text-muted-foreground">{vendor.contact.address}</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Specializations:</p>
                <div className="flex flex-wrap gap-1">
                  {vendor.specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <p className="text-sm">
                  <span className="font-medium">Certification:</span> {vendor.certification}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Vendors;