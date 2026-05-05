import Link from "next/link";

export default function Nav() {
  return (
    <div className="sticky top-0 z-10 bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex gap-4 items-center">
        <Link href="/" className="font-bold text-xl">King Cake 订单系统 V1</Link>
        <Link href="/orders/new" className="text-sm">录入订单</Link>
        <Link href="/orders" className="text-sm">订单列表</Link>
        <Link href="/production" className="text-sm">生产单</Link>
        <Link href="/delivery" className="text-sm">配送单</Link>
      </div>
    </div>
  );
}
