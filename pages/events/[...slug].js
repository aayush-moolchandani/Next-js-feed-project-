import { Fragment } from "react";
import { useRouter } from "next/router";
import EventList from "../../component/events/event-list";
import ResultsTitle from "../../component/events/result-title";
import ErrorAlert from "../../component/events/error-alert";
import classes from "../../styles/Home.module.css";
import { getFilteredEvents } from "../../dummy-data";
import Head from "next/head";

function FilteredEventsPage(props) {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p className='center'>Loading...</p>;
  }
  const pageHeadData = (
    <Head>
      <title>Featured events</title>
      <meta name='description' content={`All events for selected month`} />
    </Head>
  );

  if (props.hasError) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <button className={classes.button} onClick={() => router.push("/events")}>
            <span>Show All Events</span>
          </button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <button className={classes.button} onClick={() => router.push("/events")}>
            <span>Show All Events</span>
          </button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <div className={classes.bg}>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}
export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
    return {
      props: { hasError: true },
    };
  }
  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}

export default FilteredEventsPage;
