import { View,Animated,Text, Image, StyleSheet, ScrollView, TouchableOpacity} from "react-native"
const Football = require('../../../assets/images/Football.png')
const AndyJ = require('../../../assets/images/AndyJ.png')
const SearchBar = require('../../../assets/images/searchBar.png')

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
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.overlay}>
                <View style={styles.rowTitle}>
                <Text style={styles.title}>How To Play</Text>
            <TouchableOpacity  style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonTextX} >X</Text>
            </TouchableOpacity>
            <View>
            </View>
            </View>
            <Text style={styles.buttonText1}>THE AIM</Text>
            <Text style={styles.buttonText}>Bag the Barclaysman within 10 shots</Text>
            <Text style={styles.buttonText1}>THE STATS</Text>
            <View style={styles.row}>
                <Image  style={styles.football} source={Football}></Image>
                <Text style={styles.buttonText}> All the players and stats range from 2001 to 2015 - 'The Barclays Era'</Text>
            </View>
            <View style={styles.row}>
                <Image  style={styles.football} source={Football}></Image>
                <Text style={styles.buttonText}>You need to narrow down the who the Barclaysman of the day is via their; Goals, Assists, Games, Position, Teams, Sesaons Played and Nationality</Text>
            </View>
            <View style={styles.row}>
            <Image  style={styles.football} source={Football}></Image>
            <Text style={styles.buttonText}>The green inidciates it's a perfect match so in this example you are looking for a player with...</Text>
            </View>
            <Text style={styles.buttonText1}>Game pLay</Text>
            <View style={styles.rowGp}>
            <Text style={styles.buttonText}>Step1 . Begin by typing your guess</Text>
            <Text style={styles.buttonText}>Step2. your guess will apear, you also notice your guesses remaining has updated along side your shootout image</Text>
            </View>
            <View style={styles.row}>
            <Image style={styles.pic} source={SearchBar}></Image>  
            <Image style={styles.pic1} source={AndyJ}></Image>
            </View>   
            <Image style={styles.pic} source={SearchBar}></Image>     
            </View>
            </ScrollView>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    background: {
        alignSelf:'center',
        flex: 1,
        width: '110%',
        // height: 200,
        borderRadius:10,
        borderWidth:2,
        borderColor:'#0063A1',
        justifyContent: 'center',
        // alignContent:'center',
        position:"relative",
        transform:[{translateY:-140}],
    },  button: {
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
        marginTop:10,
        height: 20,
        width: 20
    },
    scrollContainer:{
        transform:[{translateY:0}],
        flexGrow: 1,
        borderWidth:2,
        borderColor:'grey',
        borderRadius:10,
        // height:400,
        position:'absolute',
        backgroundColor: 'rgba(0, 0, 0, 1)',
    },
    overlay: {
        display:'flex',
        backgroundColor: 'rgba(0, 0, 0, 1)',
        overflow:'scroll'
    },
    row:{
        flexDirection:'row'
    },
    rowGp:{
        flexDirection:'row',

    },
    pic:{
        height:110,
        width:'44%',
        borderRadius:10,
        transform:[{translateX:15},{translateY:40} ],
    },
    pic1:{
        height:145,
        width:'44%',
        borderRadius:15,
        transform:[{translateX:30},{translateY:40} ],
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'VarelaRound_400Regular',
        // color: 'white',
    //    textAlign:'center',
        opacity:1,
        color:'beige',
        marginLeft:5
    },
    buttonTextX: {
        fontSize: 16,
        fontFamily: 'VarelaRound_400Regular',
        // color: 'white',
    //    textAlign:'center',
        opacity:1,
        marginRight:7,
        marginTop:1,
        color:'beige',
    },
    buttonText1: {
        fontSize: 16,
        fontFamily: 'LuckiestGuy_400Regular',
        // color: 'white',
    //    textAlign:'center',
        opacity:1,
        marginTop:15,
        color: 'beige',
        marginLeft:10,
        // borderWidth:1,
        // borderColor:'white'

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