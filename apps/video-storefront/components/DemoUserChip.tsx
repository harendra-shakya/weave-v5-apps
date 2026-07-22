"use client";

import { useEffect, useState } from "react";

/**
 * DemoUserChip — synthetic session: pick a demo patron, nothing more.
 * No password, no sign-up, no credentials (ATM-417 boundary). Payment stays
 * guest checkout; this only personalises access/refund surfaces.
 */

const DEMO_USERS = ["Ada Osei", "Theo Marchetti", "Ren Ishikawa"];
const STORAGE_KEY = "onereel.demoUser";

export function DemoUserChip() {
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(window.localStorage.getItem(STORAGE_KEY) ?? "");
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setUser(e.target.value);
    window.localStorage.setItem(STORAGE_KEY, e.target.value);
  }

  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-full border border-or-line bg-or-paper py-1.5 pl-3 pr-2 font-sans text-sm font-medium text-or-ink">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-or-ember" />
      <span className="sr-only">Demo patron</span>
      <select
        value={user}
        onChange={handleChange}
        className="cursor-pointer bg-transparent pr-1 focus:outline-none"
      >
        <option value="">Guest patron</option>
        {DEMO_USERS.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
}
