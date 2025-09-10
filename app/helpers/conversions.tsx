import React from 'react';
import { format } from "date-fns";

interface DateDisplayProps {
  date: string | undefined; // Expecting a date string in 'yyyy-mm-dd' format
}
export const DateDisplay: React.FC<DateDisplayProps> = ({ date }) => {
  console.log("ugh dates: ", date)
  if( date == "null" ) return <span></span>
  const formatDate = (dateString: string | undefined) => {
    if( dateString ) {
      const dateObj = new Date(dateString);
  
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
  
      return new Intl.DateTimeFormat('en-US', options).format(dateObj);
    }
  };

  return <span>{formatDate( date )}</span>;
};

export function readableDate(dateString: string, mode: number ) {
  const date = new Date(dateString);
  if (mode === 2) {
    return <time dateTime={dateString}>{format(date, "MMMM yyyy")}</time>;
  } else if (mode === 3) {
    return <time dateTime={dateString}>{format(date, "MMMM dd yyyy")}</time>;
  } else {
    return <time dateTime={dateString}>{format(date, "yyyy")}</time>;
  }
}
