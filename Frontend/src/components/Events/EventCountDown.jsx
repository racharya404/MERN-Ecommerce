import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";

const EventCountDown = ({ data }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(data.Finish_Date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);

    if (!Object.values(timeLeft).some(val => val !== undefined && val > 0)) {
      axios.delete(`${server}/event/delete-shop-event/${data._id}`);
    }

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.entries(timeLeft).map(([interval, value]) =>
    !value ? null : (
      <span key={interval} className="text-[11px] text-[#475ad2]">
        {value} {interval}{" "} left
      </span>
    )
  );

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">Time's Up</span>
      )}
    </div>
  );
};

export default EventCountDown;
