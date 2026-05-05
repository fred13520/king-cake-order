import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function orderNumber() {
  const d = new Date();
  const ymd = d.toISOString().slice(0, 10).replaceAll("-", "");
  return `KC-${ymd}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export async function GET() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { cake: true, delivery: true, flower: true }
  });
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const b = await req.json();

  const order = await prisma.order.create({
    data: {
      orderNumber: orderNumber(),
      sourceChannel: b.sourceChannel,
      customerName: b.customerName || b.customerNickname || "未命名客户",
      customerNickname: b.customerNickname,
      customerPhone: b.customerPhone,
      orderDate: b.orderDate ? new Date(b.orderDate) : null,
      deliveryTime: b.deliveryTime || "做好就送",
      orderType: b.orderType || "delivery",
      deliveryAddress: b.deliveryAddress,
      pickupStore: b.pickupStore,
      totalPrice: b.totalPrice ? Number(b.totalPrice) : null,
      paymentStatus: b.paymentStatus || "未付款",
      paymentMethod: b.paymentMethod,
      orderStatus: b.orderStatus || "待确认",
      rawChatText: b.rawChatText || "",
      internalNote: b.internalNote,
      cake: {
        create: {
          cakeSize: b.cakeSize,
          cakeWeightLb: b.cakeWeightLb ? Number(b.cakeWeightLb) : null,
          cakeShape: b.cakeShape,
          cakeTheme: b.cakeTheme,
          cakeColor: b.cakeColor,
          creamType: b.creamType,
          filling: b.filling || "新鲜芒果 + 新鲜火龙果",
          cakeFlavor: b.cakeFlavor,
          blessingText: b.blessingText,
          candle: b.candle || "默认赠送",
          birthdaySet: b.birthdaySet || "默认赠送",
          specialRequest: b.specialRequest
        }
      },
      flower: {
        create: {
          flowerStatus: b.flowerRequired ? "需要" : "不需要"
        }
      },
      delivery: {
        create: {
          deliveryDate: b.orderDate ? new Date(b.orderDate) : null,
          deliveryTime: b.deliveryTime || "做好就送",
          deliveryAddress: b.deliveryAddress,
          deliveryStatus: "待配送",
          cashOnDelivery: b.paymentStatus !== "已转账"
        }
      }
    },
    include: { cake: true, delivery: true, flower: true }
  });

  return NextResponse.json(order);
}
