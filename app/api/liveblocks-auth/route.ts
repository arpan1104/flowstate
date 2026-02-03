import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: Request) {
  // 1. You MUST await auth() in Clerk v6
  const { userId } = await auth(); 
  const user = await currentUser();

  if (!userId || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();

  const session = liveblocks.prepareSession(userId, {
    userInfo: {
      name: user.firstName ?? "Anonymous",
      picture: user.imageUrl,
    },
  });

  session.allow(room, session.FULL_ACCESS);

  const { status, body } = await session.authorize();
  return new Response(body, { status });
}