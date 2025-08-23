'use client';

import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  pointerWithin,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

import { ColumnProps, ItemType } from './column';
import Column from './column';
import Item from './item';

// TODO: Will remove this mock data after API integration.
const applicants = [
  {
    id: 1,
    firstname: 'Erim',
    lastname: 'Cerah',
    email: 'jBk5g@example.com',
    phone: '123456789',
    resume: 'resume.pdf',
    status: 'applied',
    rating: 4,
    comment_count: 5,
    address_id: 1,
    job_id: 1,
    created_at: '2023-09-11T10:00:00.000Z',
    updated_at: '2023-09-11T10:00:00.000Z',
  },
  {
    id: 2,
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'jane.doe@example.com',
    phone: '987654321',
    resume: 'jane_resume.pdf',
    status: 'screening',
    rating: 3,
    comment_count: 2,
    address_id: 2,
    job_id: 2,
    created_at: '2023-09-12T14:00:00.000Z',
    updated_at: '2023-09-12T14:00:00.000Z',
  },
  {
    id: 3,
    firstname: 'John',
    lastname: 'Smith',
    email: 'john.smith@example.com',
    phone: '555555555',
    resume: 'john_resume.pdf',
    status: 'offer',
    rating: 4,
    comment_count: 3,
    address_id: 3,
    job_id: 3,
    created_at: '2023-09-13T09:00:00.000Z',
    updated_at: '2023-09-13T09:00:00.000Z',
  },
];

const columns = [
  {
    id: 'applied',
    title: 'Applied',
    color: 'bg-blue-500',
  },
  {
    id: 'screening',
    title: 'Screening',
    color: 'bg-orange-500',
  },
  {
    id: 'reference_check',
    title: 'Reference Check',
    color: 'bg-yellow-500',
  },
  {
    id: 'offer',
    title: 'Offer',
    color: 'bg-green-500',
  },
  {
    id: 'withdrawn',
    title: 'Withdrawn',
    color: 'bg-red-500',
  },
];

const Board = () => {
  const [items, setItems] = useState<ItemType[]>(applicants);

  const [activeItem, setActiveItem] = useState<ItemType | null>(null);
  const [activeColumn, setActiveColumn] = useState<ColumnProps | null>(null);

  const { state } = useSidebar();

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    if (active.data.current?.type === 'column') {
      setActiveItem(null);
      setActiveColumn(active.data.current.column);
      return;
    }

    if (active.data.current?.type === 'item') {
      setActiveColumn(null);
      setActiveItem(active.data.current.item);
      return;
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) {
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAItem = active.data.current?.type === 'item';
    const isOverItem = over.data.current?.type === 'item';

    if (!isActiveAItem) {
      return;
    }

    if (isActiveAItem && isOverItem) {
      setItems((items) => {
        const activeItemIndex = items.findIndex((item) => item.id === activeId);
        const overItemIndex = items.findIndex((item) => item.id === overId);

        if (items[activeItemIndex].status !== items[overItemIndex].status) {
          items[activeItemIndex].status = items[overItemIndex].status;
        }

        return arrayMove(items, activeItemIndex, overItemIndex);
      });
    }

    const isOverACol = over.data.current?.type === 'column';

    if (isActiveAItem && isOverACol) {
      setItems((items) => {
        const activeItemIndex = items.findIndex((item) => item.id === activeId);

        items[activeItemIndex].status = overId.toString();

        return arrayMove(items, activeItemIndex, activeItemIndex);
      });
    }
  }

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
    >
      <ScrollArea
        className={cn('whitespace-nowrap h-[70dvh] p-4', [
          state === 'expanded' ? 'w-[calc(95dvw-var(--sidebar-width))]' : 'w-[95dvw]',
        ])}
      >
        <div className="flex gap-4 w-full h-full">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              items={items.filter((item) => item.status === column.id)}
            />
          ))}
        </div>
        {typeof window === 'object' &&
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <Column
                  column={activeColumn}
                  items={items.filter((item) => item.status === activeColumn.id)}
                />
              )}
              {activeItem && <Item item={activeItem} />}
            </DragOverlay>,
            document.body
          )}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </DndContext>
  );
};

export default Board;
