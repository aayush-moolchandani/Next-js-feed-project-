import { useRouter } from "next/router";

import { getAllEvents } from "../../dummy-data";
import EventList from "../../component/events/event-list";
import EventsSearch from "../../component/events/events-search";
import classes from "../../styles/Home.module.css";
import Head from "next/head";

function AllEventsPage(props) {
  const router = useRouter();
  const events = props.events;

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <div className={classes.bg}>
      <Head>
        <title>All events</title>
        <meta name='description' content='personality events to know yourself better' />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
