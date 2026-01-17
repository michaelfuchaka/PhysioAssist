const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function getCurrentUser(){
    const token = localStorage.getItem('access_token');
    if (!token) {
        return null;
    }
    const response = await fetch(`${API_BASE_URL}/api/auth/me`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    
    if(!response.ok){
        return null;
      }
 
     const data = await response.json();
    return data.user;    
   
}

// login 
 export async function login(email, password){
    const response = await fetch(`${API_BASE_URL}/api/auth/login`,{
        method: 'POST',
        headers:{
              'Content-Type': 'application/json',
        },

        body: JSON.stringify({ email, password }),
    });

    if(!response.ok){
         const error = await response.json();
        throw new Error(error.error || 'Login failed');
    }
    const data = await response.json();
    localStorage.setItem('access_token', data.token);
    return data;
    }

    // Register Fn
export async function register (fullname, email, password, gender=null){
    const response =  await fetch(`${API_BASE_URL}/api/auth/register`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullname, email, password, gender }),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Registration failed');
    }

    const data = await response.json();
    localStorage.setItem('access_token', data.token);
    return data;
}

// logout
export async function logout() {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
        },
    });

    localStorage.removeItem('access_token');
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Logout failed');
    }

    const data = await response.json();
    return data;
}

// Get user cases stats
export async function getUserStats() {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_BASE_URL}/api/cases/stats`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
}

// Analyze symptoms
export async function analyzeSymptoms(formData) {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_BASE_URL}/api/cases/analyze`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Analysis failed');
    }
    
    return response.json();
}

// Save draft
export async function saveDraft(formData) {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_BASE_URL}/api/cases/draft`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save draft');
    }
    
    return response.json();
}

// Get case by ID
export async function getCaseById(caseId) {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_BASE_URL}/api/cases/${caseId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    
    if (!response.ok) throw new Error('Case not found');
    return response.json();
}

export async function updateCaseConditions(caseId, selections) {
  const token = localStorage.getItem('access_token');
  const response = await fetch(`${API_BASE_URL}/api/cases/${caseId}/conditions`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(selections),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update conditions');
  }
  
  return response.json();
}

// get history cases
export async function getCaseHistory(){
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('Not authenticated');
    const response = await fetch(`${API_BASE_URL}/api/cases/history`,{
        headers:{
        'Authorization': `Bearer ${token}`,
        },
    });

    if(!response.ok){
        const error = await response.json();
        throw new Error (error.error || 'Failed to fetch case history');
    }

    return response.json();
    } 

    // get drafts cases
export async function getDraftCases(){
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('Not authenticated');
    const response = await fetch(`${API_BASE_URL}/api/cases/drafts`,{
        headers:{
        'Authorization': `Bearer ${token}`,
        },
    });

    if(!response.ok){
        const error = await response.json();
        throw new Error (error.error || 'Failed to fetch draft cases');
    }

    return response.json();
    }

//    delete draft
export async function deleteDraft(draft_id){
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_BASE_URL}/api/cases/draft/${draft_id}`,
        {
            method: 'DELETE',
            headers:{
                  'Authorization': `Bearer ${token}`,
            },
        });
      if(!response.ok){
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete draft');
      }  
     return response.json();  
}
