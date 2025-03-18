import React from 'react';

interface DateDisplayProps {
  date: string; // Expecting a date string in 'yyyy-mm-dd' format
}
export const DateDisplay: React.FC<DateDisplayProps> = ({ date }) => {
  console.log("ugh dates: ", date)
  if( date == "null" ) return <span></span>
  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return new Intl.DateTimeFormat('en-US', options).format(dateObj);
  };

  return <span>{formatDate( date )}</span>;
};
