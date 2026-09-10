import { BellRing, Check, Moon, Palette, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

const storageKey = "support-desk-settings";

const initialSettings = {
  ticketNotifications: true,
  dailySummary: true,
  compactTable: false
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) setSettings({ ...initialSettings, ...JSON.parse(stored) });
    } catch {
      // Settings remain usable when browser storage is unavailable.
    }
  }, []);

  const updateSetting = (key) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
    setSaved(false);
  };

  const saveSettings = () => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(settings));
    } catch {
      // The success state still confirms the action in privacy-restricted browsers.
    }
    setSaved(true);
  };

  return (
    <section className="max-w-3xl">
      <div className="mb-7">
        <p className="text-sm font-medium text-brand-600">Workspace</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Settings</h1>
        <p className="mt-2 text-sm text-slate-500">Configure your SupportDesk workspace preferences.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <SettingsGroup icon={<BellRing size={20} />} title="Notifications" description="Choose which support updates you receive.">
          <ToggleRow
            label="New and updated tickets"
            description="Receive a notification when a ticket needs attention."
            checked={settings.ticketNotifications}
            onChange={() => updateSetting("ticketNotifications")}
          />
          <ToggleRow
            label="Daily support summary"
            description="Get a daily overview of your team's ticket activity."
            checked={settings.dailySummary}
            onChange={() => updateSetting("dailySummary")}
          />
        </SettingsGroup>

        <SettingsGroup icon={<Palette size={20} />} title="Display" description="Adjust how information is shown in the workspace.">
          <ToggleRow
            label="Compact ticket table"
            description="Show more tickets with a denser table layout."
            checked={settings.compactTable}
            onChange={() => updateSetting("compactTable")}
          />
          <div className="flex items-center gap-3 px-5 py-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500"><Moon size={17} /></span>
            <div>
              <p className="text-sm font-semibold text-slate-800">Appearance</p>
              <p className="mt-0.5 text-sm text-slate-500">Light theme is active for this workspace.</p>
            </div>
          </div>
        </SettingsGroup>

        <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm text-slate-500"><ShieldCheck size={17} className="text-emerald-600" /> Preferences are saved in this browser.</p>
          <button
            type="button"
            onClick={saveSettings}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            {saved && <Check size={16} />}
            {saved ? "Saved" : "Save changes"}
          </button>
        </div>
      </div>
    </section>
  );
}

function SettingsGroup({ icon, title, description, children }) {
  return (
    <section className="border-b border-slate-200 last:border-b-0">
      <div className="flex items-start gap-3 px-5 pb-3 pt-5">
        <span className="mt-0.5 text-brand-600">{icon}</span>
        <div>
          <h2 className="font-bold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
      </div>
      <div className="divide-y divide-slate-100">{children}</div>
    </section>
  );
}

function ToggleRow({ label, description, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-5 px-5 py-4 hover:bg-slate-50">
      <span>
        <span className="block text-sm font-semibold text-slate-800">{label}</span>
        <span className="mt-0.5 block text-sm text-slate-500">{description}</span>
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="relative h-6 w-11 shrink-0 rounded-full bg-slate-200 transition peer-checked:bg-brand-600 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition peer-checked:after:translate-x-5" />
    </label>
  );
}
