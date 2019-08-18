// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const fs = require('fs')
const marked = require('marked')
const hljs = require('highlight.js')
const remote = require('electron').remote

const { dialog } = require('electron').remote

const readFile = (file) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      document.querySelector('.md').innerHTML = marked(data.toString())
      Array.from(document.querySelectorAll('pre code')).forEach(
        block => hljs.highlightBlock(block)
      )
      }
  })
}

const filters = { filters: [{ name: 'Markdown', extensions: ['md', 'markdown'] }] }

const openFilePicker = () => {
  dialog.showOpenDialog(filters, fileNames => {
    if (fileNames) {
      readFile(fileNames[0])
    }
  })
}

const close = e => {
  const window = remote.getCurrentWindow()
  window.close()
}

document.querySelector('.close').addEventListener('click', close)
document.querySelector('.select-file').addEventListener('click', openFilePicker)