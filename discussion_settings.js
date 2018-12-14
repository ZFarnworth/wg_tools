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
        url:`https://` + domain + `.instructure.com/api/v1/courses/` + course.course_id + `/discussion_topics`,
        headers: { "User-Agent": "Request-Promise", Authorization: "Bearer " + token }
      })
        .then(function (discussions) {

              var discussionsArray = discussions.data

              // console.log(discussions.data)
                for (var i = 0; i < discussionsArray.length; i++) {

                  var discID = discussionsArray[i].id

                  updateDiscussion(course.course_id, discID)

                }
               // discussionsArray.forEach(discussion=>{
               //
               //   updateDiscussion(course.course_id, discussionID)
               //
               // })

          })

        .catch(function (error) {

          console.log(error);

        });

    })

});



var updateDiscussion = (courseID, discID ) => {

    axios({
      method:'put',
      url:`https://` + domain + `.instructure.com/api/v1/courses/` + courseID + `/discussion_topics/` + discID,
      headers: { "User-Agent": "Request-Promise", Authorization: "Bearer " + token },
      data: {
        published: false
      }
    })

    .then(function (response){
      console.log(response.status)
    })

    .catch(function (error){
      console.log("Topic does not exists with a topic_id of " + discID)
    });

}
