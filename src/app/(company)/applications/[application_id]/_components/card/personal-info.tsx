import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const PersonalInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold">Full Name</TableCell>
              <TableCell className="text-right">John Doe</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Email</TableCell>
              <TableCell className="text-right">lHh0q@example.com</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Phone Number</TableCell>
              <TableCell className="text-right">+905123456789</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Current Address</TableCell>
              <TableCell className="text-right">
                123 Main St, Apt 4B, Anytown, NY 12345, USA
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Gender</TableCell>
              <TableCell className="text-right">Male</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">University</TableCell>
              <TableCell className="text-right">Yeditepe University</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Graduated From</TableCell>
              <TableCell className="text-right">
                Computer Engineering, BSC
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">
                Soonest Date They Can Start
              </TableCell>
              <TableCell className="text-right">31/11/2026</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;
