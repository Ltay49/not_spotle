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
import React, { useEffect, useState } from "react";
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

    // Add new Animated.Value for translateY
const [completionCardTranslateY, setCompletionCardTranslateY] = useState(new Animated.Value(300)); 
const [completionCardTranslateX, setCompletionCardTranslateX] = useState(new Animated.Value(8)); // 

const [cardPositionAnimationCompleted, setCardPositionAnimationCompleted] = useState(false); 

const [imageVisible, setImageVisible] = useState(false); // Controls when the image appears
const [imageOpacity, setImageOpacity] = useState(new Animated.Value(0)); // For fade-in effect

// Animate the completion card when the game ends
useEffect(() => {
    if (gameComplete || gameLost) {
        // Animate the Y and X position of the completion card
        Animated.parallel([
            Animated.timing(completionCardTranslateY, {
                toValue: 0, // Move to normal position on Y
                duration: 2000,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(completionCardTranslateX, {
                toValue: 8, // Nudge the card 50 units to the right
                duration: 2000,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Set flag to true once the card has finished animating
            setCardPositionAnimationCompleted(true); // Indicates animation is completed
        });
    }
}, [gameComplete, gameLost]);

useEffect(() => {
    if (cardPositionAnimationCompleted) {
        // Wait 2 seconds after the card animation
        const timeoutId = setTimeout(() => {
            setImageVisible(true); // Show the image
            // Animate the image opacity to make it fade in
            Animated.timing(imageOpacity, {
                toValue: 1, // Full opacity (fade-in)
                duration: 3000, // Duration for the fade-in
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
        }, 0); // 2000ms = 2 seconds delay for the image

        // Cleanup timeout if the component is unmounted or before the animation triggers
        return () => clearTimeout(timeoutId);
    }
}, [cardPositionAnimationCompleted]);


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
            // setGuesses(prevGuesses => [...prevGuesses, chosenPlayer?.name || '']); // Add the correct player to the guesses
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
                            <View style={styles.compContainer}>
                            <Animated.View 
            style={[
                styles.completionCard,
                { 
                    transform: [
                        { translateY: completionCardTranslateY },
                        { translateX: completionCardTranslateX } // Nudge the card to the right
                    ]
                }
            ]}
        >             
                           <Animated.View style={[styles.completionImageCard, {opacity: gameLost ? imageOpacity : 1}]}>
                            <Image source={{ uri: chosenPlayer?.playerUrl }} style={[styles.playerimageComplete, {shadowColor: gameLost ? 'red' : 'green'} ]}/>
                            </Animated.View>
                            {/* , { opacity: imageOpacity }] */}
                            <Animated.View style={[styles.completionTextBox,{opacity: gameLost ? imageOpacity : 1}]}>
                            <Text style={[styles.playerNameTextComplete, { color: gameLost ? 'red' : 'green' }]}>{chosenPlayer?.name}</Text>
                            </Animated.View>
                            <Animated.View>

                            </Animated.View>
                            <Image style={styles.flagC} source={{uri: chosenPlayer?.flagUrl}}/>
                            <Animated.View style={styles.statsComplete}>
                                <Text style={[styles.stextC, { color: gameLost ? 'red' : 'green' }]}>Assists: {chosenPlayer?.assists}</Text>
                                <Text style={[styles.stextC, { color: gameLost ? 'red' : 'green' }]}>Goals: {chosenPlayer?.goals}</Text>
                                <Text style={[styles.stextC, { color: gameLost ? 'red' : 'green' }]}>Games: {chosenPlayer?.games}</Text>
                                <Text style={[styles.stextC, { color: gameLost ? 'red' : 'green' }]}>Position: {chosenPlayer?.position}</Text>
                            </Animated.View>
                                <Animated.View style={styles.teamsComplete}>
                            {chosenPlayer?.teamUrl.map((teamUrl, index) => {
                                            // Ensure both arrays (teamUrl and team) have the same length
                                            const team = chosenPlayer.team[index];
                                            return (
                                
                                                <View key={index} style={styles.teamC}>
                                                    <Image
                                                        source={{ uri: teamUrl }}
                                                        style={
                                                            styles.teamBadgec
                                                        }
                                                    />
                                                </View>
                                            );

                                        })}
                                </Animated.View>
                            </Animated.View>
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
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    input: {
        // fontFamily: 'LuckiestGuy_400Regular',
        width: '90%',
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        padding: 5,
        fontSize: 18,
        alignSelf: 'center',
    }, listtext: {
        color: 'beige'
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
        borderRadius: 8,
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
        position: 'relative', 
         // Necessary for absolute positioning of child elements
    },
    imagecontainer: {
        alignContent: 'center',
        width: '35%',
        // width: width * 0.40, // Use 40% of screen width dynamically
        marginTop: 5,
        marginLeft: 5,
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
        height: 190,  // Set the size of the overlay image
        width: 90,
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 2 }, // X and Y shadow
        shadowOpacity: .8, // Adjust for darkness
        shadowRadius: 1, 
        transform: [{ translateX: 9 }],// Blur effect
    },
    playerimageComplete: {
        // borderWidth: 1,
        // borderColor:'white',
        marginTop: 10, // Adjust the position to match the image
        // left: '49%', // Adjust based on where you want the player image to be positioned // Position it relative to the image container
        alignSelf: "center", // Adjust horizontal position if necessary
        height: 225,  // Set the size of the overlay image
        width: 180,
        shadowColor: 'green',
        shadowOffset: { width: 2, height: 0 }, // X and Y shadow
        shadowOpacity: .8, // Adjust for darkness
        shadowRadius: 1,
        resizeMode: "contain",
        transform: [{ translateX: -8 }]
        // position: 'relative',
    },  
    completionImageCard:{
        marginTop: 10, // Adjust the position to match the image
        position:'relative', 
        // borderWidth: 1,
        borderColor:'white',
        transform: [{ translateX: 185 }],
        // height: 400,
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

    },completionTextBox:{
        justifyContent:'center',
        alignContent:'center',
        // borderWidth:1,
        borderColor:'white',
        width: 200,
        height:260,
        position:'absolute',
        transform: [{ translateX: -61 }]
    },
    playerNameTextComplete:{
        // marginTop: 120,
        // marginRight:130,
        fontFamily: 'LuckiestGuy_400Regular',
        color: 'green',
        textAlign: 'center',  // Centers text inside the text component
        fontSize: 30,
        transform: [{ rotate: '-90deg' }],
        textShadowColor: 'beige',  // Shadow color
        textShadowOffset: { width: 2, height: 1 },  // Shadow position
        textShadowRadius: 1,
        opacity:.9
        
    },
    completionCard:{
            marginTop:5,
            position:'relative',
            width:'96%',
            height:265,
            flexDirection:'row',
            justifyContent:'center',
            alignContent:'center',
            // transform: [{ translateX: 18 }],
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderRadius:5,
    },
    teams: {
        // borderWidth: 1,
        height: '99%',
        width: 30,
        position: 'absolute',
        flexWrap: 'wrap', // Allows wrapping to new lines
        // flexDirection: 'row', // Arrange items in a row
        alignItems: 'flex-start',
        justifyContent: 'center',
        transform: [{ translateX: -105 }],// Align badges to the left
    },
    teamsComplete: {
        borderWidth: 1,
        borderColor:'white',
        height: '55%',
        width: 100,
        position: 'relative',
        flexWrap: 'wrap', // Allows wrapping to new lines
        flexDirection: 'row', // Arrange items in a row
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ translateX: -344 }, {translateY:80}],// Align badges to the left
    },
    team: {
        width: '99%',  // Each team takes up 45% of the container width
        // marginBottom: 5,  // Adds space between rows
        alignItems: 'center', // Centers the content
        justifyContent: 'center',  // Centers the content inside each team box
        // marginRight: '1%', // Add left margin
    },
    teamC: {
        borderWidth: 1,
        borderColor:'white',
        width: '40%',  // Each team takes up 45% of the container width
        marginBottom: 4,  // Adds space between rows
        alignItems: 'center', // Centers the content
        justifyContent: 'center',  // Centers the content inside each team box
        marginRight: '5%', // Add left margin
    },
    teamBadgec: {
        height: 28,
        width: 28,
        marginTop: 5,
    },
    flag: {
        // position: 'absolute',
        top: 8,
        height: 35,  // Set the size of the overlay image
        width: 50,
        borderRadius: 5,
        alignSelf: 'center'
    }, 
    flagC:{
        opacity:.9,
        borderRadius: 5,
        height: 50,  // Set the size of the overlay image
        width: 80,
        transform: [{ translateX: -105 },{ translateY: 30 } ],
    },
    flagText:
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
        width: '61%'

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
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        // borderWidth: 2,
        marginBottom: 5,
        alignItems: 'center',
        width: '100%'
        // Optional: space between each stat text
    },
    statsComplete: {
        // marginTop: 50,
        position:'relative',
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        // borderWidth: 2,
        marginBottom: 5,
        // alignItems: 'flex-end',
        width: '40%',
        transform: [{ translateX:45}]
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
    stextC: {
        // justifyContent: 'center',
        // textAlign: 'center',
        marginHorizontal: 5,
        borderRadius: 10,
        display: 'flex',
        margin: 10,
        marginBottom: 1,
        padding: 5,
        fontSize: 20,
        lineHeight: 20,
        color: 'green',
        // backgroundColor: 'white',
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
        borderWidth:1
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
        top: 1,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)', // Gray overlay
        zIndex: 10,
        width: '100%',
        borderRadius: 9,
        alignContent:'center',
        overflow: 'hidden',
    },
    gameCompleteText: {
        marginTop: 35,
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
        position: "relative",
        alignItems: 'center', // Horizontally center the content
        justifyContent: 'center', // Center the content vertically within the box
        // backgroundColor: 'rgba(0, 0, 0, 0.65)', 
        borderRadius: 10, // Optional: rounded corners
        width: '100%', // Optional: control width of the box
        overflow: 'hidden', // Hide any overflow
        textAlign: 'center', // Ensure text is centered within the box
        height: 90, // Optional: Set a fixed height if needed
        zIndex: 5,
        // transform: [{ translateY: -295 }],

    },
    compContainer:{
        overflow:'hidden'
    }
});
