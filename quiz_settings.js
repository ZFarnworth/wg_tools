const axios         = require('axios')
var throttledQueue  = require('throttled-queue');
var throttle        = throttledQueue(5, 1000);

const token         = ''
var domain          = 'zfarnworth'

const csvFilePath   ='/Users/zfarnworth/Desktop/Scripts/courses.csv'
const csv           = require('csvtojson')


csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{

    jsonObj.forEach(course=>{

      axios({
        method:'get',
        url:`https://` + domain + `.instructure.com/api/v1/courses/` + course.course_id + `/quizzes`,
        headers: { "User-Agent": "Request-Promise", Authorization: "Bearer " + token }
      })
        .then(function (quizzes) {

              var quizzesArray = quizzes.data

              quizzesArray.forEach(quiz=>{

                updateQuiz(course.course_id, quizzes.id)

              })

          })

        .catch(function (error) {

          console.log(error);

        });

    })

});



var updateQuiz = (courseID, quizID ) => {

    axios({
      method:'put',
      url:`https://` + domain + `.instructure.com/api/v1/courses/` + courseID + `/quizzes/` + quizID,
      headers: { "User-Agent": "Request-Promise", Authorization: "Bearer " + token },
      data: {
        quiz: {
            time_limit:60
        }
      }
    })

    .then(function (response){
      console.log(response.status)
    })

    .catch(function (error){
      console.log("ERROR On Course " + quiz_id)
    });

}
