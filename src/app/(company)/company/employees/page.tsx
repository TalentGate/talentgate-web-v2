'use client';

import Link from 'next/link';

import { SaveIcon, UserPlus } from 'lucide-react';

import * as React from 'react';
import Header from '@/components/section/header';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  InviteEmployeeRequest,
  UpdateCurrentCompanyRequest,
  useInviteEmployeeMutation,
} from '@/app/(company)/company/_lib/slice';
import { useState } from 'react';
import { toast } from 'sonner';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { LoginError } from '@/app/(auth)/login/_lib/slice';

const Employees = () => {
  const [inviteEmployee, { data: inviteEmployeeData }] = useInviteEmployeeMutation();
  const [inviteEmployeeRequest, setInviteEmployeeRequest] = useState<InviteEmployeeRequest>({
    title: '',
    email: '',
  });

  const handleInviteEmployeeRequestChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInviteEmployeeRequest({
      ...inviteEmployeeRequest,
      [e.target.name]: e.target.value,
    });
  };

  const handleInviteEmployeeSubmit = async () => {
    try {
      await inviteEmployee(inviteEmployeeRequest).unwrap();
      toast.success('Employee Invited', {
        description: 'Employee has been successfully invited.',
      });
    } catch (err) {
      toast.error('Employee can not be invited.', {
        description:
          ((err as FetchBaseQueryError)?.data as LoginError)?.detail ||
          'Something went wrong. Please try again later.',
      });
    }
  };
  return (
    <main className="p-6 space-y-6 h-full w-full">
      <Header header="Employees" description="You can modify your company information" />
      <Card>
        <CardHeader className="justify-end">
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button variant="outline">Add Employee</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Employee</DialogTitle>
                  <DialogDescription>
                    Invite a new team member to join your workspace
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Title"
                      onChange={handleInviteEmployeeRequestChange}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="Email"
                      onChange={handleInviteEmployeeRequestChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button className="h-fit" type="submit" onClick={handleInviteEmployeeSubmit}>
                    Send Invitation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-4">
          <section>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice Number</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Billing Date</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody></TableBody>
            </Table>
          </section>
        </CardContent>
      </Card>
    </main>
  );
};

export default Employees;
