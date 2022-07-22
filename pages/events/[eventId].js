import React, { Fragment } from "react";
import EventSummary from "../../component/event-detail/event-summary";
import EventLogistics from "../../component/event-detail/event-logistics";
import EventContent from "../../component/event-detail/event-content";
import { getAllEvents, getEventById } from "../../dummy-data";
import Head from "next/head";

export default function EventDetails(props) {
  const event = props.selectedEvent;

  if (!event) {
    return <p>Loafing....</p>;
  }
  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}
export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}
export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event) => ({ params: { eventId: (event.id).toString() } }));
  return {
    paths: paths,
    fallback: "blocking",
  };
}
