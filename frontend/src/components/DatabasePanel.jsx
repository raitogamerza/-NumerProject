import { useEffect, useState } from "react";
import { problemService, historyService } from "../services";

const formatValue = (v) => {
  if (typeof v === "number") return Number.isFinite(v) ? Number(v.toFixed(6)) : String(v);
  if (Array.isArray(v)) return `[${v.map(formatValue).join(", ")}]`;
  return String(v);
};

const formatOutput = (output) =>
  output && typeof output === "object"
    ? Object.entries(output)
        .filter(([, v]) => v !== null && v !== undefined)
        .map(([k, v]) => `${k}: ${formatValue(v)}`)
        .join(" | ")
    : "-";

// ปุ่มเชื่อมฐานข้อมูลที่ใช้ร่วมกันทุกหน้า: โหลดโจทย์ตัวอย่าง, บันทึกโจทย์, ดู/โหลดประวัติการคำนวณ
function DatabasePanel({ methodName, getInput, onLoad, historyVersion = 0 }) {
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(null);

  const refreshHistory = async () => {
    try {
      setHistory(await historyService.recent(methodName));
    } catch (err) {
      console.warn("โหลดประวัติไม่สำเร็จ:", err.message);
    }
  };

  useEffect(() => {
    if (showHistory) refreshHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showHistory, historyVersion, methodName]);

  const withBusy = (fn) => async () => {
    setBusy(true);
    try {
      await fn();
    } catch (err) {
      setStatus({ ok: false, text: err.message });
    } finally {
      setBusy(false);
    }
  };

  const handleExample = withBusy(async () => {
    const problem = await problemService.random(methodName);
    onLoad(problem.input);
    setStatus({ ok: true, text: "โหลดโจทย์ตัวอย่างแล้ว" });
  });

  const handleSave = withBusy(async () => {
    await problemService.save(methodName, getInput(), title.trim());
    setSaving(false);
    setTitle("");
    setStatus({ ok: true, text: "บันทึกโจทย์ลงฐานข้อมูลแล้ว" });
  });

  const handleDelete = (id) =>
    withBusy(async () => {
      await historyService.remove(id);
      await refreshHistory();
    })();

  const handleClear = withBusy(async () => {
    if (!confirm(`ลบประวัติทั้งหมดของ ${methodName}?`)) return;
    await historyService.clear(methodName);
    await refreshHistory();
  });

  return (
    <div className="inline-block align-top">
      <div className="flex flex-wrap justify-center">
        <button
          onClick={handleExample}
          disabled={busy}
          className="bg-emerald-500 text-white px-4 py-2 m-2 rounded disabled:opacity-50"
        >
          Example
        </button>
        <button
          onClick={() => setSaving((v) => !v)}
          disabled={busy}
          className="bg-amber-500 text-white px-4 py-2 m-2 rounded disabled:opacity-50"
        >
          Save Example
        </button>
        <button
          onClick={() => setShowHistory((s) => !s)}
          className="bg-gray-600 text-white px-4 py-2 m-2 rounded"
        >
          {showHistory ? "Hide History" : "History"}
        </button>
      </div>

      {saving && (
        <div className="flex flex-wrap items-center justify-center gap-2 my-1">
          <input
            type="text"
            placeholder="ชื่อโจทย์ (ไม่บังคับ)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-56"
          />
          <button
            onClick={handleSave}
            disabled={busy}
            className="bg-amber-600 text-white px-3 py-2 rounded disabled:opacity-50"
          >
            บันทึก
          </button>
        </div>
      )}
      {status && (
        <p className={`text-sm my-1 ${status.ok ? "text-green-700" : "text-red-600"}`}>{status.text}</p>
      )}

      {showHistory && (
        <div className="mx-auto my-2 w-full max-w-3xl border rounded shadow-sm bg-white text-left text-sm">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border-b">
            <span className="font-semibold">ประวัติการคำนวณ ({methodName})</span>
            {history.length > 0 && (
              <button onClick={handleClear} className="text-red-600 hover:underline">
                Clear
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <p className="px-3 py-2 text-gray-500">ยังไม่มีประวัติ</p>
          ) : (
            <ul className="max-h-60 overflow-y-auto divide-y">
              {history.map((item) => (
                <li key={item._id} className="flex items-center gap-2 px-3 py-2">
                  <span className="text-gray-500 whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                  <span className="flex-1 truncate" title={formatOutput(item.output)}>
                    {formatOutput(item.output)}
                  </span>
                  <button onClick={() => onLoad(item.input)} className="text-blue-600 hover:underline">
                    Load
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:underline">
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default DatabasePanel;
