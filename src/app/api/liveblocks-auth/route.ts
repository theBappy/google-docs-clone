import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

// Define the session claims structure
type SessionClaims = {
  o?: {
    id: string;
    rol: string;
    slg: string;
  };
};

export async function POST(req: Request) {
  // Authenticate the user
  const { sessionClaims } = await auth();

  if (!sessionClaims) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Extract room from request
  const { room } = await req.json();

  // Fetch document from Convex
  const document = await convex.query(api.documents.getById, { id: room });

  if (!document) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Type assertion for session claims
  const claims = sessionClaims as SessionClaims;

  // Access checks
  const isOwner = document.ownerId === user.id;
  const isOrganizationMember = !!(
    document.organizationId && 
    document.organizationId === claims.o?.id
  );

  if (!isOwner && !isOrganizationMember) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Prepare Liveblocks session
  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? 'Anonymous',
      avatar: user.imageUrl,
    },
  });

  // Grant full access to the room
  session.allow(room, session.FULL_ACCESS);

  // Authorize session
  const { body, status } = await session.authorize();

  return new Response(body, { status });
}
