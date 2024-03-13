import { IEvent } from "@/lib/mongodb/database/models/event.model";
import React from "react";
import Card from "./Card";
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
        <div className='flex flex-col items-center gap-10'>
          {" "}
          <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10'>
            {data.map((event) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li key={event._id} className='flex justify-center'>
                  <Card
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  ></Card>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className='flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center'>
          {" "}
          <h3>{emptyTitle}</h3>
          <p>{emptyStateSubtext}</p>{" "}
        </div>
      )}
    </>
  );
};

export default Collection;
