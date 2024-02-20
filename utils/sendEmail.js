export default async function sendEmail(data) {
    const apiEndpoint = '/api/email';

    const res = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        alert('Failed to send email');
    } else {
        const resData = res.json();
        alert(resData.message);
    }
}