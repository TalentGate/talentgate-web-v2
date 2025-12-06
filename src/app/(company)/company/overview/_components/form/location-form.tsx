import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { SaveIcon } from 'lucide-react';

type Location = {
  id?: number;
  type?: string;
  latitude?: string;
  longitude?: string;
  address?: {
    id?: number;
    unit?: string;
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
  };
};

type ModifyLocationProps = {
  location?: Location;
  isLoading: boolean;
  handleSubmit: (location: Location) => void;
};

function LocationForm({ location, isLoading, handleSubmit }: ModifyLocationProps) {
  const [currentLocation, setCurrentLocation] = useState<{
    id?: number;
    type?: string;
    latitude?: string;
    longitude?: string;
    address?: {
      id?: number;
      unit?: string;
      street?: string;
      city?: string;
      state?: string;
      country?: string;
      postal_code?: string;
    };
  }>(
    location ?? {
      id: undefined,
      type: '',
      latitude: '',
      longitude: '',
      address: {
        id: undefined,
        unit: '',
        street: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
      },
    }
  );

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLocation((prevLocation) => {
      const { name, value } = e.target;
      if (['unit', 'street', 'city', 'state', 'country', 'postal-code'].includes(name)) {
        const addressField = name === 'postal-code' ? 'postal_code' : name;
        return {
          ...prevLocation,
          address: {
            ...prevLocation.address,
            [addressField]: value,
          },
        };
      } else {
        return {
          ...prevLocation,
          [name]: value,
        };
      }
    });
  };

  return (
    <>
      <section className="space-y-4">
        <div className="space-y-2">
          <Label>Type</Label>
          <Input
            name="type"
            placeholder="Type"
            value={currentLocation.type}
            onChange={handleLocationChange}
          />
        </div>
        <div className="space-y-2">
          <Label>Latitude</Label>
          <Input
            name="latitude"
            placeholder="Latitude"
            value={currentLocation.latitude}
            onChange={handleLocationChange}
          />
        </div>
        <div className="space-y-2">
          <Label>Longitude</Label>
          <Input
            name="longitude"
            placeholder="Longitude"
            value={currentLocation.longitude}
            onChange={handleLocationChange}
          />
        </div>
        <div className="space-y-2">
          <Label>Country</Label>
          <Input
            name="country"
            placeholder="Country"
            value={currentLocation.address?.country}
            onChange={handleLocationChange}
          />
        </div>
        <div className="space-y-2">
          <Label>City</Label>
          <Input
            name="city"
            placeholder="City"
            value={currentLocation.address?.city}
            onChange={handleLocationChange}
          />
        </div>
        <div className="space-y-2">
          <Label>State</Label>
          <Input
            name="state"
            placeholder="State"
            value={currentLocation.address?.state}
            onChange={handleLocationChange}
          />
        </div>
        <div className="space-y-2">
          <Label>Street</Label>
          <Input
            name="street"
            placeholder="Street"
            value={currentLocation.address?.street}
            onChange={handleLocationChange}
          />
        </div>
        <div className="space-y-2">
          <Label>Unit</Label>
          <Input
            name="unit"
            placeholder="Unit"
            value={currentLocation.address?.unit}
            onChange={handleLocationChange}
          />
        </div>
        <div className="space-y-2">
          <Label>Postal Code</Label>
          <Input
            name="postal-code"
            placeholder="Postal Code"
            value={currentLocation.address?.postal_code}
            onChange={handleLocationChange}
          />
        </div>
      </section>

      <DialogFooter>
        <Button
          disabled={isLoading}
          onClick={() => {
            handleSubmit(currentLocation);
          }}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <SaveIcon />
              <span>Save Changes</span>
            </>
          )}
        </Button>
        <DialogClose>Cancel</DialogClose>
      </DialogFooter>
    </>
  );
}

export default LocationForm;
