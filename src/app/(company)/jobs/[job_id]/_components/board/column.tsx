'use client';

import { SortableContext, useSortable } from '@dnd-kit/sortable';

import { cn } from '@/lib/utils';

import Item from './item';

interface HeaderProps {
  title: string;
  color: string;
  columnLength: number;
}

const Header = ({ title, color, columnLength }: HeaderProps) => {
  return (
    <header className="px-2 py-3 flex justify-between items-center bg-primary-foreground border rounded-t-md">
      <div className="flex gap-2 items-center">
        <div className={'size-3 rounded-full ' + color} />
        <h6 className="font-semibold">{title}</h6>
      </div>
      <div className="bg-background size-8 rounded-md flex items-center justify-center font-semibold">
        {columnLength}
      </div>
    </header>
  );
};

export interface ItemType {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  resume: string;
  status: string;
  rating: number;
  comment_count: number;
  address_id: number;
  job_id: number;
  created_at: string;
  updated_at: string;
}

export interface ColumnProps {
  id: string;
  title: string;
  color: string;
}

const Column = ({ column, items }: { column: ColumnProps; items: ItemType[] }) => {
  const { id, title, color } = column;

  const { setNodeRef } = useSortable({
    id: id,
    data: {
      type: 'column',
      column,
    },
  });

  return (
    <div className="w-96 h-full">
      <Header title={title} color={color} columnLength={items.length} />

      <div
        className={cn(
          ['flex flex-col gap-2 p-2 bg-primary-foreground border border-t-0 rounded-b-md'],
          [!items.length && 'h-[256px] border-0 bg-transparent']
        )}
        ref={setNodeRef}
      >
        <SortableContext items={items.map((item) => item.id)}>
          {items.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;
