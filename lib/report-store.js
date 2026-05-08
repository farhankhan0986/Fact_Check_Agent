const store = global.reportStore ?? new Map();
if (!global.reportStore) global.reportStore = store;

export function setReport(id, report) {
  store.set(id, report);
}

export function getReport(id) {
  return store.get(id) ?? null;
}

export function getAllReports() {
  return Array.from(store.values()).sort(
    (a, b) => new Date(b.processedAt) - new Date(a.processedAt)
  );
}
