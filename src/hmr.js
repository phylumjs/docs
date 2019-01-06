'use strict'

if (module.hot && window.WebSocket) {
	const ws = new WebSocket(`${location.procotol === 'https' ? 'wss' : 'ws'}://${location.host}/`)
	ws.addEventListener('message', e => {
		if (module.hot.status() === 'idle') {
			module.hot.check({
				onUnaccepted: () => location.reload(),
				onDeclined: () => location.reload()
			}).catch(err => {
				console.error(err)
				location.reload()
			})
		}
	})
}
