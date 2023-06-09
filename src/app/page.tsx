"use client";

import React, { useState, useEffect } from "react";
import { Howl } from "howler";

const sound = new Howl({
  src: ["./finalCountdownCropped2.mp3"],
});

export default function Home() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isStarting, setIsStarting] = useState(false);

  const timeRuler = () => {
    if (seconds === 59) {
      setMinutes((minutes) => minutes + 1);
      setSeconds(0);
    } else {
      setSeconds((seconds) => seconds + 1);
    }
  };

  //why useffect : to synchronize the incrementation of time (sec and min) with timer state
  //by using an interval which execute a function each second
  //beware of cleaning the interval when time stopped or paused
  useEffect(() => {
    let interv = null;

    if (isStarting) {
      interv = setInterval(() => timeRuler(), 1000);
    }

    return () => clearInterval(interv);
  }, [isStarting, minutes, seconds]);

  const handleStart = () => {
    setIsStarting(true);
    sound.play();
  };

  const handlePause = () => {
    setIsStarting(false);
    sound.pause();
  };

  const handleReset = () => {
    setMinutes(0);
    setSeconds(0);
    setIsStarting(false);
    sound.stop();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 font-mono">
      <div className="z-10 w-full max-w-5xl items-center justify-between  text-sm lg:flex">
        <p>It's a final countdown</p>
      </div>
      <div className=" mt-[50px] ml-[70px] ">
        <p>
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </p>
      </div>
      <div className="relative flex mt-[50px] mb-[50px]">
        <button
          onClick={handleStart}
          className={`absolute top-1 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 border border-blue-700 rounded ${
            isStarting ? "opacity-50 cursor-none" : ""
          }`}
        >
          START
        </button>

        <button
          onClick={handlePause}
          className="absolute top-12 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        >
          PAUSE
        </button>
        <button
          onClick={handleReset}
          className="absolute bottom-0 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        >
          RESET
        </button>
      </div>
      <div className="mt-[50px] text-sm">
        <p>
          Enjoy this stressing render to a{" "}
          <strong>massively stressing technical test</strong>, which consists on
          coding a timer <strong>under countdown</strong>. My weak skills and my
          absence of self-confidence suffered from the pression of time, so, if
          I had more time, I would have :
        </p>
        <ul>
          <li>
            - rebuilt the UI of the test : this view is disgustingly graphic.
            But am I marked on the appearance ? On the logic ? Both ? - 15
            minutes
          </li>
          <li>
            - organized my component differently : to make it more reusable for
            example - 10 minutes
          </li>
          <li>
            - created an atomic architecture, to make component more readable
            among many other good practice reasons - 10 minutes
          </li>
          <li>
            - which would have implied a refacto thinking, for performance
            purpose (a countdown needs to be accurate doesn't it ?) - 10 minutes
          </li>
          <li>
            - declared type props, in order to respect TypeScript convention and
            avoid compilation fails - 10 minutes
          </li>
          <li>- maked this version responsive ! - 15 minutes </li>
          <li>- and other stuff - ? minutes</li>
        </ul>
        <p>
          <strong>
            See : these elementary practice respect would have added at least 70
            minutes - 1 hour + 1/2 - to my timered technical test. So does the
            concept of timered technical test make any sense ?
          </strong>
        </p>
        <p>BTW, enjoy the music :)</p>
      </div>
    </main>
  );
}
