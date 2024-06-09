

//separateHTMLandTEXT function takes the extracted email body and separate
// the html parts and plain text part so we can pass the gpt model plain text
// for classication and we can use the html body in the frontend

export function separateHTMLandText(body: string) {
    const htmlIndex = body.indexOf('<!DOCTYPE html PUBLIC');
    const text = htmlIndex !== -1 ? body.slice(0, htmlIndex) : body;
    const html = htmlIndex !== -1 ? body.slice(htmlIndex) : '';
    return { text, html };
}


//formatEmail function take the separated plain text from the email body 
//and convert it a readable format by adding proper line breaks and indentation

export function formatEmail(content: string) {
    return content.replace(/\n+/g, '\n')  // Remove consecutive empty lines
        .replace(/(\r\n|\r|\n)/g, '\n')  // Normalize line breaks
        .replace(/(.{8,})/g, '$1\n'); // Add line break if line exceeds 8 characters
}

export function stripHTMLAndCSS(text) {
    // Remove HTML tags
    text = text.replace(/<\/?[^>]+(>|$)/g, "");
    // Remove CSS (style tags and inline styles)
    text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
    text = text.replace(/<[^>]+style="[^"]*"[^>]*>/gi, "");

    return text;
}
