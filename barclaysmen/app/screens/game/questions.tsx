import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Animated, Easing,
} from "react-native"

import React, { useEffect, useState } from "react";
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";
const Alan = require('../../../assets/images/shearer.png')
const Football = require('../../../assets/images/Football.png')
const slip = require('../../../assets/images/slip.png')
import { useFonts, Chewy_400Regular } from '@expo-google-fonts/chewy';
import { LuckiestGuy_400Regular } from '@expo-google-fonts/luckiest-guy';
import { VarelaRound_400Regular } from '@expo-google-fonts/varela-round';

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
        VarelaRound_400Regular,
        LuckiestGuy_400Regular,

    });

    const [timeRemaining, setTimeRemaining] = useState("00:00:00");

    const fetchPlayerStats = async () => {
        try {
            const response = await axios.get<Player[]>("https://notspotle-production.up.railway.app/api/playerstats");
            setPlayerStats(response.data);
        } catch (error) {
            console.error("Error fetching player stats:", error);
        }
    };

    const youLose = "you've let this one slip!"
    const gameOver = "well done, same again tommorrow!"
    const [guessCount, setGuessCount] = useState(0)
    const [footballImages, setFootballImages] = useState<string[]>([]);
    const [playerStats, setPlayerStats] = useState<Player[]>([]);
    const [chosenPlayer, setChosenPlayer] = useState<Player | null>(null);
    const [searchText, setSearchText] = useState("")
    const [guesses, setGuesses] = useState<string[]>([]);
    const [gameComplete, setGameComplete] = useState(false);
    const [gameLost, setGameLost] = useState(false)
    const greeting = `You have ${10 - guessCount} shots remaining!`
    const randomPlayer = (array: Player[]): Player => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    };

    const [timeboxTranslateX] = useState(new Animated.Value(-300)); // Start with some offset on Y axis
    const [timeboxOpacity] = useState(new Animated.Value(0));

    const [fadeAnims, setFadeAnims] = useState<Animated.Value[]>([]); // Explicitly type the state as an array of Animated.Values
    const [translateXAnims, setTranslateXAnims] = useState<Animated.Value[]>([]); // For X translation
    const [translateYAnims, setTranslateYAnims] = useState<Animated.Value[]>([]);

    // Add new Animated.Value for translateY
    const [completionCardTranslateY, setCompletionCardTranslateY] = useState(new Animated.Value(200));
    const [completionCardTranslateX, setCompletionCardTranslateX] = useState(new Animated.Value(8)); // 

    const [cardPositionAnimationCompleted, setCardPositionAnimationCompleted] = useState(false);

    const [imageVisible, setImageVisible] = useState(false); // Controls when the image appears
    const [imageOpacity, setImageOpacity] = useState(new Animated.Value(0)); // For fade-in effect

    const loadGameState = async () => {
        try {
            const savedGameState = await AsyncStorage.getItem('gameState');
            if (savedGameState) {
                const parsedGameState = JSON.parse(savedGameState);

                // Set state only if parsedGameState is not undefined or null
                setGuesses(parsedGameState?.guesses || []);
                setChosenPlayer(parsedGameState?.chosenPlayer || null);
                setGameComplete(parsedGameState?.gameComplete || false);
                setGameLost(parsedGameState?.gameLost || false);
                setGuessCount(parsedGameState?.guessCount || 0);
                setFootballImages(parsedGameState?.footballImages || []);
            }
        } catch (error) {
            console.error('Error loading game state:', error);
        }
    };

    const saveGameState = async () => {
        try {
            const gameState = {
                guesses,
                chosenPlayer,
                gameComplete,
                gameLost,
                guessCount,
                footballImages,
            };

            await AsyncStorage.setItem('gameState', JSON.stringify(gameState));
        } catch (error) {
            console.error('Error saving game state:', error);
        }
    };
    const resetGame = async () => {
        try {
            console.log("Resetting game...");
            // Clear out all AsyncStorage data related to the game
            await AsyncStorage.removeItem('guesses');
            await AsyncStorage.removeItem('chosenPlayer');
            await AsyncStorage.removeItem('gameComplete');
            await AsyncStorage.removeItem('gameLost');
            await AsyncStorage.removeItem('guessCount');
            await AsyncStorage.removeItem('footballImages');
            await AsyncStorage.removeItem('cardPositionAnimationCompleted');
            await AsyncStorage.removeItem('timeRemaining');
            
            setGuesses([]); // Reset guesses
            setChosenPlayer(null); // Reset chosen player to null
            setGameComplete(false); // Reset gameComplete state to false
            setGameLost(false); // Reset gameLost state to false
            setGuessCount(0); // Reset guess count to 0
            setFootballImages([]); // Reset football images state
            setCardPositionAnimationCompleted(false); // Reset card position animation state
            setTimeRemaining("00:00:00"); // Reset time remaining to 00:00:00
    
            // Reset animations
            timeboxTranslateX.setValue(-300);
            timeboxOpacity.setValue(0);
            fadeAnims.forEach(anim => anim.setValue(0));
            translateXAnims.forEach(anim => anim.setValue(0));
            translateYAnims.forEach(anim => anim.setValue(200));
            completionCardTranslateY.setValue(200);
            completionCardTranslateX.setValue(8);
            
            window.location.reload();

            // Hide image initially
            setImageVisible(false);
            setImageOpacity(new Animated.Value(0));
    
            // Fetch player stats again if needed
            await fetchPlayerStats(); // Assuming you might need to fetch new player stats or reset player data
            
            if (playerStats.length > 0) {
                const dateSeed = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD' format
                const playerIndex = Math.abs(dateSeed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % playerStats.length;
                setChosenPlayer(playerStats[playerIndex]);
            }
    
        } catch (error) {
            console.error('Error resetting game:', error);
        }
    };
    


    useEffect(() => {
        const checkAndResetGame = async () => {
            const lastResetTime = await AsyncStorage.getItem('lastResetTime');
            const currentTime = new Date().getTime();
            
            // If there's no last reset time, reset the game immediately
            if (!lastResetTime) {
                console.log("No last reset time, resetting game...");
                await resetGame();
                await AsyncStorage.setItem('lastResetTime', currentTime.toString());  // Save the current time
                return;
            }
    
            const timeElapsed = currentTime - parseInt(lastResetTime);
            
            // If more than 24 hours have passed, reset the game
            if (timeElapsed > 24 * 60 * 60 * 1000) {
                console.log("More than 24 hours passed, resetting game...");
                await resetGame();
                await AsyncStorage.setItem('lastResetTime', currentTime.toString());  // Save the new reset time
                return;
            }
    
            // Calculate the target time (e.g., 17:10:00 of the current or next day)
            const targetTime = new Date();
            targetTime.setHours(20, 10, 0, 0);
            if (currentTime > targetTime.getTime()) {
                targetTime.setDate(targetTime.getDate() + 1); // Move to the next day if target time has passed
            }
    
            const timeDifference = targetTime.getTime() - currentTime;
            
            // If time difference is <= 10 seconds, reset the game
            if (timeDifference <= 10000) {
                console.log("Time has passed, resetting game...");
                await resetGame();
                await AsyncStorage.setItem('lastResetTime', currentTime.toString());  // Save the new reset time
                return;
            }
    
            // Otherwise, continue the countdown as usual
            const hours = Math.floor(timeDifference / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
            setTimeRemaining(
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
            );
        };
    
        // Initial check when the component mounts
        checkAndResetGame();
    
        const intervalId = setInterval(() => {
            checkAndResetGame(); // Check every second if we need to reset the game
        }, 1000);
    
        const handleVisibilityChange = async () => {
            console.log("Visibility change detected");
    
            if (document.visibilityState === 'visible') {
                console.log("Page is visible, checking reset condition...");
                await checkAndResetGame(); // Recheck when the page becomes visible
            }
        };
    
        document.addEventListener('visibilitychange', handleVisibilityChange);
    
        // Cleanup
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            clearInterval(intervalId); // Cleanup interval on unmount
        };
    }, []);
    

    useEffect(() => {
        if (timeRemaining) {
            Animated.parallel([
                Animated.timing(timeboxTranslateX, {
                    toValue: 0, // Move to normal position (top)
                    duration: 1000, // Duration for the Y animation
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
                Animated.timing(timeboxOpacity, {
                    toValue: 1, // Fade in to full opacity
                    duration: 1500, // Duration for opacity animation
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [timeRemaining]);

    useEffect(() => {
        loadGameState();
    }, []);
    useEffect(() => {
        saveGameState();
    }, [guesses, chosenPlayer, gameComplete, gameLost, guessCount, footballImages]);

    useEffect(() => {
        if (gameComplete || gameLost) {
            setCardPositionAnimationCompleted(false);
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
        setFadeAnims([]); // Clear previous fade animations
        setTranslateXAnims([]); // Clear previous X translation animations
        setTranslateYAnims([]);

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
            setGuesses((prev) => [...prev, playerName]);
            setFootballImages((prev) => [...prev, 'footballImage']); // Add new player guess
            setGuessCount((prevCount) => prevCount + 1);
        }
        setSearchText("");

        const guessedPlayer = playerStats.find((player) => player.name.toLowerCase() === playerName.toLowerCase());
        if (guessedPlayer && chosenPlayer) {
            if (guessedPlayer.name.toLowerCase() === chosenPlayer.name.toLowerCase()) {
                setGameComplete(true);  // Set the gameComplete state to true
            }
        }
    };

    // useEffect to check if the game should be lost
    useEffect(() => {
        if (guessCount === 10 && !gameComplete) {
            setGameLost(true); // Set the game to fail
        }
    }, [guessCount, gameComplete]);

    useEffect(() => {
        guesses.forEach((guess) => {
            const guessedPlayer = playerStats.find(
                (player) => player.name.toLowerCase() === guess.toLowerCase()
            );
        });
    }, [guesses, playerStats]); // Re-run the effect when guesses or playerStats change


    useEffect(() => {
        fetchPlayerStats()
    }, []); // Fetch data only once when component mounts

    useEffect(() => {
        if (playerStats.length > 0 && !chosenPlayer) {
            // Use the current date as a seed to generate the same random player for everyone on that day
            const dateSeed = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD' format
            const playerIndex = Math.abs(dateSeed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % playerStats.length;
            setChosenPlayer(playerStats[playerIndex]);
        }
    }, [playerStats, chosenPlayer]);

    useEffect(() => {
        if (chosenPlayer) {
            console.log("Chosen Player:", chosenPlayer);
            saveGameState(); // Save the game state with the new chosenPlayer
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
                                <ImageBackground source={Football} style={styles.football}></ImageBackground>
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
                                    <Text style={styles.gameCompleteText1}>
                                        {gameComplete ? gameOver : gameLost ? youLose : ''}
                                    </Text>
                                </ImageBackground>
                            </View>
                            <Animated.View style={[
                                styles.timebox,
                                { opacity: timeboxOpacity, transform: [{ translateX: timeboxTranslateX }] },
                            ]}
                            >
                                <Text style={styles.timeboxText}>Time Remaining untill next the game: {timeRemaining}</Text>
                            </Animated.View>
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
                                    <Animated.View style={[styles.completionImageCard, { opacity: gameLost ? imageOpacity : 1 }]}>
                                        <Image source={{ uri: chosenPlayer?.playerUrl }} style={[styles.playerimageComplete, { shadowColor: gameLost ? 'red' : 'green' }]} />
                                    </Animated.View>
                                    {/* , { opacity: imageOpacity }] */}
                                    <Animated.View style={[styles.completionTextBox, { opacity: gameLost ? imageOpacity : 1 }]}>
                                        <Text style={[styles.playerNameTextComplete, { color: gameLost ? 'red' : 'green' }]}>{chosenPlayer?.name}</Text>
                                    </Animated.View>
                                    <Animated.View>

                                    </Animated.View>
                                    <Image style={styles.flagC} source={{ uri: chosenPlayer?.flagUrl }} />
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

                                            // Determine the size of the badge based on the number of teams
                                            const badgeSize = chosenPlayer.teamUrl.length <= 4 ? 45 : 28;  // Increase size if there are 3 or more teams

                                            return (
                                                <View key={index} style={styles.teamC}>
                                                    <Image
                                                        source={{ uri: teamUrl }}
                                                        style={[
                                                            styles.teamBadgec,
                                                            { width: badgeSize, height: badgeSize } // Dynamically set the width and height
                                                        ]}
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
                                    <ImageBackground
                                        source={{ uri: guessedPlayer.playerUrl }}
                                        style={styles.playerimage}
                                    >
                                    </ImageBackground>
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
                                                <View key={team} style={styles.team}>
                                                    <Image
                                                        source={{ uri: teamUrl }}
                                                        style={[
                                                            styles.teamBadge,
                                                            !isMatch && { opacity: 0.3 }
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
        fontFamily: 'VarelaRound_400Regular',
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
        width: 399,
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
        borderBottomColor: "black",
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
        backgroundColor: 'rgba(0, 0, 1, 0.2)',
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
        height: 246,  // Set the size of the overlay image
        width: 100,
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 2 }, // X and Y shadow
        shadowOpacity: .8, // Adjust for darkness
        shadowRadius: 1,
        elevation: 5,
        transform: [{ translateX: 14 }, { translateY: -10 }],// Blur effect
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
    completionImageCard: {
        marginTop: 10, // Adjust the position to match the image
        position: 'relative',
        // borderWidth: 1,
        borderColor: 'white',
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

    }, completionTextBox: {
        justifyContent: 'center',
        alignContent: 'center',
        // borderWidth:1,
        borderColor: 'white',
        width: 200,
        height: 260,
        position: 'absolute',
        transform: [{ translateX: -61 }]
    },
    timebox: {
        width: 383,
        height: 50,
        borderWidth: 1,
        // borderColor: 'white',
        backgroundColor: 'black',
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        zIndex: 999, // Ensure it's above other components
        position: 'absolute', // Allows the element to be positioned outside of its normal flow
        top: 60, // Position it wherever you want in the absolute space
        left: 8 // Position it wherever you want in the absolute space
    },
    timeboxText: {
        fontSize: 16,
        fontFamily: 'VarelaRound_400Regular',
        textAlign: 'center',
        color: 'beige'
    },
    playerNameTextComplete: {
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
        opacity: .9

    },
    completionCard: {
        marginTop: 5,
        position: 'relative',
        width: '96%',
        height: 265,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        // transform: [{ translateX: 18 }],
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 5,
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
        // borderWidth: 1,
        borderColor: 'white',
        height: '55%',
        width: 100,
        position: 'relative',
        flexWrap: 'wrap', // Allows wrapping to new lines
        flexDirection: 'row', // Arrange items in a row
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ translateX: -344 }, { translateY: 80 }],// Align badges to the left
    },
    team: {
        width: '99%',  // Each team takes up 45% of the container width
        // marginBottom: 5,  // Adds space between rows
        alignItems: 'center', // Centers the content
        justifyContent: 'center',  // Centers the content inside each team box
        // marginRight: '1%', // Add left margin
    },
    teamC: {
        // borderWidth: 1,
        // borderColor:'white',
        width: '40%',  // Each team takes up 45% of the container width
        marginBottom: 0,  // Adds space between rows
        alignItems: 'center', // Centers the content
        justifyContent: 'center',  // Centers the content inside each team box
        marginRight: '5%', // Add left margin
    },
    teamBadgec: {
        height: 28,
        width: 28,
        marginTop: 1,
        opacity: .9
    },
    flag: {
        // position: 'absolute',
        top: 8,
        height: 35,  // Set the size of the overlay image
        width: 50,
        borderRadius: 5,
        alignSelf: 'center'
    },
    flagC: {
        opacity: .9,
        borderRadius: 5,
        height: 50,  // Set the size of the overlay image
        width: 80,
        transform: [{ translateX: -105 }, { translateY: 30 }],
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
        borderColor: '#ccc',
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
        backgroundColor: 'rgba(50, 95, 50, 0.3)',
        borderColor: '#ccc',
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
        borderColor: '#ccc',
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
        position: 'relative',
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        // borderWidth: 2,
        marginBottom: 5,
        // alignItems: 'flex-end',
        width: '40%',
        transform: [{ translateX: 45 }]
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
        opacity: 0.8,
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
        // borderWidth:1
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
        alignContent: 'center',
        overflow: 'hidden',
    },
    gameCompleteText: {
        marginTop: 25,
        fontFamily: 'LuckiestGuy_400Regular',
        fontSize: 20,
        color: 'beige',
        textAlign: 'center', // Green background with transparency
        width: '100%',
    },
    gameCompleteText1: {
        marginTop: 10,
        fontFamily: 'LuckiestGuy_400Regular',
        fontSize: 20,
        color: 'beige',
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
    compContainer: {
        overflow: 'hidden'
    }
});
