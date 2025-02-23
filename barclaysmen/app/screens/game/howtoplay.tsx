import { View,Animated,Text, Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground} from "react-native"
import { JumpingTransition } from "react-native-reanimated"
const Football = require('../../../assets/images/Football.png')
const AndyJ = require('../../../assets/images/AndyJ.png')
const SearchBar = require('../../../assets/images/searchBar.png')
const JulioArca = require('../../../assets/images/JulioArca.png')
const WrongNation = require('../../../assets/images/wrongNation.png')
const CorrectNation = require('../../../assets/images/correctNation.png')

const Lua = require('../../../assets/images/LuaLua.png');
import Icon from 'react-native-vector-icons/FontAwesome';
"https://i.ibb.co/NXny8GS/birm.png"
"https://i.ibb.co/Kz5VSfQP/Ars.png"
"https://i.ibb.co/hJhSxL1s/pompy.png"

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
            {/* <ScrollView contentContainerStyle={styles.scrollViewContent}> */}
            <View style={styles.overlay}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.rowTitle}>
                <Text style={styles.title}>How To Play</Text>
            <TouchableOpacity  style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonTextX}>X</Text>
            </TouchableOpacity>
            </View>
            <Text style={styles.buttonText1}>THE AIM</Text>
            <Text style={styles.buttonText}>Bag the Barclaysman within 10 shots, the game is a nostalgic replay back to the iconic Barclays Premier League. This is a demo so there is only 100-200 players in the game so far</Text>
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
            <Text style={styles.goalText}>you are not within 20 games</Text>
            </View>
            </View>
            <View style={styles.row}>
                <Image  style={styles.football} source={Football}></Image>
                <Text style={styles.buttonText}>Nationality, Seasons Played and Position are only validated by a green background they either perfectly match or do not</Text>
            </View>
            <View>
                <Text style={styles.headers}>Nationality</Text>
            <View style={styles.row}>
            <Image style={styles.icons} source={{uri:'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/1600px-Flag_of_England.svg.png?20111003040319'}}/>
            <Icon name="times" size={35} color="red"/>
            <Image style={styles.iconsFra} source={{uri:'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/510px-Flag_of_France.svg.png'}}/>
            <Icon name="check" size={35} color="green" />
            <View>
            <Text style={styles.headerP}>Position</Text>
            <View style={styles.row}>
                <Text style={styles.statsPos}>POS:DEF</Text>
                <Icon name="times" size={35} color="red"/>
                </View>
                <View style={styles.row}>
                <Text style={styles.statsPosW}>POS:FOR</Text>
                <Icon name="check" size={35} color="green"/>
                </View>
            </View>
            </View>
            <View style={styles.row}>
            <Text style={styles.statsEng}>ENG</Text>
            <Text style={styles.statsFra}>FRA</Text>
            </View>
            <Text style={styles.headerSP}>Seasons Played</Text>
            <View style={styles.row}>
            <View style={styles.box}>
                <ImageBackground source={Lua} style={styles.lua} blurRadius={4} borderRadius={20}> </ImageBackground>
            <Text style={styles.numbers}>01</Text>
            <Text style={styles.numbers}>02</Text>
            <Text style={styles.numbersC}>03</Text>
            <Text style={styles.numbersC}>04</Text>
            <Text style={styles.numbersC}>05</Text>
            <Text style={styles.numbersC}>06</Text>
            <Text style={styles.numbers}>07</Text>
            </View>
            <Text style={styles.seasonText}>Your guess played between 01 & 06, the highlighted numbers show that 'The Barclaysman' only played between 2003 & 2006 </Text>
            </View>
            </View>
            <Image/>
            <View style={styles.row}>
                <Image  style={styles.footballTeams} source={Football}></Image>
                <Text style={styles.teamsText}>Teams also are either a match or not, a guessed players teams defaults to a faded colour if the player guessed has played for the same team then it will appear in full colour</Text>
            </View>
            <View style={styles.row}>
            <View style={styles.box1}>
            <ImageBackground source={Lua} style={styles.lua1} blurRadius={4} borderRadius={20}> </ImageBackground>
            <Image  style={styles.badgeC} source={{uri:"https://i.ibb.co/hJhSxL1s/pompy.png"}}></Image>
            <Image style={styles.badge}source={{uri:"https://i.ibb.co/Kz5VSfQP/Ars.png"}}></Image>
            <Image style={styles.badgeC}source={{uri:"https://i.ibb.co/NXny8GS/birm.png"}}></Image>
            </View>
            <Text style={styles.badgesText}>Your guess played for Portsmouth, Arsenal and Birmingham. Only Birmingham and Portsmoth have full colour though, this shows us that out of those three teams 'The Barclaysman' has played for Portsmouth and Birmingham</Text>
            </View>
            <TouchableOpacity  style={styles.buttonGp} onPress={handleSubmit}>
                                <Text style={styles.buttonGpText}>How to play...Game Play Here    <Icon name="arrow-right" size={18} color='#0063A1' /></Text>
            </TouchableOpacity>
            </ScrollView>
          </View>
          {/* </ScrollView> */}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    background: {
        // borderWidth:4,
        borderColor:'green',
        alignSelf:'center',
        width: '110%',
      flex:1,
        borderRadius:10,
        justifyContent: 'center',
        position:"relative",
        transform:[{translateY:-140}],
    }, 
lua:{
height:70,
width:152,
borderRadius:10,
transform:[{translateY:30},{translateX:-6} ],
},
lua1:{
    height:110,
    width:30,
    borderRadius:10,
    transform:[{translateY:0},{translateX:0} ],
    },
badge:{
height:30,
width:30,
opacity:0.3,
transform:[{translateY:-110},{translateX:0} ],
},
badgeC:{
    marginVertical:5,
    transform:[{translateY:-110},{translateX:0} ],
    height:30,
    width:30
    },
    numbers:{
        fontSize:16,
        marginLeft:8,
        marginTop:-30,
        fontFamily: 'LuckiestGuy_400Regular',
    },
    numbersC:{
        marginTop:-0,
        padding:5,
        fontSize:18,
        marginLeft:8,
        borderRadius:'50%',
        borderColor:'black',
        borderWidth:1,
        backgroundColor:'green',
        transform:[{translateY:-35}],        
        fontFamily: 'LuckiestGuy_400Regular',
    },
    box:{
        backgroundColor: 'rgba(225, 225, 225,1)',
        width:150,
        height:70,
        borderRadius:10,
        transform:[{translateX:10}],
        marginBottom:60,
        display:'flex',
        flexDirection:'row',
        padding:5,
        justifyContent:'flex-start',
        alignContent:'center',
        flexWrap: 'wrap'
    },
    box1:{
        height:110,
        width:30,
        backgroundColor:'white',
        borderRadius:10,
        transform:[{translateX:10}],
    },
    icons:{
        height:45,
        width:60,
        borderRadius:5,
        marginLeft:20,
    },
    iconsFra:{
        height:45,
        width:60,
        borderRadius:5,
        marginLeft:10,
    },
     button: {
        backgroundColor: 'red',
        padding: 10,
        paddingLeft:17,
        borderRadius: '50%',
        alignItems: 'center',
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
    footballTeams: {
        marginTop:-15,
        height: 20,
        width: 20,
        marginLeft:5,
    },
    scrollViewContent: {
        padding:10,
        flexGrow: 1, // This allows the ScrollView content to grow and take available space
        paddingBottom: 60, // Added some padding to the bottom
        // paddingTop: 20, // Added some padding to the top
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 1)',
        borderRadius: 9,
        borderWidth: 4,
        borderColor: '#0063A1',
        // paddingHorizontal: 15, // Added horizontal padding for better spacing
        // paddingVertical: 10, 
        height:610,
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
        marginTop:0,
   marginLeft:90
    },
    stats: {
        // marginTop: -15,
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        // borderWidth: 2,
        marginBottom: 5,
        width: '100%'

        // Optional: space between each stat text
    },
    statsTextA:{
        justifyContent: 'center',
        textAlign: 'center',
        marginHorizontal: 15,
        borderRadius: 10,
        display: 'flex',
        margin: 1,
        marginBottom: 1,
        padding: 5,
        fontSize: 16,
        lineHeight: 20,
        marginLeft:60,
        color: 'black',
        backgroundColor: 'gold',
        fontFamily: 'LuckiestGuy_400Regular',
        // Adjust font size as needed
    },
    statsTextG:{
        justifyContent: 'center',
        textAlign: 'center',
        marginHorizontal: 15,
        borderRadius: 10,
        display: 'flex',
        margin: 1,
        marginBottom: 1,
        padding: 5,
        fontSize: 16,
        lineHeight: 20,
        color: 'black',
        backgroundColor: 'green',
        fontFamily: 'LuckiestGuy_400Regular',
        // marginRight:50,
        marginLeft:53
        // Adjust font size as needed
    },
    statsTextGm:{
        justifyContent: 'center',
        textAlign: 'center',
        marginHorizontal: 15,
        borderRadius: 10,
        display: 'flex',
        margin: 1,
        marginBottom: 1,
        padding: 5,
        fontSize: 16,
        lineHeight: 20,
        color: 'white',
        backgroundColor: 'black',
        fontFamily: 'LuckiestGuy_400Regular',
        // Adjust font size as needed
    },
    statsEng:{
        marginHorizontal: 10,
        borderRadius: 10,
        display: 'flex',
        marginTop:-43,
        margin: 1,
        marginBottom: 1,
        marginLeft:25,
        padding: 5,
        fontSize: 16,
        lineHeight: 0,
        color: 'white',
        backgroundColor: 'black',
        fontFamily: 'LuckiestGuy_400Regular',
        // Adjust font size as needed
    },
    statsFra:{
        marginBottom: 55,
        marginHorizontal: 40,
        borderRadius: 5,
        marginTop:-55,
        marginLeft:50,
        margin: 1,
        padding: 10,
        paddingTop:15,
        fontSize: 16,
        lineHeight: 0,
        color: 'black',
        backgroundColor: 'green',
        fontFamily: 'LuckiestGuy_400Regular',
        // Adjust font size as needed
    },
    statsPos:{
        marginHorizontal: 10,
        borderRadius: 5,
        marginTop:5,
        margin: 1,
        marginBottom:10,
        padding: 10,
        paddingTop:15,
        fontSize: 16,
        lineHeight: 0,
        marginLeft:25,
        color: 'white',
        backgroundColor: 'black',
        fontFamily: 'LuckiestGuy_400Regular',
        // Adjust font size as needed
    },
    statsPosW:{
        marginLeft:25,
        marginHorizontal: 5,
        borderRadius: 5,
        marginTop:7,
        margin: 1,
        marginBottom:10,
        padding: 10,
        paddingTop:15,
        fontSize: 16,
        lineHeight: 0,
        color: 'black',
        backgroundColor: 'green',
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
    headers: {
        fontSize: 16,
        fontFamily: 'VarelaRound_400Regular',
        opacity:1,
        color:'beige',
        marginLeft:55,
       paddingBottom:5
    },
    headerP: {
        fontSize: 16,
        fontFamily: 'VarelaRound_400Regular',
        opacity:1,
        color:'beige',
        marginLeft:55,
       paddingBottom:5,
       marginTop:-20
    },
    headerSP: {
        fontSize: 16,
        fontFamily: 'VarelaRound_400Regular',
        opacity:1,
        color:'beige',
        marginLeft:28,
       paddingBottom:5,
       marginTop:-50
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
        marginTop:4,
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
    teamsText: {
        fontSize: 16,
        fontFamily: 'VarelaRound_400Regular',
        opacity:1,
        color:'beige',
        marginLeft:5,
        marginTop:-20
    },
    goalText: {
        fontSize: 16,
        fontFamily: 'VarelaRound_400Regular',
        opacity:1,
        color:'beige',
        // marginLeft:15,
        marginTop:0
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
   seasonText: {
    fontSize: 16,
    fontFamily: 'VarelaRound_400Regular',
    opacity:1,
    marginTop:-25,
    color: 'beige',
    marginLeft:20,
    marginRight:5,
},
badgesText: {
    fontSize: 16,
    fontFamily: 'VarelaRound_400Regular',
    opacity:1,
    marginTop:-2,
    color: 'beige',
    marginLeft:20,
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