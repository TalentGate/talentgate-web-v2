import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreateCompanyJobRequest } from '@/app/(company)/jobs/_lib/slice';

type JobLocationFormProps = {
  formData?: any;
  setFormData?: (x: CreateCompanyJobRequest) => void;
}

const JobLocationForm = ({ formData, setFormData }: JobLocationFormProps) => {
  const onLocationChange = (field: string, value: any) => {
    if (setFormData) {
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [field]: value,
        },
      });
    }
  };

  const onLocationAddressChange = (field: string, value: any) => {
    if (setFormData) {
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          address: {
            ...formData.location.address,
            [field]: value,
          },
        },
      });
    }
  };

  return (
    <section className="grid items-start gap-6">
      <div className="grid gap-2">
        <Label htmlFor="jobLocationLatitude">Latitude</Label>
        <Input defaultValue={formData.location.latitude || undefined} type="text" id="jobLocationLatitude"
               placeholder="Latitude" onChange={(e) => {
          onLocationChange('latitude', e.target.value);
        }} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="jobLocationLongitude">Longitude</Label>
        <Input defaultValue={formData.location.longitude || undefined} type="text" id="jobLocationLongitude"
               placeholder="Longitude" onChange={(e) => {
          onLocationChange('longitude', e.target.value);
        }} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="jobLocationAddressCountry">Country</Label>
        <Input defaultValue={formData.location.address.country || undefined} type="text" id="jobLocationAddressCountry"
               placeholder="Country" onChange={(e) => {
          onLocationAddressChange('country', e.target.value);
        }} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="jobLocationAddressState">State</Label>
        <Input defaultValue={formData.location.address.state || undefined} type="text" id="jobLocationAddressState"
               placeholder="State" onChange={(e) => {
          onLocationAddressChange('state', e.target.value);
        }} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="jobLocationAddressCity">City</Label>
        <Input defaultValue={formData.location.address.city || undefined} type="text" id="jobLocationAddressCity"
               placeholder="City" onChange={(e) => {
          onLocationAddressChange('city', e.target.value);
        }} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="jobLocationAddressStreet">Street</Label>
        <Input defaultValue={formData.location.address.street || undefined} type="text" id="jobLocationAddressStreet"
               placeholder="Street" onChange={(e) => {
          onLocationAddressChange('street', e.target.value);
        }} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="jobLocationAddressUnit">Unit</Label>
        <Input defaultValue={formData.location.address.unit || undefined} type="text" id="jobLocationAddressUnit"
               placeholder="Unit" onChange={(e) => {
          onLocationAddressChange('unit', e.target.value);
        }} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="jobLocationAddressPostalCode">Postal Code</Label>
        <Input defaultValue={formData.location.address.postal_code || undefined} type="text"
               id="jobLocationAddressPostalCode" placeholder="Postal Code" onChange={(e) => {
          onLocationAddressChange('postal_code', e.target.value);
        }} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="locationType">Location Type</Label>
        <RadioGroup defaultValue={formData.location.type || 'Onsite'} className="space-y-1 lg:flex lg:gap-6"
                    onValueChange={(e) => {
                      onLocationChange('type', e);
                    }}>
          <div className="self-end flex items-center space-x-2">
            <RadioGroupItem value="Onsite" id="Onsite" />
            <Label htmlFor="Onsite">Onsite</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Hybrid" id="Hybrid" />
            <Label htmlFor="Hybrid">Hybrid</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Remote" id="Remote" />
            <Label htmlFor="Remote">Remote</Label>
          </div>
        </RadioGroup>
      </div>
    </section>
  );
};

export default JobLocationForm;
