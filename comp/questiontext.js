import React, {Component} from "react";
import {Button, Image, StyleSheet, Text, View} from "react-native";
import myApiService from "../spi/apiService";

class QuestionText extends Component {


    constructor(props) {
        super(props);
        this.state = {
            question: props.id,
            allQuestions: [],
            fetchedQuestionsForUser: [],
            userAnswerQuestions: [],
            fetchedQuestion: [],
            previousQuestion: -1,
            nextQuestion: []
        };
        console.log("Constructor Props")
        //console.log(props)


    }

    componentDidMount() {
        console.log("Component Did Mount")
        this.setUserQuestions();
        myApiService.getAllQuestion().then((response) => {
                //console.log("Getting all The Questions")
                let allquestions = []
                //console.log(response)
                for (let i = 0; i < response.length; i++) {
                    let qid = response[i];
                    allquestions[i] = qid;
                    //console.log(qid);
                }
                //console.log("Setting State All questions...")
                //console.log(allquestions)

                this.setState({
                    allQuestions: allquestions
                })
        }
        )
       // this.goForFetch()
    }


    setUserQuestions() {
        myApiService.getAllAnsweredQuestionForUser(1).then((response) => {
                //console.log("Die Nutten")
                let questions = []
                //console.log(response)
                for (let i = 0; i < response.length; i++) {
                    let qid = response[i];
                    questions[i] = qid.question_id;
                    //console.log(qid);
                }
                //console.log("Setting State questions...")
                //console.log(questions)

                this.setState({
                    userAnswerQuestions: questions,
                })
            }
        )
    }

    setAnswer = (val) => {
        console.log("Setting answer of question id")
        console.log("users")
        let uniqIds = [...new Set(this.state.userAnswerQuestions)];
        console.log(uniqIds)
        console.log("all")
        console.log(this.state.allQuestions)

        if(uniqIds.length == this.state.allQuestions.length){
            this.setState({
                loading: false,
                questionText: "No Question anymore",
                picturePath: "",
            })
            return
        }

        myApiService.persistQuestionResultForUser(this.state.questionId, 1, val)
        this.state.userAnswerQuestions.push(this.state.questionId);
        this.setState({
            userAnswerQuestions: this.state.userAnswerQuestions,
        })
        this.goForFetch();
    }

    goForFetch = () => {
        console.log("Now Fetching")
        /*this.setState({
            fromFetch: true,
            loading: true,

        })*/
        let questionsidss = this.state.userAnswerQuestions;
        let questioncount = this.state.allQuestions.length;
        console.log("User account : " + questionsidss.length)
        console.log("all account : " + questioncount)

        if(questioncount == questionsidss.length){
            this.setState({
                loading: false,
                questionText: "No Question anymore",
            })
           return
        }

        var questionid = 1;
        console.log("Now doing the while ....")
        let u = 1;
        var exists = false
        do {
            questionid = Math.floor(Math.random() * questioncount) + 1
           // console.log(questionid)
            exists = questionsidss.includes(questionid)
            u++;
        }while (exists == true && u < 100)

        console.log("Taking question id ...")
        console.log(questionid)

        myApiService.getQuestion(questionid).then((responseJson) => {
            console.log('getting data from fetch', responseJson)
            setTimeout(() => {
                console.log('Setting State datasource to ', responseJson[0].text)
                console.log('Setting State PicturePath to ', responseJson[0].picture_path)
                console.log('Setting State Id to ', responseJson[0].id)

                this.setState({
                    loading: false,
                    questionText: responseJson[0].text,
                    picturePath: responseJson[0].picture_path,
                    questionId: responseJson[0].id,

                })
                return responseJson[0]
            }, 2000)
        })
    }

    render() {
        return (

            <View style={{margin: 5, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    source={{uri: this.state.picturePath}}
                    style={{width: 250, height: 250 }}
                />

                <Text style={styles.baseText}>
                    <Text style={styles.titleText} onPress={this.onPressTitle}>
                        {this.state.questionText}
                        {"\n"}
                        {"\n"}
                    </Text>
                    <Text numberOfLines={5}>{this.state.bodyText}</Text>
                </Text>
                <View style = {styles.container}>
                    <Button
                        value={"yes"}
                        title="Yes"
                        onPress={() => this.setAnswer(true)}
                        color='green'
                    />
                    <Button
                    value={"no"}
                    title="No"
                    onPress={() => this.setAnswer(false)}
                    color='red'
                />
                </View>
                <Button
                    title="Start"
                    onPress={this.goForFetch}
                    color='blue'
                />


            </View>
        );
    }i
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 30,
        justifyContent: 'space-between'
    },
    buttonRight: {


    },
    baseText: {
        fontFamily: "Cochin"
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    }
});


export default QuestionText;
