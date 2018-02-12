import $ from 'jquery'

const url = "https://wordwatch-api.herokuapp.com/api/v1/"

$(document).ready(() => {
  getTopWord()
})

const getTopWord = () => {
  fetch(`${url}top_word`)
  .then((response) => response.json())
  .then((wordInfo) => displayWord(wordInfo))
  .catch(error => console.error('error:', error))
}

const displayWord = (wordInfo) => {
  let topWord = Object.keys(wordInfo.word)[0]
  let topCount = Object.values(wordInfo.word)[0]
  $("#top-word-header").append(
    `${topWord} (${topCount})`
  )
}

const evaluateWords = () => {
  $('.added-words').remove()
  let message = $('#message').val()
  let words = message.split(" ")
  let wordFrequency = {}
  words.forEach(word => {
    let wordCase = word.toUpperCase()
    let wordFilter = words.filter(wordInArray => wordInArray.toUpperCase() == wordCase)
    wordFrequency[wordCase] = wordFilter.length
    postWord(word)
  })
  for (let displayWord in wordFrequency) {
  $('.word-count').append(
      `<div class="added-words" style="font-size:${wordFrequency[displayWord]}em">${displayWord}</div>`
    )
  }
  $('#message').val('')
}

$('#button-break-down').on('click', evaluateWords)

$('#message').on('keypress', (event) => {
  if(13 == event.keyCode) {
    event.preventDefault()
    evaluateWords()
  }
})

const postWord = (wordToPost) => {
  fetch(`${url}words`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ word: { value: `${wordToPost}` } })
  })
  .then((response) => response.json())
  .catch(error => console.error('error:', error))
}
