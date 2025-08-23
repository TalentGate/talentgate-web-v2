'use client';

import { useParams } from 'next/navigation';

import { PlusIcon, SearchIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import Board from './_components/board/board';
import Header from './_components/header/header';

const Pipeline = () => {
  const params = useParams<{ job_id: string }>();
  const job_id = params?.job_id;

  return (
    <main className="p-6 space-y-6 h-full w-full">
      <Header job_id={job_id} />
      <section className="flex justify-between">
        <Button>
          <PlusIcon />
          <span>Add applicant</span>
        </Button>

        <div className="relative">
          <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-5 stroke-muted-foreground" />
          <Input className="pl-10" placeholder="Search..." />
        </div>
      </section>
      <Board />
    </main>
  );
};

export default Pipeline;
