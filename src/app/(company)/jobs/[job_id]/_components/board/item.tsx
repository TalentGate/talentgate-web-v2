"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ClockIcon,
  EllipsisVerticalIcon,
  NotebookPen,
  StarIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ItemProps {
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

const Item = ({ item }: { item: ItemProps }) => {
  const { id, firstname, lastname, rating, comment_count, created_at } = item;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "item",
      item,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <Card
      className={cn(
        "bg-background hover:ring-2 hover:ring-primary hover:cursor-pointer",
        [isDragging && "opacity-50 ring-2 ring-primary"]
      )}
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <CardHeader className="flex justify-between">
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <CardTitle>
              {firstname} {lastname}
            </CardTitle>
          </div>
        </div>

        <Button variant={"ghost"}>
          <EllipsisVerticalIcon />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ClockIcon className="size-5" />
            <span className="font-semibold">{created_at}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <StarIcon className="size-5" />
            <span className="font-semibold">{rating} out of 5</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <NotebookPen className="size-5" />
            <span className="font-semibold">{comment_count} comments</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Item;
