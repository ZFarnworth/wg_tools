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
        url:`https://` + domain + `.instructure.com/api/v1/courses/` + course.course_id + `/assignments`,
        headers: { "User-Agent": "Request-Promise", Authorization: "Bearer " + token }
      })
        .then(function (assignments) {

              var assignmentsArray = assignments.data

              assignmentsArray.forEach(assignment=>{

                updateAssignment(course.course_id, assignment.id)

              })

          })

        .catch(function (error) {

          console.log(error);

        });

    })

});



var updateAssignment = (courseID, assignmentID ) => {

    axios({
      method:'put',
      url:`https://` + domain + `.instructure.com/api/v1/courses/` + courseID + `/assignments/` + assignmentID,
      headers: { "User-Agent": "Request-Promise", Authorization: "Bearer " + token },
      data: {
        assignment: {
            points_possible:102
        }
      }
    })

    .then(function (response){
      console.log(response.status)
    })

    .catch(function (error){
      console.log("ERROR On Course " + assignment_id)
    });

}
