export interface Event {
  title: string;
  date: string; // Format: YYYY-MM-DD or YYYY-MM
  description?: string;
}

export interface Timeline {
  events: Event[];
}

// Timeline of life events
// Add your life events here in chronological order
// Date format: YYYY-MM-DD for specific dates, YYYY-MM for month-level events
const timeline: Timeline = {
  events: [
    {
      title: 'Born 👶🏼',
      date: '1986-09',
      description: 'Vijayawada, India',
    },
    {
      title: '1st Birthday 🥳',
      date: '1987-09',
    },
    {
      title: '2nd Birthday 🎂',
      date: '1988-09',
    },
    {
      title: '3rd Birthday 🎈',
      date: '1989-09',
    },
    {
      title: '4th Birthday 🎁',
      date: '1990-09',
    },
    {
      title: '5th Birthday 🎉',
      date: '1991-09',
    },
    {
      title: '6th Birthday 🎊',
      date: '1992-09',
    },
    {
      title: '7th Birthday 🎂',
      date: '1993-09',
    },
    {
      title: '8th Birthday 🎈',
      date: '1994-09',
    },
    {
      title: '9th Birthday 🎁',
      date: '1995-09',
    },
    {
      title: '10th Birthday 🎉',
      date: '1996-09',
    },
    {
      title: '11th Birthday 🎊',
      date: '1997-09',
    },
    {
      title: '12th Birthday 🎂',
      date: '1998-09',
    },
    {
      title: '13th Birthday 🎈',
      date: '1999-09',
    },
    {
      title: '14th Birthday 🎁',
      date: '2000-09',
    },
    {
      title: '15th Birthday 🎉',
      date: '2001-09',
    },
    {
      title: '16th Birthday 🎊',
      date: '2002-09',
    },
    {
      title: '17th Birthday 🎂',
      date: '2003-09',
    },
    {
      title: 'Joined DAIICT 🏫',
      date: '2004-08',
    },
    {
      title: '18th Birthday 🎈',
      date: '2004-09',
    },
    {
      title: '19th Birthday 🎁',
      date: '2005-09',
    },
    {
      title: '20th Birthday 🎉',
      date: '2006-09',
    },
    {
      title: '21st Birthday 🎊',
      date: '2007-09',
    },
    {
      title: 'Graduated from college 🎓',
      date: '2008-05-05',
    },
    {
      title: 'Joined Infosys 💼',
      date: '2008-06',
      description: 'Senior Software Engineer',
    },
    {
      title: '22nd Birthday 🎂',
      date: '2008-09',
    },
    {
      title: '23rd Birthday 🎈',
      date: '2009-09',
    },
    {
      title: '24th Birthday 🎁',
      date: '2010-09',
    },
    {
      title: 'Joined PaGaLGuY 💼',
      date: '2011-12',
      description: 'Software Engineer',
    },
    {
      title: '25th Birthday 🎉',
      date: '2011-09',
    },
    {
      title: '26th Birthday 🎊',
      date: '2012-09',
    },
    {
      title: '27th Birthday 🎂',
      date: '2013-09',
    },
    {
      title: '28th Birthday 🎈',
      date: '2014-09',
    },
    {
      title: '29th Birthday 🎁',
      date: '2015-09',
    },
    {
      title: '30th Birthday 🎉',
      date: '2016-09',
    },
    {
      title: '31st Birthday 🎊',
      date: '2017-09',
    },
    {
      title: '32nd Birthday 🎂',
      date: '2018-09',
    },
    {
      title: 'Joined Gojek 💼',
      date: '2019-06',
      description: 'Engineering Manager',
    },
    {
      title: '33rd Birthday 🎈',
      date: '2019-09',
    },
    {
      title: 'Diagnosed with ALS',
      date: '2019-11',
    },
    {
      title: '34th Birthday 🎁',
      date: '2020-09',
    },
    {
      title: 'Promoted to Senior Engineering Manager 🚀',
      date: '2021-06',
      description: 'Gojek',
    },
    {
      title: '35th Birthday 🎉',
      date: '2021-09',
    },
    {
      title: '36th Birthday 🎊',
      date: '2022-09',
    },
    {
      title: '37th Birthday 🎂',
      date: '2023-09',
    },
    {
      title: '38th Birthday 🎈',
      date: '2024-09',
    },
    {
      title: '39th Birthday 🎁',
      date: '2025-09',
    },
  ],
};

export default timeline;
