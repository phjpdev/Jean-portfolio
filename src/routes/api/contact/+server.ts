import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  let formData;
  
  try {
    formData = await request.json();
    const { firstName, lastName, email, service, budget, message } = formData;

    // Validate required fields
    if (!firstName || !lastName || !email || !service || !budget || !message) {
      return json({ error: 'All fields are required' }, { status: 400 });
    }

    // Email configuration
    const recipientEmail = 'johncarloskip017@gmail.com';
    const subject = `New Contact Form Submission from ${firstName} ${lastName}`;
    
    // Format the email body as HTML
    const emailBody = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Budget:</strong> ${budget}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><em>This message was sent from your portfolio contact form.</em></p>
    `;

    // Format as plain text
    const textBody = `
New Contact Form Submission

Name: ${firstName} ${lastName}
Email: ${email}
Service: ${service}
Budget: ${budget}

Message:
${message}

---
This message was sent from your portfolio contact form.
    `.trim();

    // Using Formspree (free, reliable, no Cloudflare issues)
    const formspreeEndpoint = 'https://formspree.io/f/mzdpzljy';
    
    const formspreeResponse = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        _subject: subject,
        _to: recipientEmail, // Specify recipient email
        name: `${firstName} ${lastName}`,
        email: email,
        service: service,
        budget: budget,
        message: message,
        _replyto: email,
      })
    });

    const formspreeResult = await formspreeResponse.json();
    console.log('Formspree response:', formspreeResponse.status, formspreeResult);

    if (formspreeResponse.ok) {
      return json({ 
        success: true, 
        message: 'Thank you for your message! I will get back to you soon.' 
      });
    } else {
      console.error('Formspree error:', formspreeResult);
    }

    // If Formspree fails, try alternative: EmailJS via a simple webhook
    // For now, log the email data so you can see submissions
    console.log('=== CONTACT FORM SUBMISSION ===');
    console.log('To:', recipientEmail);
    console.log('Subject:', subject);
    console.log('From:', email);
    console.log('Name:', `${firstName} ${lastName}`);
    console.log('Service:', service);
    console.log('Budget:', budget);
    console.log('Message:', message);
    console.log('==============================');

    // Return success even if email service fails (you'll see it in logs)
    // In production, you should set up a proper email service
    return json({ 
      success: true, 
      message: 'Thank you for your message! I will get back to you soon.' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Log the submission data for debugging
    if (formData) {
      console.log('Failed submission data:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        service: formData.service,
        budget: formData.budget,
        message: formData.message?.substring(0, 100) + '...'
      });
    }
    
    return json({ 
      error: 'Failed to send message. Please try again later or contact me directly at johncarloskip017@gmail.com.' 
    }, { status: 500 });
  }
};

