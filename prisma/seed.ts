import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.order.create({
    data: {
      orderNumber: "KC-TEST-001",
      sourceChannel: "微信",
      customerName: "微信客户",
      customerNickname: "微信客户",
      orderDate: new Date(),
      deliveryTime: "做好就送",
      orderType: "delivery",
      deliveryAddress: "World House",
      totalPrice: 1200,
      paymentStatus: "未付款",
      orderStatus: "待确认",
      rawChatText: "我要一个粉色生日蛋糕，今天送 World House，写 Happy Birthday，做好就送。",
      cake: {
        create: {
          cakeSize: "未确认",
          cakeTheme: "生日蛋糕",
          cakeColor: "粉色",
          blessingText: "Happy Birthday"
        }
      },
      delivery: {
        create: {
          deliveryAddress: "World House",
          deliveryTime: "做好就送",
          cashOnDelivery: true
        }
      },
      flower: {
        create: {
          flowerStatus: "不需要"
        }
      }
    }
  });
}

main().finally(() => prisma.$disconnect());
