const axios         = require('axios')
var URL             = ".instructure.com/api/v1/courses"
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

    throttle(function() {
      axios({
        method:'get',
        url:`https://` + domain + `.instructure.com/api/v1/courses/` + course.course_id + `/assignments`,
        headers: { "User-Agent": "Request-Promise", Authorization: "Bearer " + token }
      })
        .then(function (assignment_id) {
            console.log(assignment_id.data[0].id);
            var assignment = assignment_id.data[0].id;

              throttle(function (assignment) {
                axios({
                  method:'put',
                  url:`https://` + domain + `.instructure.com/api/v1/courses/` + course.course_id + `/assignments` + assignment,
                  headers: { "User-Agent": "Request-Promise", Authorization: "Bearer " + token },
                  data: {
                    points_possible:100
                  }
                })
              })

        })
        .catch(function (error) {
          console.log(error.response.status);
        });
      })

    })

});
