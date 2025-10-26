import { gapi } from 'gapi-script';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

let gapiInitialized = false;

export const initGoogleCalendar = async () => {
  if (gapiInitialized) return;

  return new Promise<void>((resolve, reject) => {
    gapi.load('client:auth2', async () => {
      try {
        const initConfig: any = {
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        };
        
        // Only add API key if it exists
        if (API_KEY) {
          initConfig.apiKey = API_KEY;
        }
        
        await gapi.client.init(initConfig);
        gapiInitialized = true;
        console.log('Google Calendar API initialized successfully');
        resolve();
      } catch (error) {
        console.error('Error initializing Google Calendar API:', error);
        reject(error);
      }
    });
  });
};

export const signInToGoogle = async () => {
  try {
    await initGoogleCalendar();
    const auth = gapi.auth2.getAuthInstance();
    await auth.signIn();
    return true;
  } catch (error) {
    console.error('Error signing in to Google:', error);
    return false;
  }
};

export const signOutFromGoogle = async () => {
  try {
    const auth = gapi.auth2.getAuthInstance();
    await auth.signOut();
  } catch (error) {
    console.error('Error signing out from Google:', error);
  }
};

export const isSignedIn = () => {
  try {
    const auth = gapi.auth2.getAuthInstance();
    return auth?.isSignedIn.get() || false;
  } catch {
    return false;
  }
};

export interface CalendarEvent {
  id: string;
  summary: string;
  start: string;
  end: string;
  description?: string;
}

export const getCalendarEvents = async (
  calendarId: string = 'primary',
  timeMin?: Date,
  timeMax?: Date
): Promise<CalendarEvent[]> => {
  try {
    await initGoogleCalendar();

    const now = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(now.getDate() + 7);

    const response = await gapi.client.request({
      path: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
      params: {
        timeMin: (timeMin || now).toISOString(),
        timeMax: (timeMax || weekFromNow).toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      },
    });

    const events = response.result.items || [];
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

  // Combine all busy times
  const allBusyTimes = [...myEvents, ...theirEvents].map((event) => ({
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  // Sort by start time
  allBusyTimes.sort((a, b) => a.start.getTime() - b.start.getTime());

  const freeSlots: { start: Date; end: Date; dayName: string; timeString: string }[] = [];

  // Check each day
  for (let day = new Date(now); day <= weekFromNow; day.setDate(day.getDate() + 1)) {
    // Working hours: 9 AM to 8 PM
    const dayStart = new Date(day);
    dayStart.setHours(9, 0, 0, 0);
    const dayEnd = new Date(day);
    dayEnd.setHours(20, 0, 0, 0);

    // Find busy times for this day
    const dayBusyTimes = allBusyTimes.filter(
      (busy) =>
        busy.start.toDateString() === day.toDateString() ||
        busy.end.toDateString() === day.toDateString()
    );

    let currentTime = new Date(dayStart);

    // If no busy times, the whole day is free
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

    // Check gaps between busy times
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

    // Check if there's time after last busy slot
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

  return freeSlots.slice(0, 5); // Return top 5 slots
};
