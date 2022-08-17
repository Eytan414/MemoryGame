import React from 'react';
import { View, Text, Pressable } from 'react-native';
import utilsService from '../../utils/utils';

interface ModalProps{
    level: string,
    navigation:any,
    moves:number,
}

export const WinModal = (props: ModalProps) => {
    
    const shareScore = ():void => {
        let text = `Woo Hoo! finished in ${props.moves} moves on ${props.level} difficulty !`
        utilsService.shareScore(text)
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
        }}>
            <View style={{
                margin: 20,
                backgroundColor: 'peachpuff',
                borderRadius: 20,
                padding: 35,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,            
            }}>
                <Text style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: 'blue',
                    marginBottom: 25,
                    textAlign: 'center',
                }}>
                    {`Woo Hoo! finished in ${props.moves} moves`}
                </Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignContent:'center',
                    width: '100%',
                }}>
                    <Pressable
                        style={{
                            backgroundColor: 'saddlebrown',
                            borderRadius: 20,
                            paddingHorizontal: 20,
                            paddingVertical: 8,
                            elevation: 2,
                        }}
                        onPress={() => props.navigation.navigate('Home')}
                        >
                        <Text style={{
                            color: 'blanchedalmond',
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            fontSize: 16
                        }}>🏠 Home</Text>
                    </Pressable>
                    <Pressable
                        style={{
                            backgroundColor: 'lightsteelblue',
                            borderRadius: 20,
                            paddingHorizontal: 20,
                            paddingVertical: 8,
                            elevation: 2,
                        }}
                        onPress={shareScore}
                        >
                        <Text style={{
                            color: 'green',
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            fontSize: 16 
                        }}>Share</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}