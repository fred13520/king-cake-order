import Nav from "@/components/Nav";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { cake: true, delivery: true }
  });

  return (
    <>
      <Nav />
      <main className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow p-4">
          <h1 className="text-xl font-bold mb-4">订单列表</h1>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b text-left">
                <th className="p-2">订单号</th><th>客户</th><th>时间</th><th>蛋糕</th><th>地址</th><th>金额</th><th>付款</th><th>状态</th>
              </tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} className="border-b">
                    <td className="p-2"><Link className="text-blue-600" href={`/orders/${o.id}`}>{o.orderNumber}</Link></td>
                    <td>{o.customerName}</td>
                    <td>{o.deliveryTime}</td>
                    <td>{o.cake?.cakeSize} {o.cake?.cakeColor} {o.cake?.cakeTheme}</td>
                    <td>{o.deliveryAddress}</td>
                    <td>{o.totalPrice || "-"}</td>
                    <td>{o.paymentStatus}</td>
                    <td>{o.orderStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
