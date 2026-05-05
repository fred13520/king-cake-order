"use client";

import Nav from "@/components/Nav";
import { useState } from "react";

export default function NewOrderPage() {
  const [rawChatText, setRawChatText] = useState("");
  const [sourceChannel, setSourceChannel] = useState("微信");
  const [customerNickname, setCustomerNickname] = useState("");
  const [form, setForm] = useState<any>({});
  const [saved, setSaved] = useState<any>(null);

  async function parse() {
    const res = await fetch("/api/parse", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ rawChatText, customerNickname })
    });
    const data = await res.json();
    setForm({ ...data, rawChatText, sourceChannel, customerNickname });
  }

  async function save() {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form)
    });
    setSaved(await res.json());
  }

  const field = (key: string, label: string) => (
    <label className="block">
      <span className="text-sm text-gray-600">{label}</span>
      <input className="mt-1 w-full border rounded-lg p-2" value={form[key] || ""} onChange={e => setForm({...form, [key]: e.target.value})} />
    </label>
  );

  return (
    <>
      <Nav />
      <main className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-4">
        <section className="bg-white rounded-2xl shadow p-4">
          <h1 className="text-xl font-bold mb-4">订单录入</h1>
          <label className="block mb-3">
            <span className="text-sm text-gray-600">客户来源</span>
            <select className="mt-1 w-full border rounded-lg p-2" value={sourceChannel} onChange={e => setSourceChannel(e.target.value)}>
              <option>微信</option><option>LINE</option><option>Facebook</option><option>门店</option>
            </select>
          </label>
          <label className="block mb-3">
            <span className="text-sm text-gray-600">客户昵称</span>
            <input className="mt-1 w-full border rounded-lg p-2" value={customerNickname} onChange={e => setCustomerNickname(e.target.value)} />
          </label>
          <label className="block">
            <span className="text-sm text-gray-600">客户聊天内容</span>
            <textarea className="mt-1 w-full border rounded-lg p-2 h-52" value={rawChatText} onChange={e => setRawChatText(e.target.value)} />
          </label>
          <button onClick={parse} className="mt-4 w-full bg-black text-white rounded-xl p-3">AI解析订单</button>
        </section>

        <section className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-xl font-bold mb-4">解析结果</h2>
          <div className="grid grid-cols-2 gap-3">
            {field("customerName", "客户姓名")}
            {field("customerPhone", "联系电话")}
            {field("deliveryTime", "送货时间")}
            {field("deliveryAddress", "配送地址")}
            {field("cakeSize", "蛋糕尺寸")}
            {field("cakeTheme", "蛋糕主题")}
            {field("cakeColor", "蛋糕颜色")}
            {field("filling", "夹心")}
            {field("blessingText", "祝福语")}
            {field("totalPrice", "价格")}
            {field("paymentStatus", "付款状态")}
          </div>

          {form.missingFields?.length > 0 && (
            <div className="mt-4 p-3 rounded-lg bg-yellow-50 text-sm">
              缺失字段：{form.missingFields.join("、")}
            </div>
          )}
          {form.riskNotes?.length > 0 && (
            <div className="mt-2 p-3 rounded-lg bg-red-50 text-sm">
              风险提示：{form.riskNotes.join("、")}
            </div>
          )}

          <button onClick={save} className="mt-4 w-full bg-green-600 text-white rounded-xl p-3">确认并保存订单</button>
          {saved && <p className="mt-3 text-green-700">已保存：{saved.orderNumber}</p>}
        </section>
      </main>
    </>
  );
}
