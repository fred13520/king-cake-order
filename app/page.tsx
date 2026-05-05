import Nav from "@/components/Nav";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow p-6">
          <h1 className="text-2xl font-bold mb-3">King Cake 订单管理系统 V1</h1>
          <p className="mb-6 text-gray-600">第一版用于客服录入、AI解析、订单确认、生产和配送。</p>
          <div className="grid md:grid-cols-4 gap-3">
            <Link className="p-4 rounded-xl border bg-gray-50" href="/orders/new">录入订单</Link>
            <Link className="p-4 rounded-xl border bg-gray-50" href="/orders">订单列表</Link>
            <Link className="p-4 rounded-xl border bg-gray-50" href="/production">生产单</Link>
            <Link className="p-4 rounded-xl border bg-gray-50" href="/delivery">配送单</Link>
          </div>
        </div>
      </main>
    </>
  );
}
