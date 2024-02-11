import { IEvent } from "@/lib/mongodb/database/models/event.model";
import React from "react";
type CollectionProps = {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  collectionType?: string;
  urlParamname?: "Events_Organized" | "My_Tickets" | "All_Events";
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamname,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div> {data[0].title}</div>
      ) : (
        <div>
          {" "}
          <h3>{emptyTitle}</h3>
          <p>{emptyStateSubtext}</p>{" "}
        </div>
      )}
    </>
  );
};

export default Collection;
