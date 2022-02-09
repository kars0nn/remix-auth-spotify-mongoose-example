import { Outlet } from "remix";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>remix-spotify-auth + MongoDB example</h1>
      <br />
      <div>
        <Outlet />    {/* Outlet children pages */}
      </div>
    </div>
  );
}
