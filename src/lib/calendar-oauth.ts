// Using @react-oauth/google for better OAuth handling

export interface CalendarEvent {
  id: string;
  summary: string;
  start: string;
  end: string;
  description?: string;
}

let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const getCalendarEventsOAuth = async (
  calendarId: string = 'primary'
): Promise<CalendarEvent[]> => {
  if (!accessToken) {
    console.error('Not authenticated');
    return [];
  }

  try {
    const now = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(now.getDate() + 7);

    const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`);
    url.searchParams.set('timeMin', now.toISOString());
    url.searchParams.set('timeMax', weekFromNow.toISOString());
    url.searchParams.set('singleEvents', 'true');
    url.searchParams.set('orderBy', 'startTime');

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.error(`Calendar API error: ${response.status}`);
      return [];
    }

    const data = await response.json();
    const events = data.items || [];

    return events.map((event: any) => ({
      id: event.id,
      summary: event.summary || 'Busy',
      start: event.start.dateTime || event.start.date,
      end: event.end.dateTime || event.end.date,
      description: event.description,
    }));
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return [];
  }
};

export const findCommonFreeSlots = (
  myEvents: CalendarEvent[],
  theirEvents: CalendarEvent[],
  durationMinutes: number = 60
): { start: Date; end: Date; dayName: string; timeString: string }[] => {
  const now = new Date();
  const weekFromNow = new Date();
  weekFromNow.setDate(now.getDate() + 7);

  const allBusyTimes = [...myEvents, ...theirEvents].map((event) => ({
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  allBusyTimes.sort((a, b) => a.start.getTime() - b.start.getTime());

  const freeSlots: { start: Date; end: Date; dayName: string; timeString: string }[] = [];

  for (let day = new Date(now); day <= weekFromNow; day.setDate(day.getDate() + 1)) {
    const dayStart = new Date(day);
    dayStart.setHours(9, 0, 0, 0);
    const dayEnd = new Date(day);
    dayEnd.setHours(20, 0, 0, 0);

    const dayBusyTimes = allBusyTimes.filter(
      (busy) =>
        busy.start.toDateString() === day.toDateString() ||
        busy.end.toDateString() === day.toDateString()
    );

    let currentTime = new Date(dayStart);

    if (dayBusyTimes.length === 0) {
      const slotEnd = new Date(currentTime);
      slotEnd.setMinutes(slotEnd.getMinutes() + durationMinutes);
      
      if (slotEnd <= dayEnd) {
        freeSlots.push({
          start: new Date(currentTime),
          end: slotEnd,
          dayName: currentTime.toLocaleDateString('en-US', { weekday: 'long' }),
          timeString: currentTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }),
        });
      }
      continue;
    }

    for (const busy of dayBusyTimes) {
      if (busy.start > currentTime) {
        const gapDuration = (busy.start.getTime() - currentTime.getTime()) / (1000 * 60);
        if (gapDuration >= durationMinutes) {
          freeSlots.push({
            start: new Date(currentTime),
            end: new Date(busy.start),
            dayName: currentTime.toLocaleDateString('en-US', { weekday: 'long' }),
            timeString: currentTime.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            }),
          });
        }
      }
      currentTime = new Date(Math.max(currentTime.getTime(), busy.end.getTime()));
    }

    if (currentTime < dayEnd) {
      const remainingDuration = (dayEnd.getTime() - currentTime.getTime()) / (1000 * 60);
      if (remainingDuration >= durationMinutes) {
        freeSlots.push({
          start: new Date(currentTime),
          end: dayEnd,
          dayName: currentTime.toLocaleDateString('en-US', { weekday: 'long' }),
          timeString: currentTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }),
        });
      }
    }
  }

  return freeSlots.slice(0, 5);
};
