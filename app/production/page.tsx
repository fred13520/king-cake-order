export const dynamic = "force-dynamic";

import Nav from "@/components/Nav";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ProductionPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { cake: true }
  });

  return (
    <>
      <Nav />
      <main className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow p-4">
          <h1 className="text-xl font-bold mb-4">生产单</h1>
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left"><th className="p-2">订单号</th><th>完成时间</th><th>蛋糕</th><th>夹心</th><th>祝福语</th><th>状态</th></tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="border-b">
                  <td className="p-2"><Link className="text-blue-600" href={`/orders/${o.id}`}>{o.orderNumber}</Link></td>
                  <td>{o.deliveryTime}</td>
                  <td>{o.cake?.cakeSize} {o.cake?.cakeColor} {o.cake?.cakeTheme}</td>
                  <td>{o.cake?.filling}</td>
                  <td>{o.cake?.blessingText}</td>
                  <td>{o.cake?.productionStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
