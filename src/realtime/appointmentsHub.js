import { HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr'

const apiUrl = import.meta.env.VITE_API_URL || '/api'
const explicitHubUrl = import.meta.env.VITE_HUB_URL
const hubUrl = explicitHubUrl
  ? `${explicitHubUrl.replace(/\/$/, '')}/hubs/appointments`
  : `${apiUrl.replace(/\/api\/?$/, '')}/hubs/appointments`

let connection = null
let startPromise = null
const handlers = new Set()

function ensureConnection() {
  if (connection) return connection

  connection = new HubConnectionBuilder()
    .withUrl(hubUrl, {
      accessTokenFactory: () => localStorage.getItem('accessToken') || '',
    })
    .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
    .configureLogging(LogLevel.Warning)
    .build()

  connection.on('SlotsUpdated', (payload) => {
    handlers.forEach((fn) => {
      try { fn(payload) } catch { /* swallow handler errors */ }
    })
  })

  connection.onreconnected(() => {
    // Re-join groups that handlers care about
    // (handlers are responsible for re-subscribing via subscribe())
  })

  return connection
}

async function start() {
  const conn = ensureConnection()
  if (conn.state === HubConnectionState.Connected) return conn
  if (startPromise) return startPromise

  startPromise = conn.start()
    .catch((err) => {
      console.warn('[SignalR] Connection failed:', err?.message || err)
      throw err
    })
    .finally(() => { startPromise = null })

  await startPromise
  return conn
}

export async function subscribeToSlotUpdates({ doctorId, date }, handler) {
  if (!doctorId || !date) return () => {}

  handlers.add(handler)

  try {
    const conn = await start()
    await conn.invoke('JoinSlotGroup', doctorId, date)
  } catch {
    // SignalR unreachable — handler stays registered but won't fire.
    // Caller's polling/local invalidation still works.
  }

  return async () => {
    handlers.delete(handler)
    try {
      if (connection?.state === HubConnectionState.Connected) {
        await connection.invoke('LeaveSlotGroup', doctorId, date)
      }
    } catch { /* ignore */ }
  }
}
