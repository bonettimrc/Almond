const data = { x: 90, y: 90, led: true }
const pad = document.getElementById('pad');
pad.value = true
pad.addEventListener("mousemove", (e) => { moveUpdate(e) });
pad.addEventListener("touchmove", (e) => { moveUpdate(e) });
const moveUpdate = (e) => {
  let touch = undefined
  if (e.touches) {
    touch = e.touches[0]
  }
  let rect = pad.getBoundingClientRect()
  let x = parseInt(((e.clientX || touch.clientX) - rect.x) / rect.width * 180);
  let y = 180 - parseInt(((e.clientY || touch.clientY) - rect.y) / rect.height * 180);
  if (((x <= 180) && (x >= 0)) && ((y <= 180) && (y >= 0))) {
    data.x = x
    data.y = y
    postDataAsJSON("/api", data)
  }
}
pad.onclick = () => {
  if (pad.value) {
    pad.value = false
    pad.style.backgroundColor = '#f44336'
  } else {
    pad.value = true
    pad.style.backgroundColor = '#2196f3'
  }
  data.led = pad.value
  postDataAsJSON("/api", data)
}

const postDataAsJSON = (path, data) => {
  fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).catch((error) => {
    console.error('Error:', error);
  });
}
