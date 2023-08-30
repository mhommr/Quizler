import fs from 'fs'
import { result } from 'underscore'

export const chooseRandom = (array, numItems) => {
  if (array.length <= 1) {
    return array
  }
  if (numItems > array.length || numItems === undefined) {
    numItems = Math.floor(Math.random() * (array.length + 1))
  }
  // let newArray = [...array]
  // let resultArray = []
  // for(let i=0; i<numItems; i++) {
  //   let random = Math.random()
  // }
  return [...array].sort(() => 0.5 - Math.random()).slice(0, numItems)

}

export const createPrompt = ({ numQuestions=1, numChoices=2 } = {}) => {
  let resultArray = []
  for (let i = 1; i<=numQuestions; i++) {
    const questions = {
      type: 'input',
      name: `question-${i}`,
      message: `Enter question ${i}`
    }
    resultArray.push(questions)
    for (let index = 1; index<=numChoices; index++) {
      const choices = {
        type: 'input',
        name: `question-${i}-choice-${index}`,
        message: `Enter answer choice ${index} for question ${i}`
      }
      resultArray.push(choices)
    }
  } 
  return resultArray
}

export const createQuestions = (question = {}) => {
  let questionKeys = []
  for (let key in question) {
      if (!key.includes('choice')) {
          questionKeys.push(key)
      }
  }

  const choiceKeysByQuestion = questionKey => {
      let choiceKeys = []
      for (let key in question) {
          if (key.includes(`${questionKey}-choice`)) {
              choiceKeys.push(key)
          }
      }
      return choiceKeys.map(key => question[key])
  }

  // let resultArray = []
  // for (let key in questionKeys) {
  //     resultArray.push({
  //         type: 'list',
  //         name: key,
  //         message: question[key],
  //         choices: choiceKeysByQuestion(key)
  //     })
  // }
  // return resultArray

  return questionKeys.map(questionKey => ({
    type: 'list',
    name: questionKey,
    message: question[questionKey],
    choices: choiceKeysByQuestion(questionKey)
  }))
}

export const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
  })

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err =>
      err ? reject(err) : resolve('File saved successfully')
    )
  })
