import "./globals.css";

export const metadata = {
  title: "King Cake 订单系统 V1",
  description: "King Cake internal order system"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
