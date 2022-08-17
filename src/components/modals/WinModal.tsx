import React from 'react';
import { View, Text, Modal } from 'react-native';
import {ShareButton} from '../../components/common/ShareButton';
import { GoHomeButton } from '../common/GoHomeButton';

interface ModalProps{
    level: string,
    navigation:any,
    moves:number,
    time:number,
    show:boolean,
}

export const WinModal = (props: ModalProps) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.show}
        >
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
                    maxWidth: '50%'    
                }}>
                    <Text style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: 'blue',
                        marginBottom: 25,
                        textAlign: 'center',
                    }}>
                        {`Finished in ${props.moves} moves and ${props.time.toFixed(1)} seconds on ${props.level} difficulty`}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignContent:'center',
                        width: '100%',
                    }}>
                        <GoHomeButton
                            navigation={props.navigation}
                        ></GoHomeButton>
                        <ShareButton
                            level={props.level}
                            time={props.time}
                            moves={props.moves}
                        ></ShareButton>
                    </View>
                </View>
            </View>
        </Modal>
    )
}