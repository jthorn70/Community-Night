import React, { useState, useEffect } from 'react';
import { Grid } from "@nextui-org/react";


const CountdownClock = ({ targetDate }) => {
    const getTimeRemaining = () => {
        const total = Date.parse(targetDate) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60).toString().padStart(2, '0');
        const minutes = Math.floor((total / 1000 / 60) % 60).toString().padStart(2, '0');
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
        const days = Math.floor(total / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        return {
            total,
            days,
            hours,
            minutes,
            seconds,
        };
    };

    const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(getTimeRemaining());
        }, 1000);
        return () => clearInterval(interval);
    }, [targetDate, getTimeRemaining]);

    useEffect(() => {
        const timerText = document.getElementById('timer-text');
        if (timerText) {
            timerText.textContent = `${timeRemaining.days}:${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`;
        }
    }, [timeRemaining]);

    return (
        <Grid.Container justify='center' gap={2}>
            <Grid justify='center' xs={12}>
                <div id='timer-text' style={{ fontSize: '72px' }}>
                    {timeRemaining.days}:{timeRemaining.hours}:{timeRemaining.minutes}:{timeRemaining.seconds}
                </div>
            </Grid>
        </Grid.Container>
    );
};


export default CountdownClock;
