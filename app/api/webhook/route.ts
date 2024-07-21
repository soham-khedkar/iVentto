import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions'
import { clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {

  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Missing svix headers');
    return new Response('Error occurred -- no svix headers', {
      status: 400
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400
    })
  }

  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Received event: ${eventType}`);

  if(eventType === 'user.created') {
    const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

    console.log('User created data:', evt.data);

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username!,
      firstName: first_name || '',
      lastName: last_name || '',
      photo: image_url,
    }

    try {
      const newUser = await createUser(user);

      if(newUser) {
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: newUser._id
          }
        })
      }

      return NextResponse.json({ message: 'OK', user: newUser })
    } catch (error) {
      console.error('Error creating user:', error);
      return new Response('Error occurred while creating user', { status: 500 })
    }
  }

  if (eventType === 'user.updated') {
    const { id, image_url, first_name, last_name, username } = evt.data;

    console.log('User updated data:', evt.data);

    const user = {
      firstName: first_name || '',
      lastName: last_name || '',
      username: username!,
      photo: image_url,
    }

    try {
      const updatedUser = await updateUser(id, user);

      return NextResponse.json({ message: 'OK', user: updatedUser })
    } catch (error) {
      console.error('Error updating user:', error);
      return new Response('Error occurred while updating user', { status: 500 })
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;

    console.log('User deleted data:', evt.data);

    try {
      const deletedUser = await deleteUser(id!);

      return NextResponse.json({ message: 'OK', user: deletedUser })
    } catch (error) {
      console.error('Error deleting user:', error);
      return new Response('Error occurred while deleting user', { status: 500 })
    }
  }

  return new Response('', { status: 200 })
}
