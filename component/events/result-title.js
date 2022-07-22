import { useRouter } from 'next/router';
import classes from './result-title.module.css';

function ResultsTitle(props) {
  const route = useRouter()
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={classes.title}>
      <h1 style={{color:'white'}}>Events in {humanReadableDate}</h1>
      <button className={classes.button} onClick={ () => route.push('/events')}>
              <span>Show All Events</span>
            </button>
    </section>
  );
}

export default ResultsTitle;