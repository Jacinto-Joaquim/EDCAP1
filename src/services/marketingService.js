
    import { getSupabase } from '@/config/supabaseClient.jsx';

    const supabase = getSupabase();

    const MAILCHIMP_API_URL = 'https://us4.api.mailchimp.com/3.0/lists/e9300fffe1/members';
    const MAILCHIMP_API_KEY = '2084a5bc29a448babd2a4d9e192a6855-us4';
    const MAILCHIMP_LIST_ID = 'e9300fffe1'; // Embora já esteja na URL, pode ser útil para outras chamadas

    export const subscribeToMailchimp = async (email, firstName, lastName) => {
      if (!MAILCHIMP_API_URL || !MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID) {
        console.warn('Mailchimp API credentials or List ID not configured. Skipping.');
        return { success: false, error: 'Mailchimp API credentials or List ID not configured.' };
      }

      const payload = {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName || '',
          LNAME: lastName || '',
        },
      };
      
      const serverAndApiKey = MAILCHIMP_API_KEY.split('-');
      const server = serverAndApiKey[1]; // e.g. "us4"
      const apiKey = serverAndApiKey[0]; // the actual key part

      const fullApiUrl = `https://${server}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;


      try {
        const response = await fetch(fullApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `apikey ${MAILCHIMP_API_KEY}`, // Mailchimp usa 'apikey YOUR_API_KEY' ou 'Basic base64(any_string:YOUR_API_KEY)'
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error sending data to Mailchimp API:', errorData);
          let errorMessage = 'Falha ao inscrever na newsletter.';
          if (errorData.title === "Member Exists") {
            errorMessage = "Este email já está inscrito.";
          } else if (errorData.detail) {
            errorMessage = errorData.detail;
          }
          return { success: false, error: errorMessage };
        }

        const data = await response.json();
        console.log('Successfully subscribed user to Mailchimp list:', data);
        return { success: true, data };

      } catch (error) {
        console.error('Network or other error in subscribeToMailchimp:', error);
        return { success: false, error: error.message || 'Ocorreu um erro inesperado.' };
      }
    };
  