// api/index.jsx

// Login API માટેનું ફંક્શન
export const loginUser = async (userData) => {
  try {
    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      // જો રિસ્પોન્સ successful ન હોય તો error throw કરો
      throw new Error(data.message || 'Login failed.');
    }

    // successful login પર data (token સહિત) રિટર્ન કરો
    return data;

  } catch (error) {
    // જો કોઈ નેટવર્ક અથવા અન્ય ભૂલ હોય તો throw કરો
    console.error('Error in login API call:', error);
    throw error;
  }
};

// બીજા API કોલ્સ માટે અહીં ફંક્શન્સ ઉમેરી શકાય છે, જેમ કે...
// export const fetchUserData = async (token) => { ... };