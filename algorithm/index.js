const similarity = require("compute-cosine-similarity")


function createMatrix(recipientArr){
    const newMatrix = []
    for(let i = 0; i < recipientArr.length; i++){
      const userScore = [0,0,0,0,0,0,0,0,0,0,0,0,0]
      const preferencesArr = recipientArr[i]
      const actualPreferences = preferencesArr.map(preference => preference.dataValues)
      for(let j = 0; j < actualPreferences.length; j++){
        if(actualPreferences[j].preference === "like"){
          if(preferencesArr[j].category === "Books"){
            userScore[0] = 1
          } else if(preferencesArr[j].category === "Electronics"){
            userScore[1] = 1
          } else if(preferencesArr[j].category === "Cooking"){
            userScore[2] = 1
          }else if(preferencesArr[j].category === "Sports"){
            userScore[3] = 1
          }else if(preferencesArr[j].category === "Outdoors"){
            userScore[4] = 1
          }else if(preferencesArr[j].category === "Clothing"){
            userScore[5] = 1
          }else if(preferencesArr[j].category === "Music"){
            userScore[6] = 1
          }else if(preferencesArr[j].category === "Movies"){
            userScore[7] = 1
          }else if(preferencesArr[j].category === "Technology"){
            userScore[8] = 1
          }else if(preferencesArr[j].category === "Games"){
            userScore[9] = 1
          }else if(preferencesArr[j].category === "Pets"){
            userScore[10] = 1
          }else if(preferencesArr[j].category === "Home"){
            userScore[11] = 1
          }else if(preferencesArr[j].category === "Art"){
            userScore[12] = 1
          }
        } else if (actualPreferences[j].preference === "dislike"){
            if(preferencesArr[j].category === "Books"){
                userScore[0] = -1
              } else if(preferencesArr[j].category === "Electronics"){
                userScore[1] = -1
              } else if(preferencesArr[j].category === "Cooking"){
                userScore[2] = -1
              }else if(preferencesArr[j].category === "Sports"){
                userScore[3] = -1
              }else if(preferencesArr[j].category === "Outdoors"){
                userScore[4] = -1
              }else if(preferencesArr[j].category === "Clothing"){
                userScore[5] = -1
              }else if(preferencesArr[j].category === "Music"){
                userScore[6] = -1
              }else if(preferencesArr[j].category === "Movies"){
                userScore[7] = -1
              }else if(preferencesArr[j].category === "Technology"){
                userScore[8] = -1
              }else if(preferencesArr[j].category === "Games"){
                userScore[9] = -1
              }else if(preferencesArr[j].category === "Pets"){
                userScore[10] = -1
              }else if(preferencesArr[j].category === "Home"){
                userScore[11] = -1
              }else if(preferencesArr[j].category === "Art"){
                userScore[12] = -1
              }
        }
      }
      newMatrix.push(userScore)
    }
    return newMatrix
}

  
  
function fillInBlanks(matrix, id) {
const recipientArr = matrix[id - 1]
const newCalcs = []
const allColumns = []

//creates new array with column data
for(let j = 0; j < recipientArr.length; j++){
    let index = 0
    const columnObj = {
                        index: 0
                    }
    const column = []

    while(index < matrix.length){
    column.push(matrix[index][j])
    index++
    }

    if(j === 0){
    columnObj.columnName = "Books"
    columnObj.index = j
    }
    if(j === 1){
    columnObj.columnName = "Electronics"
    columnObj.index = j
    }
    if(j === 2){
    columnObj.columnName = "Cooking"
    columnObj.index = j
    }
    if(j === 3){
    columnObj.columnName = "Sports"
    columnObj.index = j 
    }
    if(j === 4){
    columnObj.columnName = "Outdoors"
    columnObj.index = j 
    }
    if(j === 5){
    columnObj.columnName = "Clothing"
    columnObj.index = j 
    }
    if(j === 6){
    columnObj.columnName = "Music"
    columnObj.index = j 
    }
    if(j === 7){
    columnObj.columnName = "Movies"
    columnObj.index = j 
    }
    if(j === 8){
    columnObj.columnName = "Technology"
    columnObj.index = j 
    }
    if(j === 9){
    columnObj.columnName = "Games"
    columnObj.index = j 
    }
    if(j === 10){
    columnObj.columnName = "Pets"
    columnObj.index = j 
    }
    
    if(j === 11){
    columnObj.columnName = "Home"
    columnObj.index = j 
    }
    
    if(j === 12){
    columnObj.columnName = "Art"
    columnObj.index = j 
    }
    
    columnObj.similarity = column
    allColumns.push(columnObj)
}
// console.log("All Columns", allColumns)

// calculates all cosine similarities for a given column
for(let i = 0; i < recipientArr.length; i++){
    let calcColumns = allColumns.map(column => {
    const newObject = {}
    Object.assign(newObject, column)
    return newObject
    })
    
    if(recipientArr[i] === 0){
    const vector1 = calcColumns[i].similarity
    for(let j = 0; j < calcColumns.length; j++){
        if(j !== i ){
        calcColumns[j].similarity = similarity(vector1, calcColumns[j].similarity)
        } else {
        calcColumns[j] = 1
        }
    }
    // console.log("calcColumns", calcColumns)

    //gets rid of anchor column + sorts array in ASC order
    calcColumns.splice(calcColumns.indexOf(1), 1)
    calcColumns.sort((a,b) => a.similarity - b.similarity)
    // console.log("sort", calcColumns)


    //gets top 3 results
    let topThreeResults
    if(calcColumns.length > 3){
        topThreeResults = calcColumns.slice(calcColumns.length - 3)
    } else {
        topThreeResults = calcColumns
    }
    // console.log("topthree", topThreeResults)


    //calculates final score
    const numerator = topThreeResults.reduce((preV, currV) => {
        preV = preV + recipientArr[currV.index] * currV.similarity
        return preV
        }, 0)
    
    const denominator = topThreeResults.reduce((preV, curV) => {
        preV = preV + curV.similarity
        return preV
    }, 0)
    
    const guess = numerator/denominator
    // console.log(topThreeResults, denominator)

    //store new calcs in independent array so that do not affect subsequent calcs
    const newCalc = {
        index: allColumns[i].index,
        columnName: allColumns[i].columnName,
        score: guess
    }

    newCalcs.push(newCalc)

    // console.log(recipientArr)
    }
}

//put together final user scores into an array for furher use
const finalScores = allColumns.map((column, index) => {
    delete column.index
    delete column.similarity
    for(let m = 0; m < newCalcs.length; m++){
    if(index === newCalcs[m].index){
        delete newCalcs[m].index
        return newCalcs[m]
    }
    }
    column.score = recipientArr[index]
    return column
})

return finalScores
}
  
module.exports = {createMatrix, fillInBlanks}