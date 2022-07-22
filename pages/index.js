import Head from "next/head";
import EventList from "../component/events/event-list";
import { getFeaturedEvents } from "../dummy-data";
import classes from "../styles/Home.module.css";

export default function Home(props) {
  return (
    <div className={classes.bg}>
      <Head>
        <title>Events home page</title>
        <meta name='description' content='Events that allow you to evolve..' />
      </Head>
      <EventList items={props.events} />
    </div>
  );
}
export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
