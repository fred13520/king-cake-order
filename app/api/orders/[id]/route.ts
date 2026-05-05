import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { cake: true, delivery: true, flower: true, payments: true }
  });
  return NextResponse.json(order);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const b = await req.json();
  const order = await prisma.order.update({
    where: { id: params.id },
    data: {
      orderStatus: b.orderStatus,
      paymentStatus: b.paymentStatus,
      internalNote: b.internalNote
    },
    include: { cake: true, delivery: true, flower: true }
  });
  return NextResponse.json(order);
}
