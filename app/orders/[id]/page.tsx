import Nav from "@/components/Nav";
import { prisma } from "@/lib/prisma";

export default async function OrderDetail({ params }: { params: { id: string } }) {
  const o = await prisma.order.findUnique({
    where: { id: params.id },
    include: { cake: true, delivery: true, flower: true, payments: true }
  });

  if (!o) return <div>订单不存在</div>;

  return (
    <>
      <Nav />
      <main className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow p-5 space-y-4">
          <h1 className="text-2xl font-bold">订单详情：{o.orderNumber}</h1>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <Info k="客户" v={o.customerName} />
            <Info k="电话" v={o.customerPhone} />
            <Info k="来源" v={o.sourceChannel} />
            <Info k="配送时间" v={o.deliveryTime} />
            <Info k="地址" v={o.deliveryAddress} />
            <Info k="金额" v={String(o.totalPrice || "-")} />
            <Info k="付款状态" v={o.paymentStatus} />
            <Info k="订单状态" v={o.orderStatus} />
            <Info k="蛋糕尺寸" v={o.cake?.cakeSize} />
            <Info k="蛋糕主题" v={o.cake?.cakeTheme} />
            <Info k="蛋糕颜色" v={o.cake?.cakeColor} />
            <Info k="夹心" v={o.cake?.filling} />
            <Info k="祝福语" v={o.cake?.blessingText} />
            <Info k="生产状态" v={o.cake?.productionStatus} />
            <Info k="配送状态" v={o.delivery?.deliveryStatus} />
            <Info k="鲜花" v={o.flower?.flowerStatus} />
          </div>
          <div>
            <h2 className="font-bold mb-2">原始聊天记录</h2>
            <pre className="whitespace-pre-wrap bg-gray-50 rounded-xl p-3 text-sm">{o.rawChatText}</pre>
          </div>
        </div>
      </main>
    </>
  );
}

function Info({ k, v }: { k: string; v: any }) {
  return <div className="border rounded-xl p-3"><span className="text-gray-500">{k}：</span>{v || "-"}</div>
}
