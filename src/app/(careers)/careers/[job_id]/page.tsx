import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Building,
  Check,
  ChevronLeft,
  CircleDollarSign,
  Clock,
  Laptop,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const CareerDetails = () => {
  return (
    <main className="p-6 space-y-6 h-full w-full min-h-[85dvh]">
      <Button asChild variant={"outline"} className="mb-6">
        <Link href="/careers">
          <ChevronLeft />
          <span>Back to Careers Page</span>
        </Link>
      </Button>

      <Card className="w-1/2 mx-auto">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">
            Software Quality Assurance Engineer
          </CardTitle>
          <div className="flex items-center gap-4 flex-wrap">
            <Badge variant={"outline"}>
              <Building className="size-5" />
              Engineering
            </Badge>
            <Badge variant={"outline"}>
              <Laptop className="size-5" />
              Remote
            </Badge>
            <Badge variant={"outline"}>
              <Clock className="size-5" />
              Full-Time
            </Badge>
            <Badge variant={"outline"}>
              <MapPin className="size-5" />
              Istanbul, Turkey
            </Badge>
            <Badge variant={"outline"}>
              <CircleDollarSign className="size-5" />
              120k$ - 150k$
            </Badge>
          </div>
        </CardHeader>

        <hr className="w-11/12 mx-auto" />

        <CardContent className="space-y-4">
          <CardTitle className="font-bold">Job Description</CardTitle>
          <p className="leading-relaxed text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            molestiae facere sequi alias nam est quisquam aperiam ab qui. Autem
            cumque harum aut unde perspiciatis labore est tenetur, culpa
            pariatur! Possimus omnis sequi sit quo, commodi veritatis incidunt!
            Exercitationem sit enim quidem reprehenderit porro vero nam, ratione
            illo magni sunt, vel fuga assumenda autem rerum? Totam repellat
            aspernatur neque magnam! Odio excepturi dolorem perferendis suscipit
            omnis delectus enim exercitationem a eius aut quo similique deserunt
            repellendus dignissimos dicta, dolor atque aliquam harum ex cum
            possimus. Laudantium totam corrupti quam quo. Minus, dolorem minima
            voluptatum accusantium repudiandae quis similique atque officiis id
            incidunt! Molestias recusandae consectetur, aperiam molestiae
            doloribus saepe eveniet voluptatem alias, voluptate ducimus quos
            autem voluptatum perspiciatis possimus quae. Rerum voluptate,
            adipisci veniam ea mollitia ullam, at cum, commodi repudiandae eius
            nostrum quam! Illum iusto quisquam deleniti enim assumenda hic
            voluptates impedit, consectetur, voluptatum eius facilis accusamus
            at id.
          </p>
        </CardContent>

        <hr className="w-11/12 mx-auto" />

        <CardContent className="space-y-4">
          <CardTitle className="font-bold">Submit your application</CardTitle>
          <section className="space-y-4">
            <div className="space-y-2 w-full">
              <Label htmlFor="resume">Resume</Label>
              <Input id="resume" type="file" accept=".pdf,.doc,.docx" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstname">First Name</Label>
              <Input id="firstname" placeholder="First Name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastname">Last Name</Label>
              <Input id="lastname" placeholder="Last Name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="Phone Number" type="tel" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Input id="unit" placeholder="Unit / Apartment" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="street">Street</Label>
              <Input id="street" placeholder="Street Address" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="City" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="State" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" placeholder="Country" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalcode">Postal Code</Label>
              <Input id="postalcode" placeholder="Postal Code" />
            </div>
          </section>

          <Button className="mt-6">Apply for This Job</Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default CareerDetails;
