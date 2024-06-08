
export function formatEmail(content: string) {
    return content.replace(/\n+/g, '\n')  // Remove consecutive empty lines
        .replace(/(\r\n|\r|\n)/g, '\n')  // Normalize line breaks
        .replace(/(.{8,})/g, '$1\n'); // Add line break if line exceeds 8 characters
}

export function separateHTMLandText(body: any) {
    const htmlIndex = body.indexOf('<!DOCTYPE html PUBLIC');
    const text = htmlIndex !== -1 ? body.slice(0, htmlIndex) : body;
    const html = htmlIndex !== -1 ? body.slice(htmlIndex) : '';
    return { text, html };
}