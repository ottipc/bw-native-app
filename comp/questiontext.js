import React, {Component} from "react";
import {StyleSheet, Text} from "react-native";

class QuestionText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: -1,
            fetchedQuestion: [],
            previousQuestion: -1,
            nextQuestion: []
        };
    }

    componentDidMount() {
//        this.fetchRandomQuestion();
    }


    render() {
        return (
            <Text style={styles.baseText}>
                <Text style={styles.titleText} onPress={this.onPressTitle}>
                    {this.state.titleText}
                    {"\n"}
                    {"\n"}
                </Text>
                <Text numberOfLines={5}>{this.state.bodyText}</Text>
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Cochin"
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default QuestionText;
