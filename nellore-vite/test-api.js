
const checkApi = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5001/nellorieans/us-central1/news-getNews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });

        if (response.ok) {
            const data = await response.json();
            console.log('API Connection Successful!');
            console.log('Status:', response.status);
            console.log('Data count:', Array.isArray(data.data) ? data.data.length : 'Unknown structure');
            // console.log('First Item (preview):', data.data ? data.data[0] : data); 
        } else {
            console.log('API Connected but returned error:', response.status, response.statusText);
            const text = await response.text();
            console.log('Response body:', text);
        }
    } catch (error) {
        console.error('API Connection Failed:', error.message);
    }
};

checkApi();
