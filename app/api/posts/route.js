import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await prisma.post.findMany({
      where: { authorId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Get posts error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content } = await request.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content: content || "",
        authorId: session.user.id,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
