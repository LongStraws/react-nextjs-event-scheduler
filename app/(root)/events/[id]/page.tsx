import { getEventById } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import React from "react";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event = await getEventById(id);
  return <div>EventDetails</div>;
};

export default EventDetails;
