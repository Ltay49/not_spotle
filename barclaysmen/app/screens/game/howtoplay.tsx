import { View,Animated,Text, Image, StyleSheet, ScrollView, TouchableOpacity} from "react-native"
const Football = require('../../../assets/images/Football.png')
const AndyJ = require('../../../assets/images/AndyJ.png')
const SearchBar = require('../../../assets/images/searchBar.png')
const JulioArca = require('../../../assets/images/JulioArca.png')
import Icon from 'react-native-vector-icons/FontAwesome';

type HowToPlayProps = {
    setHowToPlay: React.Dispatch<React.SetStateAction<boolean | null>>;
  };
      
      export default function HowToPlay({ setHowToPlay }: HowToPlayProps) {
        // Handle closing the "How to Play" screen
        const handleSubmit = () => {
          setHowToPlay(false);
        };

    return (
        
        <Animated.View style={styles.background}>
            <View style={styles.overlay}>
                <View style={styles.rowTitle}>
                <Text style={styles.title}>How To Play</Text>
            <TouchableOpacity  style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonTextX}>X</Text>
            </TouchableOpacity>
            </View>
            <Text style={styles.buttonText1}>THE AIM</Text>
            <Text style={styles.buttonText}>Bag the Barclaysman within 10 shots, the game is a nostalgic replay back to the iconic Barclays Premier League</Text>
            <Text style={styles.buttonText1}>THE STATS</Text>
            <View style={styles.row}>
                <Image  style={styles.football} source={Football}></Image>
                <Text style={styles.buttonText}> All the players and stats range from 2001 to 2015 - 'The Barclays Era'</Text>
            </View>
            <View style={styles.row}>
                <Image  style={styles.football} source={Football}></Image>
                <Text style={styles.buttonText}>You need to narrow down who the Barclaysman of the day is via their; Goals, Assists, Games, Position, Teams, Sesaons Played and Nationality</Text>
            </View>
            <View style={styles.row}>
            <Image  style={styles.football} source={Football}></Image>
            <Text style={styles.buttonText}>Goals (Gls), Assists(Ast) and Apps (appearences), are shown in 3 styles: </Text>
            </View>
            <View style={styles.stats}>
            <View style={styles.row}>
            <Text style={styles.statsTextG}>Gls: 37</Text>
            <Text style={styles.goalText}>exact number of goals</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.statsTextA}>Ats: 6</Text>
            <Text style={styles.goalText}>you are within 20 assits</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.statsTextGm}>Games: 120</Text>
            <Text style={styles.goalText}>you are not within 20</Text>
            </View>
            </View>
            <TouchableOpacity  style={styles.buttonGp} onPress={handleSubmit}>
                                <Text style={styles.buttonGpText}>How to play...Game Play Here    <Icon name="arrow-right" size={18} color='#0063A1' /></Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    background: {
        // borderWidth:4,
        alignSelf:'center',
        width: '110%',
        borderRadius:10,
        justifyContent: 'center',
        position:"relative",
        transform:[{translateY:-140}],
    }, 
     button: {
        backgroundColor: 'red',
        padding: 10,
        paddingLeft:17,
        borderRadius: '50%',
        alignItems: 'center',
        borderWidth:2,
        borderColor: 'white',
        opacity:.5,
        transform:[{translateX:70}],
    },
    football: {
        marginTop:5,
        height: 20,
        width: 20,
        marginLeft:5,
    },
    scrollViewContent: {
        flexGrow: 1, // This allows the ScrollView content to grow and take available space
        paddingBottom: 30, // Added some padding to the bottom
        // paddingTop: 20, // Added some padding to the top
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 1)',
        borderRadius: 9,
        borderWidth: 4,
        borderColor: '#0063A1',
        // paddingHorizontal: 15, // Added horizontal padding for better spacing
        paddingVertical: 20, 
      },
    row:{
        flexDirection:'row',
        marginBottom: 10,
    },
    rowGp:{
        marginBottom: 10,
        flexDirection:'row',
        //  borderWidth:1,
        //  borderColor:'white',
         justifyContent:'center',

    }, 
    buttonGp:{
   marginLeft:90
    },
    arrow:{
        height:20,
        width:20
    },
    stats: {
        // marginTop: -15,
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        borderWidth: 2,
        marginBottom: 5,
        width: '100%'

        // Optional: space between each stat text
    },
    statsTextA:{
        justifyContent: 'center',
        textAlign: 'center',
        marginHorizontal: 30,
        borderRadius: 10,
        display: 'flex',
        margin: 10,
        marginBottom: 1,
        padding: 5,
        fontSize: 16,
        lineHeight: 20,
        marginLeft:70,
        color: 'black',
        backgroundColor: 'gold',
        fontFamily: 'LuckiestGuy_400Regular',
        // Adjust font size as needed
    },
    statsTextG:{
        justifyContent: 'center',
        textAlign: 'center',
        marginHorizontal: 30,
        borderRadius: 10,
        display: 'flex',
        margin: 10,
        marginBottom: 1,
        padding: 5,
        fontSize: 16,
        lineHeight: 20,
        color: 'black',
        backgroundColor: 'green',
        fontFamily: 'LuckiestGuy_400Regular',
        // marginRight:50,
        marginLeft:65
        // Adjust font size as needed
    },
    statsTextGm:{
        justifyContent: 'center',
        textAlign: 'center',
        marginHorizontal: 30,
        borderRadius: 10,
        display: 'flex',
        margin: 10,
        marginBottom: 1,
        padding: 5,
        fontSize: 16,
        lineHeight: 20,
        color: 'white',
        backgroundColor: 'black',
        fontFamily: 'LuckiestGuy_400Regular',
        // Adjust font size as needed
    },
    searchBar:{
        height:110,
        width:'44%',
        borderRadius:10,
        transform:[{translateX:-5},{translateY:18} ],
    },
    andyJ:{
        height:175,
        width:'55%',
        borderRadius:15,
        transform:[{translateX:5},{translateY:15} ],
        marginBottom:10
    },
    andyJEx:{
        height:151,
        width:300,
        borderRadius:15,
        transform:[{translateX:30},{translateY:15} ],
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'VarelaRound_400Regular',
        opacity:1,
        color:'beige',
        marginLeft:5
    },
    buttonTextX: {
        fontSize: 16,
        fontFamily: 'VarelaRound_400Regular',
        opacity:1,
        marginRight:7,
        marginTop:1,
        color:'beige',
    },buttonGpText:{
        fontSize: 16,
        fontFamily: 'LuckiestGuy_400Regular',
        opacity:1,
        marginRight:7,
        marginTop:1,
        color:'#0063A1',
    },
    buttonText1: {
        fontSize: 16,
        fontFamily: 'LuckiestGuy_400Regular',
        opacity:1,
        marginTop:15,
        color: 'beige',
        marginLeft:10,
    },
    goalText: {
        fontSize: 16,
        fontFamily: 'VarelaRound_400Regular',
        opacity:1,
        color:'beige',
        // marginLeft:15,
        marginTop:10
    },
   gpText: {
        fontSize: 16,
        fontFamily: 'VarelaRound_400Regular',
        opacity:1,
        marginTop:15,
        color: 'beige',
        marginLeft:10,
        marginRight:5,
   },
    rowTitle:{
        flexDirection:'row',
        // borderWidth:1,
        borderColor:'white',
        justifyContent:'center',
        height:45,
    },
    title:{
        fontSize: 20,
        fontFamily: 'LuckiestGuy_400Regular',
        // color: 'white',
    //    textAlign:'center',
        opacity:1,
        color:'beige',
        marginLeft:15,
        padding: 10,
    }
});