import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Animated, Easing
} from "react-native"
import React,{ useEffect, useState } from "react";
import axios from "axios"
const Alan = require('../../../assets/images/shearer.png')
const Football = require('../../../assets/images/Football.png')
const slip = require('../../../assets/images/slip.png')
import { useFonts, Chewy_400Regular } from '@expo-google-fonts/chewy';
import { Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import { LuckiestGuy_400Regular } from '@expo-google-fonts/luckiest-guy';
import { Merriweather_700Bold } from '@expo-google-fonts/merriweather';

type Player = {
    name: string;
    assists: string;
    seasons: string[];
    goals: number;
    position: string;
    team: string[];
    playerUrl: string;
    teamUrl: string[];
    nationality: string;
    flagUrl: string;
    games: number;
};

export default function () {
    
    const [fontsLoaded] = useFonts({
        Chewy_400Regular,
        Fredoka_700Bold,
        LuckiestGuy_400Regular,
        Merriweather_700Bold
    });
    const youLose = "you've let this one slip!"
    const gameOver = "well done, same again tommorrow!"
    const greeting = "You have 10 shots at bagging the Barclaysman!"
    const [guessCount, setGuessCount] = useState(1)
    const [footballImages, setFootballImages] = useState<string[]>([]);
    const [playerStats, setPlayerStats] = useState<Player[]>([]);
    const [chosenPlayer, setChosenPlayer] = useState<Player | null>(null);
    const [searchText, setSearchText] = useState("")
    const [guesses, setGuesses] = useState<string[]>([]);
    const [gameComplete, setGameComplete] = useState(false);
    const [gameLost, setGameLost] = useState(false)

    const randomPlayer = (array: Player[]): Player => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    };

    const [fadeAnims, setFadeAnims] = useState<Animated.Value[]>([]); // Explicitly type the state as an array of Animated.Values
    const [translateXAnims, setTranslateXAnims] = useState<Animated.Value[]>([]); // For X translation
    const [translateYAnims, setTranslateYAnims] = useState<Animated.Value[]>([]); 

  useEffect(() => {
    if (footballImages.length > 0) {
        // Create new animations for the new ball
        const lastFadeAnim = new Animated.Value(0); // Fade animation
        const lastTranslateX = new Animated.Value(0); // Start position for X axis (e.g., off-screen to the left)
        const lastTranslateY = new Animated.Value(0); // Start position for Y axis (e.g., off-screen down)

        // Animate the fade-in and translation at the same time
        Animated.parallel([
            Animated.timing(lastFadeAnim, {
                toValue: 1, // Fade to full opacity
                duration: 500,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(lastTranslateX, {
                toValue: 0, // Move to normal position on the X axis
                duration: 500,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(lastTranslateY, {
                toValue: 0, // Move to normal position on the Y axis
                duration: 500,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]).start();

        // Append the new animations to the state arrays
        setFadeAnims(prev => [...prev, lastFadeAnim]);
        setTranslateXAnims(prev => [...prev, lastTranslateX]);
        setTranslateYAnims(prev => [...prev, lastTranslateY]);
    }
}, [footballImages])

    const handleGuess = (playerName: string) => {
        if (!guesses.includes(playerName)) {
            setGuesses([...guesses, playerName]);
            // setGuessCount() 
            setFootballImages(prev => [...prev, 'footballImage']); // Add new player gues
            setGuessCount(prevCount => prevCount + 1)
        }
        setSearchText("");

        const guessedPlayer = playerStats.find(player => player.name.toLowerCase() === playerName.toLowerCase());
        if (guessedPlayer && chosenPlayer) {
            if (guessedPlayer.name.toLowerCase() === chosenPlayer.name.toLowerCase()) { // Optionally, you can update the correctGuess state too
                setGameComplete(true);  // Set the gameComplete state to true
            }
        }
        if (guessCount === 10 && !gameComplete) {
            setGameLost(true); // Set the game to fail
            setGuesses(prevGuesses => [...prevGuesses, chosenPlayer?.name || '']); // Add the correct player to the guesses
        }
    };


    useEffect(() => {
        axios
            .get<Player[]>("https://not-spotle.onrender.com/api/playerstats")
            .then((response) => {
                setPlayerStats(response.data);
            })
            .catch((error) => console.error("Error fetching player stats:", error));
    }, []); // Fetch data only once when component mounts

    useEffect(() => {
        if (playerStats.length > 0) {
            setChosenPlayer(randomPlayer(playerStats));
        }
    }, [playerStats]);

    useEffect(() => {
        if (chosenPlayer) {
            console.log("Chosen Player:", chosenPlayer);
        }
    }, [chosenPlayer]);


    const filteredPlayers = searchText
        ? playerStats
            .filter(player => player.name.toLowerCase().startsWith(searchText.toLowerCase())) // Match by the first letter
            .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically
            .slice(0, 5) // Limit to 5 players
        : [];


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled">
                <View style={styles.innerContainer}>
                <View style={styles.chances}>
            {footballImages.map((image, index) => (
                 <Animated.View 
                key={index} 
                style={[
                    styles.football, 
                    { 
                        opacity: fadeAnims[index], // Apply fade-in animation
                        transform: [
                            { translateX: translateXAnims[index] }, // Apply X translation
                            { translateY: translateYAnims[index] }, // Apply Y translation
                        ]
                    }
                ]}
            >
                    <Image source={Football} style={styles.football} />
                </Animated.View>
            ))}
        </View>

                    <View style={styles.guesses}>
                        <Text style={[styles.guessText, (gameComplete || gameLost) && { opacity: 0 }]}>
                            {greeting}
                        </Text>

                        <TextInput
                            style={[styles.input, (gameComplete || gameLost) && styles.disabledInput]} // Conditionally add 'disabledInput' style
                            onChangeText={setSearchText}
                            value={searchText}
                            placeholder={gameComplete ? "Come back tomorrow for another go" : "Guess Here..."} // Conditionally change placeholder
                            editable={!gameComplete && !gameLost} // Disable the input when the game is complete or lost
                        />

                    </View>

                    {filteredPlayers.length > 0 && (
                        <View style={styles.list}>
                            {filteredPlayers.map((player) => (
                                <TouchableOpacity
                                    key={player.name}
                                    style={styles.listItem}
                                    onPress={() => handleGuess(player.name)}
                                >
                                    <Text style={styles.listtext}>{player.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                    {(gameComplete || gameLost) && (
                        <View style={styles.gameCompleteContainer}>
                            <View style={styles.completionBox}>
                                {/* Conditionally set the image based on game state */}
                                <ImageBackground
                                    style={styles.alan}
                                    source={gameLost ? slip : Alan} // Use `Slip` if gameLost is true, otherwise use `Alan`
                                    blurRadius={4}
                                >
                                    <Text style={styles.gameCompleteText}>
                                        "They think it's all over!... It is now!"
                                    </Text>
                                    <Text style={styles.gameCompleteText}>
                                        {gameComplete ? gameOver : gameLost ? youLose : ''}
                                    </Text>
                                </ImageBackground>
                            </View>
                        </View>
                    )}

                    {[...guesses].reverse().map((guess, index) => {
                        const guessedPlayer = playerStats.find((player) => player.name.toLowerCase() === guess.toLowerCase());
                        return guessedPlayer ? (
                            <View key={index} style={styles.player}>
                                <View style={styles.imagecontainer}>
                                    <Image source={{ uri: guessedPlayer.playerUrl }} style={styles.playerimage} />
                                    <View style={styles.playerName}>
                                        <Text
                                            style={
                                                styles.playerNameText}
                                        >
                                            {guess}
                                        </Text>
                                    </View>
                                    <View style={styles.teams}>
                                        <Text>
                                        </Text>

                                        {guessedPlayer.teamUrl.map((teamUrl, index) => {
                                            // Ensure both arrays (teamUrl and team) have the same length
                                            const team = guessedPlayer.team[index];

                                            // Check if the guessed team's name matches the chosen player's team
                                            const isMatch = chosenPlayer?.team.includes(team);

                                            return (
                                                <View key={index} style={styles.team}>
                                                    <Image
                                                        source={{ uri: teamUrl }}
                                                        style={[
                                                            styles.teamBadge,
                                                            !isMatch && { opacity: 0.3 } // Reduces brightness instead of full grayscale
                                                        ]}
                                                    />
                                                </View>
                                            );

                                        })}
                                    </View>
                                </View>


                                <View style={styles.statsContainer}>
                                    <View style={styles.stats}>
                                        <View style={styles.statsRowContainer}>
                                            <View style={styles.statsContainerZ}>

                                                <Image style={styles.flag} source={{ uri: guessedPlayer.flagUrl }} />
                                                <Text
                                                    style={[styles.flagText,
                                                    guessedPlayer.nationality === chosenPlayer?.nationality && styles.correctguess]}>{guessedPlayer.nationality}</Text>
                                            </View>
                                            <View style={styles.statsContainerX}>
                                                <View style={styles.seasonsContainer}>
                                                    {guessedPlayer.seasons.map((season, index) => {
                                                        // Check if the season is correct
                                                        const isCorrect = chosenPlayer?.seasons?.includes(season);

                                                        return (
                                                            <View key={index} style={styles.seasonNo}>
                                                                <Text
                                                                    style={[
                                                                        styles.seasonText,
                                                                        {
                                                                            fontSize: Math.max(25 - guessedPlayer.seasons.length, 10),
                                                                            // Add a green circle with 50% opacity if the season is correct
                                                                            ...(isCorrect
                                                                                ? {
                                                                                    textAlign: 'center',
                                                                                    borderWidth: 1,
                                                                                    borderColor: 'black',
                                                                                    borderRadius: 20, // Adjust this for the circle size
                                                                                    backgroundColor: 'rgba(0, 128, 0, 1)', // Green with 50% opacity
                                                                                    padding: 3, // Adjust padding as needed to make the circle fit around the text
                                                                                }
                                                                                : {}),
                                                                        },
                                                                    ]}
                                                                >
                                                                    {season}
                                                                </Text>
                                                            </View>
                                                        );
                                                    })}
                                                </View>
                                            </View>


                                        </View>


                                        {/* </View> */}
                                        <View>
                                            <View style={styles.row}>
                                                <Text
                                                    style={[
                                                        styles.stext,
                                                        Number(guessedPlayer.goals) === (Number(chosenPlayer?.goals) || 0) // Green if perfect match
                                                            ? styles.correctguess
                                                            : Math.abs(Number(guessedPlayer.goals) - (Number(chosenPlayer?.goals) || 0)) <= 10
                                                                ? styles.nearlyCorrectguess // Yellow if within 10
                                                                : null
                                                    ]}
                                                >
                                                    Gls: {guessedPlayer.goals}
                                                </Text>

                                                <Text
                                                    style={[
                                                        styles.stext,
                                                        guessedPlayer.position === chosenPlayer?.position && styles.correctguess
                                                    ]}
                                                >Pos: {guessedPlayer.position}</Text>

                                            </View>
                                            <View style={styles.row}>
                                                <Text
                                                    style={[
                                                        styles.stext,
                                                        Number(guessedPlayer.assists) === (Number(chosenPlayer?.assists) || 0) // Green if perfect match
                                                            ? styles.correctguess
                                                            : Math.abs(Number(guessedPlayer.assists) - (Number(chosenPlayer?.assists) || 0)) <= 10
                                                                ? styles.nearlyCorrectguess // Yellow if within 10
                                                                : null
                                                    ]}
                                                >
                                                    Ats: {guessedPlayer.assists}
                                                </Text>

                                                <Text
                                                    style={[
                                                        styles.stext,
                                                        Number(guessedPlayer.games) === (Number(chosenPlayer?.games) || 0) // Green if perfect match
                                                            ? styles.correctguess
                                                            : Math.abs(Number(guessedPlayer.games) - (Number(chosenPlayer?.games) || 0)) <= 25
                                                                ? styles.nearlyCorrectguess // Yellow if within 10
                                                                : null
                                                    ]}
                                                >
                                                    Apps: {guessedPlayer.games}
                                                </Text>
                                            </View>
                                        </View>
                                        {/* <Image style={styles.badge} source={{ uri: guessedPlayer.teamUrl[0]}} /> */}
                                    </View>

                                </View>
                            </View>
                        ) : null;
                    })}
                </View>
            </ScrollView>
        </View>
    );
}

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // borderWidth: 5
    },
    innerContainer: {
        // flex: 1, 
        justifyContent: "center",
    },
    guesses: {
        width: '100%',
        alignSelf: 'center',
    },
    guessText: {
        fontFamily: 'LuckiestGuy_400Regular',
        marginTop: 20,
        marginBottom: 10,
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    input: {
        // fontFamily: 'LuckiestGuy_400Regular',
        width: '90%',
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        padding:5,
        fontSize:18,
        alignSelf: 'center',
    },listtext:{
        color:'beige'
    },
    chances: {
        flexDirection: 'row',        // Arrange children (images) in a row
        flexWrap: 'wrap',            // Allow wrapping to the next line if needed
        justifyContent: 'flex-start',
        marginTop: 10,
        alignSelf: 'center',
        width: 400,
        height: 40,
    },
    football: {
        height: 40,
        width: 40
    },
    list: {
        alignSelf: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.65)", // Transparent dark blue
        borderRadius: 10,
        width: '90%',
        position: 'absolute', // This keeps the list above the player section
        zIndex: 10, // Ensure it sits above the player
        top: 153, // Adjust this value to control the vertical position // Optional: Add padding for spacing
    },
    listItem: {
        padding: 10,
        borderRadius:8,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        height: 'auto',
        width: '100%',

    },
    player: {
        // borderWidth:2,
        justifyContent: 'center',
        flexDirection: 'row',  // Layout children in a row (side by side)
        borderBottomWidth: 2,
        borderBottomColor: "grey",
        width: '99%',
        position: 'relative',  // Necessary for absolute positioning of child elements
    },
    imagecontainer: {
        alignContent: 'center',
        width: '35%',
        // width: width * 0.40, // Use 40% of screen width dynamically
        marginTop: 5,
        marginBottom: 6,
        marginRight: 1,
        shadowColor: 'blue', // Shadow color
        borderRadius: 10,
        shadowOffset: { width: 0, height: 4 }, // Shadow offset
        shadowOpacity: 0.2, // Shadow opacity (0 to 1)
        shadowRadius: 5, // Shadow blur radius
        backgroundColor: 'rgba(0, 0, 1, 0.15)',
        borderColor: 'grey',
        position: 'relative',
        overflow: 'hidden',
        flexDirection: 'row', // Use row direction to align elements horizontally
        alignItems: 'center', // Center vertically
        justifyContent: 'flex-end',
    },
    playerimage: {
        // borderWidth: 1,
        top: '5%', // Adjust the position to match the image
        // left: '49%', // Adjust based on where you want the player image to be positioned
        position: 'absolute', // Position it relative to the image container
        alignSelf: "center", // Adjust horizontal position if necessary
        height: 178,  // Set the size of the overlay image
        width: 90,
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 2 }, // X and Y shadow
        shadowOpacity: .8, // Adjust for darkness
        shadowRadius: 1, // Blur effect
    },
    playerName: {
        position: 'absolute',
        alignSelf: 'center', // Centers container horizontally
        width: 180,
        height: 190,
        justifyContent: 'center',  // Centers children vertically
        alignItems: 'center',
        transform: [{ translateX: 9 }],
        // marginLeft: '1%', // Add left margin
    },
    playerNameText: {
        fontFamily: 'LuckiestGuy_400Regular',
        color: 'beige',
        textAlign: 'center',  // Centers text inside the text component
        fontSize: 23,
        transform: [{ rotate: '-90deg' }],
        textShadowColor: 'black',  // Shadow color
        textShadowOffset: { width: 2, height: 1 },  // Shadow position
        textShadowRadius: 1,

    },
    teams: {
        // borderWidth: 1,
        height: '75%',
        width: 55,
        position: 'absolute',
        flexWrap: 'wrap', // Allows wrapping to new lines
        flexDirection: 'row', // Arrange items in a row
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ translateX: -90 }],// Align badges to the left
    },

    team: {
        width: '40%',  // Each team takes up 45% of the container width
        marginBottom: 10,  // Adds space between rows
        alignItems: 'center', // Centers the content
        justifyContent: 'center',  // Centers the content inside each team box
        marginRight: '1%', // Add left margin
    },
    flag: {
        // position: 'absolute',
        top: 8,
        height: 35,  // Set the size of the overlay image
        width: 50,
        borderRadius: 5,
        alignSelf: 'center'
    }, flagText:
    {
        justifyContent: 'center',
        textAlign: 'center',
        marginHorizontal: 5,
        borderRadius: 10,
        display: 'flex',
        margin: 10,
        marginBottom: 5,
        padding: 5,
        paddingTop: 10,
        fontSize: 15,
        lineHeight: 12,
        color: 'white',
        backgroundColor: 'black',
        fontFamily: 'LuckiestGuy_400Regular',
    },
    statsContainer: {
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        shadowColor: 'blue', // Shadow color (black)
        borderRadius: 10,
        shadowOffset: { width: 0, height: 4 }, // Shadow offset
        shadowOpacity: 0.2, // Shadow opacity (0 to 1)
        shadowRadius: 5, // Shadow blur radius
        backgroundColor: 'rgba(50, 0, 0, 0.3)',
        borderColor: 'grey',
        width: '60%'

        // Optional: space between the image and stats
    },
    statsRowContainer: {
        flexDirection: 'row', // Align the children in a row (horizontally)
        // justifyContent: 'space-between', // Add space between them if needed
        width: '100%' // Make sure the container takes up the full width
    },

    statsContainerZ: {
        marginTop: -50,
        marginLeft: -2,
        justifyContent: 'center',
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        shadowColor: 'blue',
        borderRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        backgroundColor: 'rgba(90, 45, 50, 0.3)',
        borderColor: 'grey',
        width: '25%', // Adjust width as needed
        height: 100,
    },
    statsContainerX: {
        marginTop: -50,
        justifyContent: 'center',
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        shadowColor: 'blue',
        borderRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        backgroundColor: 'rgba(50, 95, 50, 0.3)',
        borderColor: 'grey',
        width: '76%', // Adjust width as needed
        height: 100,
    },
    stats: {
        marginTop: 50,
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        // borderWidth: 2,
        marginBottom: 5,
        alignItems: 'center',
        width: '100%'
        // Optional: space between each stat text
    },
    stext: {
        justifyContent: 'center',
        textAlign: 'center',
        marginHorizontal: 5,
        borderRadius: 10,
        display: 'flex',
        margin: 10,
        marginBottom: 1,
        padding: 5,
        fontSize: 20,
        lineHeight: 20,
        color: 'white',
        backgroundColor: 'black',
        fontFamily: 'LuckiestGuy_400Regular',
        // Adjust font size as needed
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center', // Center everything
        alignItems: 'center',
        width: '100%',  // Ensure full width so justifyContent applies
    },
    correctguess: {
        alignSelf: 'center',
        margin: 10,
        color: 'black',
        borderWidth: 1,
        backgroundColor: 'green',
        borderColor: 'black',
        borderRadius: 9,
    },

    nearlyCorrectguess: {
        alignSelf: 'center',
        margin: 10,
        color: 'black',
        borderWidth: 1,
        backgroundColor: '#D4A800',
        borderColor: 'black',
        borderRadius: 9, // Yellow for nearly correct
    },

    teamBadge: {
        height: 20,
        width: 20,
        marginTop: 5,
    },
    seasonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Allows multiple rows
        justifyContent: "flex-start",
        alignItems: "flex-end",
        width: '100%',
        gap: 5, // Add space between items
    },
    seasonNo: {
        left: 13,
        flexBasis: '20%', // Adjust to fit four items per row (adjust as needed)
        justifyContent: 'center',
        alignItems: 'center',
    },
    seasonText: {
        fontFamily: 'LuckiestGuy_400Regular',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    country: {
        fontSize: 20,
        marginTop: 9,
        textAlign: 'center',
        fontFamily: 'LuckiestGuy_400Regular',
    },
    gameCompleteContainer: {
        position: 'absolute',
        top: 355,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)', // Gray overlay
        zIndex: 10,
        width: '99%',
        borderRadius: 9
        // height:'100%'
    },
    gameCompleteText: {
        marginTop: 30,
        fontFamily: 'LuckiestGuy_400Regular',
        fontSize: 20,
        color: 'white',
        textAlign: 'center', // Green background with transparency
        width: '100%',
    },
    disabledInput: {
        backgroundColor: '#f0f0f0', // Grey background to indicate disabled state
        opacity: 0, // Reduced opacity
    },
    slip, alan: {
        height: 127,
        width: '100%',
        zIndex: 5,
        opacity: 1,
    },
    completionBox: {
        position:"relative",
        alignItems: 'center', // Horizontally center the content
        justifyContent: 'center', // Center the content vertically within the box
        // backgroundColor: 'rgba(0, 0, 0, 0.65)', 
        borderRadius: 10, // Optional: rounded corners
        width: '100%', // Optional: control width of the box
        overflow: 'hidden', // Hide any overflow
        textAlign: 'center', // Ensure text is centered within the box
        height: 90, // Optional: Set a fixed height if needed
        zIndex: 5,
        transform: [{ translateY: -295 }],

    },
});
