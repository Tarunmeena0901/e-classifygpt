import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { NEXT_AUTH } from '@/app/config/auth';


export async function GET(req: NextApiRequest) {
  const session = await getServerSession(NEXT_AUTH);

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { accessToken } = session.user;

  const oAuth2Client = new google.auth.OAuth2();
  oAuth2Client.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

  try {

    const response = await gmail.users.messages.list({
      userId: 'me',
      q: 'from:twitter.com',
      maxResults: 2,
    });

    const messages = response.data.messages || [];

    const emailDetails = await Promise.all(
      messages.map(async (message) => {
        const msg = await gmail.users.messages.get({
          userId: 'me',
          id: message.id,
        });
        const headers = msg.data.payload.headers;
        const subjectHeader = headers.find(header => header.name === 'Subject');
        const subject = subjectHeader ? subjectHeader.value : 'No Subject';
        return { id: message.id, subject };
      })
    );

    return NextResponse.json({ emailDetails }, { status: 200 });
  } catch (error) {
    console.error('Error fetching emails', error);
    return NextResponse.json({ error: 'Failed to fetch emails' }, { status: 500 });
  }
}