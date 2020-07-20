import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import axios from "axios";

import Button from "../presentational/Button";

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        city: '',
        currentWeather: ""
    }
  }

  componentDidMount() {
    axios.get("https://www.metaweather.com/api/location/2388929")
      .then(res => {
        console.log(res.data.title)
        this.setState({
          ...this.state,
          city: res.data.title,
          currentWeather: res.data.consolidated_weather[0]
        })
      }).catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.homeTitle}>Welcome to your first <Text style={styles.redText}>React Native</Text> app!</Text>
        </View>
        <View>
          {this.state.currentWeather 
          ? 
            <View>
                <Text style={styles.weatherText}>{`${this.state.city} Weather`}</Text> 
                <Text style={styles.weatherText}>{`Expected High: ${this.state.currentWeather.max_temp}`}</Text> 
                <Text style={styles.weatherText}>{`Expected Low: ${this.state.currentWeather.min_temp}`}</Text> 
                <Text style={styles.weatherText}>{`Weather type: ${this.state.currentWeather.weather_state_name}`}</Text> 
            </View> 
          : 
          null }
        </View>
        <Button buttonText="Logout" buttonFunction={this.props.logoutApp} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    alignSelf: "stretch",
    paddingRight: 40,
    paddingLeft: 40,
  },
  headerContent: {
    alignSelf: "stretch",
    justifyContent: "center",
    height: 200,
    marginTop: 100,
    marginBottom : 30 ,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  homeTitle: {
    textAlign: "center",
    fontSize: 28
  },
  redText: {
    color: "red"
  },
  weatherText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 30,
    marginBottom : 50 
  }
})

export default HomeView;