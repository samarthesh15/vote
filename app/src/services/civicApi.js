const CIVIC_API_KEY = import.meta.env.VITE_GOOGLE_CIVIC_API_KEY;

export const fetchVoterInfo = async (address) => {
  if (!CIVIC_API_KEY) {
    console.warn('Mocking Civic API Data: No API Key provided in .env');
    return mockVoterInfo();
  }

  try {
    const response = await fetch(`https://www.googleapis.com/civicinfo/v2/voterinfo?address=${encodeURIComponent(address)}&key=${CIVIC_API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch civic data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching voter info:', error);
    return null;
  }
};

const mockVoterInfo = () => {
  return {
    election: {
      name: "Mock General Election",
      electionDay: "2026-11-03"
    },
    pollingLocations: [
      {
        address: {
          locationName: "Community Center",
          line1: "123 Main St",
          city: "Anytown",
          state: "CA",
          zip: "12345"
        },
        pollingHours: "7:00 AM - 8:00 PM"
      }
    ]
  };
};
