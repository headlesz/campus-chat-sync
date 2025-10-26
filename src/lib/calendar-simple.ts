// Simpler Google Calendar integration using direct API calls

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

let accessToken: string | null = null;

export const signInToGoogleSimple = async (): Promise<boolean> => {
  try {
    // Use Google's OAuth 2.0 endpoint
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', CLIENT_ID);
    authUrl.searchParams.set('redirect_uri', window.location.origin);
    authUrl.searchParams.set('response_type', 'token');
    authUrl.searchParams.set('scope', SCOPES);
    authUrl.searchParams.set('include_granted_scopes', 'true');
    authUrl.searchParams.set('state', 'calendar_auth');

    // Open popup for authentication
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      authUrl.toString(),
      'Google Sign In',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    // Wait for the popup to complete
    return new Promise((resolve) => {
      const checkPopup = setInterval(() => {
        try {
          if (popup?.closed) {
            clearInterval(checkPopup);
            resolve(!!accessToken);
          }

          // Check if we got redirected back with token
          if (popup?.location.href.includes('access_token')) {
            const hash = popup.location.hash.substring(1);
            const params = new URLSearchParams(hash);
            const token = params.get('access_token');
            
            if (token) {
              accessToken = token;
              popup.close();
              clearInterval(checkPopup);
              resolve(true);
            }
          }
        } catch (e) {
          // Cross-origin error - popup still on Google domain
        }
      }, 500);

      // Timeout after 2 minutes
      setTimeout(() => {
        clearInterval(checkPopup);
        popup?.close();
        resolve(false);
      }, 120000);
    });
  } catch (error) {
    console.error('Sign in error:', error);
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

export const getCalendarEventsSimple = async (
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
      throw new Error(`Calendar API error: ${response.status}`);
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

export const isSignedInSimple = () => !!accessToken;
