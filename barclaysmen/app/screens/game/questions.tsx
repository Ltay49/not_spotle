import { View, StyleSheet, Text, ScrollView, Image, TextInput} from "react-native"
const JJ = require('../../../assets/images/jj.png');
const Football = require ('../../../assets/images/Football.png')


export default function (){

    return (

        <View>
            <ScrollView>
            <View style={styles.chances}>
            <Image source={Football} style={styles.football} /> 
            <Image source={Football} style={styles.football} /> 
            <Image source={Football} style={styles.football} /> 
            <Image source={Football} style={styles.football} /> 
            <Image source={Football} style={styles.football} /> 
            <Image source={Football} style={styles.football} /> 
            <Image source={Football} style={styles.football} /> 
            <Image source={Football} style={styles.football} /> 
            <Image source={Football} style={styles.football} /> 
            <Image source={Football} style={styles.football} /> 
                <Text></Text>

            </View>
            <View style={styles.guesses}>
                <View><Text>You have 10 shots at bagging the Barclaysman</Text></View>
                <Text></Text>
                <TextInput style={styles.input} placeholder="Guess Here..." />
            </View>
            <View style={styles.player}>
            <View style={styles.profile}>
            <Image source={JJ} style={styles.image} /> 
            </View>
            <View style={styles.name}>
                <Text style={styles.ntext}>Jay Jay Okocha</Text>
            </View>
            <View style={styles.stats}>  
            <Text style={styles.stext}>:Goals</Text>
            <Text style={styles.stext}>:Position</Text>
            <Text style={styles.stext}>:Seasons</Text>
            <Text style={styles.stext}>:Team</Text>
            <Text style={styles.stext}>:Country</Text>
            <Text style={styles.stext}>:Games</Text>
            </View>
            </View>
            <View style={styles.player}>
            <View style={styles.profile}>
            <Image source={JJ} style={styles.image} /> 
            </View>
            <View style={styles.name}>
                <Text style={styles.ntext}>Jay Jay Okocha</Text>
            </View>
            <View style={styles.stats}>  
            <Text style={styles.stext}>:Goals</Text>
            <Text style={styles.stext}>:Position</Text>
            <Text style={styles.stext}>:Seasons</Text>
            <Text style={styles.stext}>:Team</Text>
            <Text style={styles.stext}>:Country</Text>
            <Text style={styles.stext}>:Games</Text>
            </View>
            </View>
            
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    chances:{
        display:'flex',
        flexWrap:'wrap',
        // backgroundColor: 'red',
        height: 50,
        width: '100%',
        marginTop:20
    },
    guesses:{
        backgroundColor: 'beige',
        height: 100,
        width: '100%',
        marginTop:20
    },
    player:{
        backgroundColor: 'green',
        height: 200,
        width: '100%',
        marginTop:20,
        borderRadius:'2%',
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    profile:{
        marginLeft:5,
        marginTop:10,
        // backgroundColor: 'grey',
        height: '50%',
        width: '45%',
        borderRadius:'50%'
    },
    name: {
        justifyContent: 'center', // Centers content vertically
        alignItems: 'center',     // Centers content horizontally
        // backgroundColor: 'grey',
        height: '25%',
        marginLeft: 155,          // Keep marginLeft to position the container
        width: '45%',
        marginTop: -90,          // Adjust positioning if necessary
        transform: [
            { rotate: '-25deg' },   // Rotate the content by 45 degrees
        ],
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain', // Ensures the image scales correctly
      },
    ntext:{
        fontSize: 20,
        fontWeight:'bold',
    },
    stats:{
        display:'flex',
        flexWrap: "wrap",
        justifyContent:'space-evenly',
        marginTop:45,
        marginLeft:3,
        height:'40%',
        width:'98%',
        // backgroundColor:"grey"
    },
    stext: {
        textAlign:'center',
        marginTop:3,
        marginBottom:2,
        marginLeft:4,
        marginRight:6.5,
        padding:8,
        fontWeight:'bold',
        width:'30%',
        color: 'white',           // Text color
        borderStyle: 'solid',
        backgroundColor: 'grey',
        borderRadius:'22%',
        borderWidth:1   // Border width for the bottom
      },
      football: {
        width: '10%',
        height: '100%',
        resizeMode: 'contain', // Ensures the image scales correctly
      },
      input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
      },
    })