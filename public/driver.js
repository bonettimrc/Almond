const xSlider = document.getElementById("xSlider");
const ySlider = document.getElementById("ySlider");
const ledButton = document.getElementById("ledButton");
const change = 1
const data = { x: 90, y: 90, led: false }

xSlider.getValue = () => {
  return parseInt(xSlider.value)
}
xSlider.setValue = (value) => {
  xSlider.value = value.toString()
}
ySlider.getValue = () => {
  return parseInt(ySlider.value)
}
ySlider.setValue = (value) => {
  ySlider.value = value.toString()
}
ledButton.getValue = () => {
  return ledButton.classList.contains("btn-primary") ? true : false;
}

const toggleLedButton = () => {
  if (ledButton.classList.contains("btn-primary")) {
    ledButton.value = "off"
    ledButton.classList.replace('btn-primary', 'btn-error')
  } else if (ledButton.classList.contains("btn-error")) {
    ledButton.value = "on"
    ledButton.classList.replace('btn-error', 'btn-primary')
  }
}

xSlider.addEventListener("input", () => {
  data.x = xSlider.getValue();
  postDataAsJSON("/api", data);
})
ySlider.addEventListener("input", () => {
  data.y = ySlider.getValue();
  postDataAsJSON("/api", data);
})
ledButton.addEventListener('click', () => {
  toggleLedButton();
  data.led = ledButton.getValue();
  postDataAsJSON("/api", data);
})

//i don't want them to focus, it could conflict with the keyboard control
xSlider.onfocus = xSlider.blur
ySlider.onfocus = ySlider.blur
ledButton.onfocus = ledButton.blur

document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case "Space":
      toggleLedButton()
      break;
    case "ArrowLeft":
      xSlider.setValue(xSlider.getValue() - change)
      break;
    case "ArrowRight":
      xSlider.setValue(xSlider.getValue() + change)
      break;
    case "ArrowUp":
      ySlider.setValue(ySlider.getValue() + change)
      break;
    case "ArrowDown":
      ySlider.setValue(ySlider.getValue() - change)
      break;
  }
  data.x = xSlider.getValue()
  data.y = ySlider.getValue()
  data.led = ledButton.getValue()
  postDataAsJSON("/api", data)
})

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