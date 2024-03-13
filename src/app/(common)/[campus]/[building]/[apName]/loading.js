import { Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8 mt-8">
      <Skeleton className="rounded-lg w-full h-unit-72">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
    </div>
  );
}
