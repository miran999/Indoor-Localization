// import React from "react";
import { useState, useEffect, button } from "react";
// import backgroundImage from "./images/background2.jpg";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ImageBackground,
} from "react-native";

let data_array = [];
let pop_array = [];
let track = 0;
let label = 0;
let finalData;

//Dictionary and keys to make the data which come from the server as index
const dic = {
  0: 0,
  101: 0,
  102: 1,
  103: 2,
  104: 3,
  105: 4,
  106: 5,
  107: 6,
  108: 7,
  109: 8,
  110: 9,
  111: 10,
  112: 11,
  113: 12,
};

const Localization = () => {
  let labelURL = "http://192.168.1.107:8090/prediction";
  // let [label , setLabel] = useState(0);
  // let [finalData, setFinalData] = useState(0)

  let coordinates = [
    [0, 0], //initial position
    [200, 150], // hallway shmal awel wahed-----------------101
    [210, 200], // hallway ma ben el lecture w open space 1st---------------102
    [210, 285], //hallway ma ben el lecture w open space 2nd----------103
    [210, 355], //hallway bel 3ard 1st part---------------104
    [270, 355], //hallway bel 3ard 2nd part fo2 (ymen)--------------105
    [130, 355], // hallway bel 3ard 2nd part ta7t (shmal)-----------106
    [270, 240], //lecture hall el modarag-------------107
    [210, 420], //hallway el kbera khales awl 7ta shmal-----------108
    [210, 580], //hallway el kbera khales fel nos-----------109
    [210, 690], //hallway akher 7ta-------------110
    [105, 590], //odet dr tamer---------------111
    [135, 500], //electronics lab --------------112
  ];

  let track_coordinates = [
    [0, 0], //intial position
    [200, 150], // hallway shmal awel wahed-----------------101
    [210, 200], // hallway ma ben el lecture w open space 1st---------------102
    [210, 285], //hallway ma ben el lecture w open space 2nd----------103
    [210, 355], //hallway bel 3ard 1st part---------------104
    [270, 355], //hallway bel 3ard 2nd part fo2 (ymen)--------------105
    [130, 355], // hallway bel 3ard 2nd part ta7t (shmal)-----------106
    [270, 240], //lecture hall el modarag-------------107
    [210, 420], //hallway el kbera khales awl 7ta shmal-----------108
    [210, 580], //hallway el kbera khales fel nos-----------109
    [210, 690], //hallway akher 7ta-------------110
    [105, 590], //odet dr tamer---------------111
    [135, 500], //electronics lab --------------112
  ];

  let [sec, setSec] = useState(0);
  //  var x = label-101
  let index = dic[label];
  let index2 = dic[track];

  setInterval(() => {
    setSec((sec = sec + 1));
  }, 3000);

  useEffect(() => {
    fetch(labelURL)
      .then((response) => response.json())
      .then((json) => {
        // console.log(json)
        finalData = json;
        // console.log("final data is", finalData)
        if (finalData.value !== label) {
          // setLabel(finalData.value)
          label = finalData.value;
          console.log("label", label);
          data_array.push(label);
          console.log("data", data_array);
        }
      })
      .catch((error) => alert(error));
    // if(data_array.length<50){
    //     data_array.push(label)
    //     console.log("data",data_array)
    // }

    // if(data_array.length>60){
    //     pop_array= data_array.slice(2,45)
    // }
  }, [sec]);

  // console.log(dic[label])
  //console.log(typeof(dic[label]))
  // console.log(dic[label])
  // console.log(label);
  //console.log(coordinates[label][1]);
  // console.log("yaraab", yarab)
  // console.log(coordinates[x][0])

  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  async function Tracking() {
    pop_array = data_array;
    // console.log("pop" ,pop_array)
    for (let i = 0; i <= pop_array.length; i++) {
      if (pop_array.length >= 0) {
        let track_history = pop_array.pop();
        await timer(3000);
        console.log("track", track_history);
        track = track_history;
        console.log(pop_array.length);
      }
    }
  }
  return (
    <View>
      <Text style={styles.titlee}> SBME Department Map </Text>
      <ImageBackground
        source={require("./images/background2.png")}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 300,
          height: 730,
          // position: "absolute",
          top: 15,
          left: 55,
          // bottom: 0,
          // right: 40,
        }}
      />

      <Button
        onPress={Tracking}
        style={{
          color: "red",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 82,
          paddingHorizontal: 82,
          // marginLeft: 460,
          borderRadius: 30,
          // marginTop:400,
          position: "absolute",
          // backgroundColor: "red",
          width: 300,
          height: 60,
          bottom: 0,
          top: 500,
        }}
        title="Replay"
      ></Button>

      <View
        style={{
          position: "absolute",
          width: 10,
          height: 10,
          borderRadius: 20 / 2,
          backgroundColor: "blue",
          opacity: 0.7,
          left: coordinates[index][0],
          top: coordinates[index][1],
        }}
      />

      <View
        style={{
          position: "absolute",
          width: 10,
          height: 10,
          borderRadius: 20 / 2,
          backgroundColor: "red",
          opacity: 0.7,
          left: track_coordinates[index2][0],
          top: track_coordinates[index2][1],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titlee: {
    color: "blue",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 40,
    fontSize: 25,
  },
});
export default Localization;
