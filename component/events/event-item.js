import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'
import AddressIcon from '../icons/address-icon';
import DateIcon from '../icons/date-icon';
import classes from './event-item.module.css'

export default function EventItem(props) {
    const { title, image, date, location, id } = props;

    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const formattedAddress = location?.replace(', ', '\n');
    const exploreLink = `/events/${id}`;
     const route = useRouter()

  
    return (
      <li className={classes.item}>
        <Image src={'/' + image} alt={title} width={340} height={160} />
        <div className={classes.content}>
          <div className={classes.summary}>
            <h2>{title}</h2>
            <div className={classes.date}>
              <DateIcon />
              <time>{humanReadableDate}</time>
            </div>
            <div className={classes.address}>
              <AddressIcon />
              <address>{formattedAddress}</address>
            </div>
          </div>
          <div className={classes.actions}>
            <button className={classes.button} onClick={ () => route.push(exploreLink)}>
              <span>Explore Event</span>
            </button>
          </div>
        </div>
      </li>
    );
  }
  
