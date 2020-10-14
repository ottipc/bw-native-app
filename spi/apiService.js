import React from 'react';
import axios from 'axios';

/**
 *
 *  get the right question belong to the id
 *
 */

const myApiService = {
    getQuestion: function (questionId) {
        console.log("Now fetching from  Url : " + 'http://o.ssystems.de/api/question' + '?id=eq.' + questionId)
        return fetch('http://o.ssystems.de/api/question' + '?id=eq.' + questionId, {
            method: 'get',
            headers: new Headers({
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicXVlc3Rpb25fYXBwX3VzZXIifQ.P5lcq--gTbuw-ZNvnNDpuE61QyWNFg6RvnK9OzEG3pU',
                    'Content-Type': 'application/json'
                }
            )
        }).then((response) => response.json())
            .then((json) => {
                //console.log(json);
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    },

    getAllQuestion: function () {
        console.log("Now fetching from  Url : " + 'http://o.ssystems.de/api/question' + '?select=id')
        return fetch('http://o.ssystems.de/api/question' + '?select=id', {
            method: 'get',
            headers: new Headers({
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicXVlc3Rpb25fYXBwX3VzZXIifQ.P5lcq--gTbuw-ZNvnNDpuE61QyWNFg6RvnK9OzEG3pU',
                    'Content-Type': 'application/json'
                }
            )
        }).then((response) => response.json())
            .then((json) => {
                //console.log(json);
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    },



    persistQuestionResultForUser: function (questionId, userid, answer) {
        console.log("Persisting Answer.......");
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicXVlc3Rpb25fYXBwX3VzZXIifQ.P5lcq--gTbuw-ZNvnNDpuE61QyWNFg6RvnK9OzEG3pU',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({question_id: questionId, user_id: userid, answer: answer})
        };
        fetch('http://o.ssystems.de/api/user_question_answer', requestOptions)
            .then((response) => {
                console.log("Answer persisted");
                return response;
            })
            .catch((error) => {
                console.error(error);
            });
    },

    getAllAnsweredQuestionForUser: function (userid) {
        console.log("Now fetching from  Url : " + 'http://o.ssystems.de/api/user_question_answer' + '?&user_id=eq.' + userid)
        return fetch('http://o.ssystems.de/api/user_question_answer' + '?&user_id=eq.' + userid, {
            method: 'get',
            headers: new Headers({
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicXVlc3Rpb25fYXBwX3VzZXIifQ.P5lcq--gTbuw-ZNvnNDpuE61QyWNFg6RvnK9OzEG3pU',
                    'Content-Type': 'application/json'
                }
            )
        }).then((response) => response.json())
            .then((json) => {
                //console.log(json);
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    },


    getRandomQuestionForUser: function (userid) {
        console.log("Random Question for user")

        console.log("Now fetching from  Url : " + 'http://o.ssystems.de/api/user_question_answer' + '?user_id=eq.' + userid)
        this.getAllAnsweredQuestionForUser(userid).then((json) => {
            console.log("All Questions for User");
            //console.log(json);
            return json;
        })
        .catch((error) => {
                console.error(error);
        });
   /*     let question
        do {
            question = fetch('http://o.ssystems.de/api/user_question_answer' + '?question_id=eq.' + questionId + '&user_id=eq.' + 'userid', {
                method: 'get',
                headers: new Headers({
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicXVlc3Rpb25fYXBwX3VzZXIifQ.P5lcq--gTbuw-ZNvnNDpuE61QyWNFg6RvnK9OzEG3pU',
                        'Content-Type': 'application/json'
                    }
                )
            }).then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    return json;
                })
                .catch((error) => {
                    console.error(error);
                });
        } while (questions.indexOf(question) != -1);
        console.log(result);
        return question;*/
    },


    getQuestionWithAxios: function (questionId) {
        console.log("Now fetching from  Url : " + 'http://o.ssystems.de/api/question' + '?id=eq.' + questionId)
        let config = {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicXVlc3Rpb25fYXBwX3VzZXIifQ.P5lcq--gTbuw-ZNvnNDpuE61QyWNFg6RvnK9OzEG3pU',
                'Content-Type': 'application/json'
            }
        }
        return axios.get('http://o.ssystems.de/api/question' + '?id=eq.' + questionId, config
        ).then((response) => response.json())
            .then((json) => {
                console.log(json);
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    },

};


export default myApiService
